const User = require('./../models/user');

exports.Contacts = {
    getAll: function () {
        return new Promise((resolve, reject) => {
            User.find({}).exec()
                .then(users => {
                    let user_list = users.map(item => {
                        return {
                            id: item._id,
                            name: item.name,
                            username: item.username
                        }
                    });
                    resolve(user_list);
                })
                .catch(err => reject(err));
        })
    }
};
