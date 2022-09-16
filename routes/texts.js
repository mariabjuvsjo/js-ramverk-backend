const express = require('express');
const router = express.Router();
const { createDoc, getAllDocs, getOneDoc, deleteOneDoc, updateDoc } = require('../controllers/textController')
const Doc = require('../models/texts');

//const textModel = require("../models/texts");

//get all docs
router.get(
    "/", getAllDocs);

//get a single doc
router.get(
    "/:id", getOneDoc

);
//create new doc
router.post('/', createDoc);

//del docs route

router.delete('/:id', deleteOneDoc);

//update doc route

router.patch('/:id', updateDoc);






module.exports = router;