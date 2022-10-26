//const bodyParser = require('body-parser');
require('dotenv').config();
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/root')
const text = require('./routes/texts');
const user = require('./routes/users');
const apimail = require('./routes/emails');

const app = express();

app.use(express.json());

app.use(cors());

app.options('*', cors());

app.disable('x-powered-by');

app.use((req, res, next) => {
    //console.log(req.method);
    //console.log(req.path);
    next();
});

//const port = process.env.PORT || 3001;



if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}


app.use('/text', text);

app.use('/apimail', apimail);

app.use('/users', user);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'


}))



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
