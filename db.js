const mongoose = require('mongoose');


const username = 'fuad';
const password = 'Ln0yyUHgKemygAza';
const connectUrl = `mongodb+srv://${username}:${password}@reactchat-glxdt.mongodb.net/test?retryWrites=true&w=majority`;

const db = async (callback) => {
    try {
        console.log('Connecting to db...');
        await mongoose.connect(connectUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        callback();
    } catch (e) {
        console.log('Whops, Something went wrong', e);
    }
};

module.exports = db;
