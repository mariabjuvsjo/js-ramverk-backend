require('dotenv').config();
const mongoose = require('mongoose');
const testDb = require('./testdatabase');

async function getDb() {
    let dsn = process.env.MONGO_URI;
    if (process.env.NODE_ENV === 'test') {
        await testDb.connectMongo();
    } else {
        await mongoose.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('MongoDB connected!!');
        }).catch(err => {
            console.log('Failed to connect to MongoDB', err);
        });
    }
}

function close() {
    return mongoose.disconnect();
}

module.exports = { getDb, close };


