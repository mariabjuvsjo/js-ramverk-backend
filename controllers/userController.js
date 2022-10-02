require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/users')

// @desc register new User
// @route POST /users
const regUser = asyncHandler(async (req, res) => {

    const { firstname, lastname, username, password } = req.body



    //make sure user dont exists

    const alreadyUser = await User.findOne({ username })

    if (alreadyUser) {
        res.status(400)
        throw new Error('user already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        firstname,
        lastname,
        username,
        password: hashPass
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            token: makeAToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('invalid info')

    }

})


const getAllUsers = async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
};
// @desc log in user
// @route POST /users/login 
const logInUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            token: makeAToken(user._id),
            logIn: "sucsess"

        })
    } else {
        res.status(400)
        throw new Error('Not matching')
    }
})

// @desc get user info 
// @route GET /users/user
// @access Private
const getInfoUser = asyncHandler(async (req, res) => {
    const { _id, firstname, lastname, username } = await User.findById(req.user.id)
    res.status(200).json({
        message: 'You are logged in',
        id: _id,
        firstname,
        lastname,
        username
    })
})

//make the token

const makeAToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = {
    getAllUsers,
    regUser,
    logInUser,
    getInfoUser
}