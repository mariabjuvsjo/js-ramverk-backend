const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'please add an email as username']
    },
    password: {
        type: String,
        required: [true, 'please add an email as username']
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
})

const User = mongoose.model("User", userSchema);
module.exports = User;
