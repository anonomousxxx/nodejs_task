const express = require('express');
const router = express.Router();

const stuff = require('../service/stuff');
const auth = require('../service/auth');

router.get('/djoke', auth.validateToken, stuff.getDadJoke);
router.get('/cnorris', auth.validateToken, stuff.getChuckNorrisFact);

module.exports = router