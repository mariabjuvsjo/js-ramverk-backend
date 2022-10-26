const express = require('express');
const router = express.Router();
const controllers = require('../controllers/mailController');
const { checkToken } = require('../middleware/authorize')



// create an email

router.get("/", async (req, res) => {
    res.json({
        msg: "email",
    });




});

router.post("/", async (req, res) => {

    const adress = req.body

    console.log(adress)

    await controllers.createEmail(adress)

    res.status(200).json(res)
});


module.exports = router;