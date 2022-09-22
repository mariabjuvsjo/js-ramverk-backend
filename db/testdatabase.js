const mongoose = require('mongoose');
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongodb = null;

const connectMongo = async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on("error", e => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose.connect(uri);
        }
        console.log(e);
    });

    mongoose.connection.once("open", () => {
        console.log(`MongoDB test successfully connected to ${uri}`);
    });
};

const closeDb = async () => {
    if (mongodb) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongodb.stop();
    }
};

const dropCollections = async () => {
    if (mongodb) {
        const collections = await mongoose.connection.db.collections();

        for (let collection of collections) {
            await collection.deleteOne();
        }
    }
};


module.exports = { connectMongo, closeDb, dropCollections };
