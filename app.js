const bodyParser = require('body-parser');
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const text = require('./routes/texts');
const index = require('./routes/index');
const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});



const port = process.env.PORT || 3001;


app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');


if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use('/text', text)

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


//CONNECT TO DB

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => {
        app.listen(port, () => console.log(`API listening on port ${port}!`));
    })
    .catch((error) => {
        console.log(error)
    });




// Start up server
