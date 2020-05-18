const {Schema, model} = require('mongoose');

const message = new Schema({
    hash: String,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    to_user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    message: String
}, {
    timestamps: true
});

module.exports = model('message', message);
