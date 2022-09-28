const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
    name: String,
    text: Object,
})
module.exports = mongoose.model("Doc", docSchema);



