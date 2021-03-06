const {Schema, model} = require('mongoose');
const AuthToken = require('./auth_token');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: String
}, {
    timestamps: true
});

user.pre('save', hook);

user.pre('update', hook);

user.pre('remove', function (next) {

    console.log('deleting constrains...');
    AuthToken.deleteMany({ user: this._id }).exec();
    next();
});

user.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

function hook(next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
}

module.exports = model('user', user);
