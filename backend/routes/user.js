const express = require('express');
const router = express.Router();
const userControl = require('../controllers/User');

router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.get('/', userControl.getUserGroup);
router.get('/:id', userControl.getUser);
router.get('/me', userControl.getMe);

module.exports = router;
