const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const docSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: String,
    text: Object,
})
module.exports = mongoose.model("Doc", docSchema);



