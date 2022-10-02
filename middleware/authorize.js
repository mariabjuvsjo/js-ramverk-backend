require('dotenv').config();
const jwt = require('jsonwebtoken');
asyncHandler = require('express-async-handler');
const User = require('../models/users')

const checkToken = asyncHandler(async (req, res, next) => {

    let rightToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            //get token
            rightToken = req.headers.authorization.split(' ')[1]

            //verti token
            const decoded = jwt.verify(rightToken, process.env.JWT_SECRET);

            //get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not auth')
        }

    }
    if (!rightToken) {
        res.status(401)
        throw new Error('No token')
    }

})

module.exports = { checkToken }