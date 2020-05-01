const {Schema, model} = require('mongoose');
const {v4} = require('uuid');
const moment = require('moment');

const authToken = new Schema({
    token: {
        type: String
    },
    expiresAt: {
        type: Schema.Types.Date,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true
});

authToken.pre('save', function (next) {
    let authToken = this;

    authToken.token = v4();
    //authToken.expiresAt = moment().add(14, 'days').toDate();
    next()
});

module.exports = model('auth_token', authToken);
