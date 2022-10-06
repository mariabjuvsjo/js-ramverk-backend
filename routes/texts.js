const express = require('express');
const router = express.Router();
const controllers = require('../controllers/textController');
const { checkToken } = require('../middleware/authorize')


//const textModel = require("../models/texts");

//get all docs
router.get(
    "/", controllers.getAllDocs);

// get all shared docs


//get a single doc
router.get(
    "/:id", checkToken, controllers.getOneDoc

);
//create new doc
router.post('/', checkToken, controllers.createDoc);

//del docs route

router.delete('/:id', checkToken, controllers.deleteOneDoc);

//update doc route

router.patch('/:id', controllers.updateDoc);






module.exports = router;
