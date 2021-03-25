const express = require('express');
const router = express.Router();

let userRoutes = require('../router/user')
let stuffRoutes = require('../router/stuff')

router.use('/auth', userRoutes)
router.use('/stuff', stuffRoutes)

module.exports = router