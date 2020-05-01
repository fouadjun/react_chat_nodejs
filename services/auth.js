const User = require('./../models/user');
const AuthToken = require('./../models/auth_token');

exports.registerUser = function(requestBody) {
    return new Promise((resolve, reject) => {
        try {
            const user = new User({
                name: requestBody.name,
                username: requestBody.username,
                password: requestBody.password
            });

            user.save()
                .then(function(user) {
                    const token = new AuthToken({
                        userId: user._id
                    });

                    token.save()
                        .then(function (token) {
                            resolve(mergedUserAndToken(user, token));
                        })
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));

        } catch (err) {
            reject(err);
        }
    });
};

exports.loginUser = function (requestBody) {
    return new Promise((resolve, reject) => {
        User.findOne({'username': requestBody.username})
            .exec()
            .then(user => {
                user.comparePassword(requestBody.password, function (err, isMatch = false) {
                    if (err) reject(err);
                    if (isMatch) {
                        generateToken(user).then((token) => {
                            resolve(mergedUserAndToken(user, token));
                        }).catch(err => reject(err));

                    } else {
                        reject({
                            message: 'Username or password not found'
                        });
                    }
                });
            })
            .catch(err => reject(err));
    });
};

exports.checkAuth = async function (token) {
    return AuthToken.findOne({token: token}).populate('user').exec()
        .then(token => {
            Promise.resolve(token.user);
        })
        .catch(err => Promise.reject(err));
};

const generateToken = function (user) {
    return new Promise((resolve, reject) => {
        const token = new AuthToken({
            user: user._id
        });

        token.save()
            .then(function (token) {
                resolve({
                    token: token.token,
                    expiresAt: token.expiresAt
                });
            })
            .catch(err => reject(err));
    });
};

const mergedUserAndToken = function (user, token) {
    return {
        user: {
            username: user.username,
            name: user.name
        },
        token: {
            token: token.token,
            expiresAt: token.expiresAt
        }
    }
};

