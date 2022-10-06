const Doc = require('../models/Doc');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../models/User')



//create new doc
const createDoc = asyncHandler(async (req, res) => {
    const { name, text, allowed_users } = req.body;

    //add doc to db
    try {
        const doc = await Doc.create({ name, text, user: req.user.id, allowed_users });

        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get all docs

const getAllDocs = async (req, res) => {
    const docs = await Doc.find({});

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
    /**
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
        } */

    const allowed_users = req.body.allowed_users

    const name = req.body.name

    const text = req.body.text



    const updateDoc = await Doc.findByIdAndUpdate(req.params.id, { $push: { allowed_users } });



    res.status(200).json(updateDoc);
};


module.exports = {
    createDoc,
    getAllDocs,
    getOneDoc,
    deleteOneDoc,
    updateDoc,
    getSharedDocs
};
