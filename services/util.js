const User = require('./../models/user');
const ContactDTO = require('./../dto/contact');

exports.Contacts = {
    getAll: function () {
        return new Promise((resolve, reject) => {
            User.find({}).exec()
                .then(users => {
                    let user_list = users.map(item => {
                        return new ContactDTO(item._id, item.username, item.name);
                    });
                    resolve(user_list);
                })
                .catch(err => reject(err));
        })
    },
    getOne: function (id) {
        return new Promise((resolve, reject) => {
            User.findById(id).exec()
                .then(item => {
                    resolve(new ContactDTO(item._id, item.username, item.name));
                })
                .catch(err => reject(err));
        });
    }
};
