require('dotenv').config();
const mongoose = require('mongoose');
const testDb = require('./testdatabase');

function getDb() {
    let dsn = process.env.MONGO_URI;

    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            testDb.connectMongo();
        } else {
            mongoose.connect(dsn, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log('MongoDB connected!!');
            }).catch(err => {
                console.log('Failed to connect to MongoDB', err);
            });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { getDb, close };


