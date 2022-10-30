const Doc = require('../models/Doc');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/User')



//create new doc
const createDoc = asyncHandler(async (req, res) => {
    const { name, docType } = req.body;

    //add doc to db
    try {
        const doc = await Doc.create({ name, docType, user: req.user.id });

        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get all docs

const getAllDocs = async (req, res) => {
    const docs = await Doc.find();

    res.status(200).json(docs);
};

async function getSharedDocs(user) {

    const docs = await Doc.find({ allowed_users: user });

    return docs
}


//get a single doc

const getOneDoc = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const doc = await Doc.findById(id);

    if (!doc) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(doc);
};

const getOneDocsComment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }


    const doc = await Doc.findById(id).select('comments -_id');

    if (!doc) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(doc);
};

const getOneDocsUsers = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }


    const doc = await Doc.findById(id).select('allowed_users -_id');

    if (!doc) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(doc);
};


//delete a doc
const deleteOneDoc = async (req, res) => {
    const doc = await Doc.findById(req.params.id);

    //check for docs
    if (!doc) {
        return res.status(404).json({ error: 'No such doc' });
    }

    const user = await User.findById(req.user.id)

    //check if there is a user
    if (!user) {
        res.status(401)
        throw new Error('No such user')
    }

    //check if doc user is equal to logged in user
    if (doc.user.toString() !== user.id) {
        res.status(401)
        throw new Error('user not auth')
    }

    await Doc.findByIdAndDelete(req.params.id);

    res.status(200).json({
        id: req.params.id

    })
};

// update a document

const updateDoc = async (req, res) => {
    const doc = await Doc.findById(req.params.id);

    //check for docs
    if (!doc) {
        return res.status(404).json({ error: 'No such doc' });
    }

    let thingsToUpdate = {
        $set: {
            name: req.body.name,
            text: req.body.text,
            code: req.body.code
        },
        $push: {
            comments: req.body.comments,
            allowed_users: req.body.allowed_users
        }
    }

    const updatedDoc = await Doc.findByIdAndUpdate(req.params.id, thingsToUpdate);



    res.status(200).json(updatedDoc);
};


module.exports = {
    createDoc,
    getAllDocs,
    getOneDoc,
    deleteOneDoc,
    updateDoc,
    getSharedDocs,
    getOneDocsComment,
    getOneDocsUsers
};
