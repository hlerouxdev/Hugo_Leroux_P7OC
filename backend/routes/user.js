const express = require('express');
const router = express.Router();
const userControl = require('../controllers/User');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');
const multer = require('../middlewares/multer-config')

router.post('/signup', /* limiter.auth, */ userControl.signup);
router.post('/login', /* limiter.auth, */ userControl.login);
router.put('/user/:id', limiter.mod, jwt, userControl.modifyUser);
router.put('/user/:id/profile-picture',jwt, multer, userControl.changePicture);
router.put('/user/:id/password', limiter.mod, jwt, userControl.changePassword);
router.delete('/user/:id', limiter.auth, jwt, userControl.deleteUser);
router.get('/', userControl.getUserGroup);
router.get('/user/:id', userControl.getUser);
router.get('/me', jwt, userControl.getMe);

module.exports = router;