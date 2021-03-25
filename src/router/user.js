const express = require('express');
const router = express.Router();

const auth = require('../service/auth');
const user = require('../service/user');

router.post('/register', user.register);
router.post('/login', user.login)
router.post('/me', auth.validateToken, user.me)

module.exports = router