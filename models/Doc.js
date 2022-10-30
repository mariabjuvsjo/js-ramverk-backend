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
    code: String,
    docType: String,
    comments: Array,
    allowed_users: [{
        type: String
    }
    ]
})

const Doc = mongoose.model("Doc", docSchema);
module.exports = Doc;




