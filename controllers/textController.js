const Doc = require('../models/texts');
const mongoose = require('mongoose');



//create new doc
const createDoc = async (req, res) => {
    const { name, text } = req.body;

    //add doc to db
    try {
        const doc = await Doc.create({ name, text });

        res.status(200).json(doc);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//get all docs

const getAllDocs = async (req, res) => {
    const docs = await Doc.find({});

    res.status(200).json(docs);
};



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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const doc = await Doc.findOneAndDelete({ _id: id });

    if (!doc) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(doc);
};

// update a document

const updateDoc = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such id' });
    }

    const doc = await Doc.findByIdAndUpdate({ _id: id }, { ...req.body });

    if (!doc) {
        return res.status(404).json({ error: 'No such id' });
    }

    res.status(200).json(doc);
};


module.exports = {
    createDoc,
    getAllDocs,
    getOneDoc,
    deleteOneDoc,
    updateDoc
};
