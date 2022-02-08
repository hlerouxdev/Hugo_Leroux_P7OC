const express = require('express');
const router = express.Router();
const userControl = require('../controllers/User');

router.post('/signup', limiter.auth, userControl.signup);
router.post('/login', limiter.auth, userControl.login);

module.exports = router;