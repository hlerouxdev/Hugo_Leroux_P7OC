const express = require('express');
const router = express.Router();
const messageControl = require('../controllers/Message');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');

router.post('/:id', limiter.mod, jwt, messageControl.sendMessage);
router.get('/', limiter.gen, jwt, messageControl.getMessages);
router.delete('/:id', limiter.gen, jwt, messageControl.deleteMessage);

module.exports = router;