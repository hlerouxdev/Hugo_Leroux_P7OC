const express = require('express');
const router = express.Router();
const userControl = require('../controllers/User');
const jwt = require('../middlewares/jwt')

router.post('/signup', userControl.signup);
router.post('/login', userControl.login);
router.put('/:id', jwt, userControl.modifyUser);
router.post('/:id', jwt, userControl.deleteUser);
router.get('/', userControl.getUserGroup);
router.get('/:id', userControl.getUser);
router.get('/me', jwt, userControl.getMe);

module.exports = router;