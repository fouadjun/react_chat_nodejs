const Message = require('./../models/message');

exports.sendMessage = function (user, to_user, msg) {
    return new Promise((resolve, reject) => {
        //console.log(user);
        let hash = user + to_user;

        const message = new Message({
            hash,
            user: user,
            to_user,
            message: msg
        });

        message.save()
            .then(r => {
                console.log('message saved');
                resolve(r);
            })
            .catch(err => reject(err));
    });
};
