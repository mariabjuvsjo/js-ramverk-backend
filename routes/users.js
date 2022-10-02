const express = require('express');
const router = express.Router();
const { regUser, logInUser, getInfoUser, getAllUsers } = require('../controllers/userController')
const { checkToken } = require('../middleware/authorize')

router.get('/', getAllUsers)
router.post('/reg', regUser)
router.post('/login', logInUser)
router.get('/user', checkToken, getInfoUser)






module.exports = router;
