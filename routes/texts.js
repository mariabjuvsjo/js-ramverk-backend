const express = require('express');
const router = express.Router();
const controllers = require('../controllers/textController');


//const textModel = require("../models/texts");

//get all docs
router.get(
    "/", controllers.getAllDocs);

//get a single doc
router.get(
    "/:id", controllers.getOneDoc

);
//create new doc
router.post('/', controllers.createDoc);

//del docs route

router.delete('/:id', controllers.deleteOneDoc);

//update doc route

router.patch('/:id', controllers.updateDoc);






module.exports = router;
