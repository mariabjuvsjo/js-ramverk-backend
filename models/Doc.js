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
    comments: Array,
    allowed_users: [{
        type: String
    }
    ]
})

const Doc = mongoose.model("Doc", docSchema);
module.exports = Doc;




