"use strict";

const express = require("express");
const router = express.Router();

router.get('/', function (req, res, next) {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

router.get('/home', function (req, res, next) {
    const data = {
        data: {
            msg: "Hello Home"
        }
    };

    res.json(data);
});

module.exports = router;