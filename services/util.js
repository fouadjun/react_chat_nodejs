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
                .catch(err => reject('user not found'));
        });
    },
    updateOne: function (id, data) {
        return new Promise((resolve, reject) => {
            User.findById(id, { new: true })
                .exec()
                .then(item => {
                    item.name = data.name;
                    item.username = data.username;
                    item.password = data.password;

                    item.save(function (err) {
                        if (err) reject(err);
                        resolve(new ContactDTO(item._id, item.username, item.name, item.password));
                    });
                })
                .catch(err => reject(err));
        });
    },
    deleteOne: function (id) {
        return new Promise((resolve, reject) => {
            User.findById(id)
                .exec()
                .then(contact => {
                    contact.remove(function (err) {
                        if (err) reject(err);
                        resolve();
                    });
                })
                .catch(err => reject(err));
        });
    }
};
