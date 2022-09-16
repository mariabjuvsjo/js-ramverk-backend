const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Doc", docSchema);



