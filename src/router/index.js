const express = require('express');
const router = express.Router();

const userRoutes = require('../router/user')
const stuffRoutes = require('../router/stuff')

router.use('/auth', userRoutes)
router.use('/stuff', stuffRoutes)

module.exports = router