//const bodyParser = require('body-parser');
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const text = require('./routes/texts');
const user = require('./routes/users')

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    //console.log(req.method);
    //console.log(req.path);
    next();
});

//const port = process.env.PORT || 3001;

app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/text', text);

app.use('/users', user);

app.get('/', (req, res) => {
    res.json({
        msg: "Text editor",
    });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

module.exports = app;
