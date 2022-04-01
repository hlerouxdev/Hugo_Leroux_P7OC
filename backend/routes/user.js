const express = require('express');
const router = express.Router();
const userControl = require('../controllers/User');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');

router.post('/signup', /* limiter.auth, */ userControl.signup);
router.post('/login', /* limiter.auth, */ userControl.login);
router.put('/user/:id', limiter.mod, jwt, userControl.modifyUser);
router.put('/user/:id/profile-picture', limiter.mod, jwt, userControl.changePicture);
router.delete('/user/:id', limiter.auth, jwt, userControl.deleteUser);
router.get('/', limiter.gen, userControl.getUserGroup);
router.get('/user/:id', limiter.gen, userControl.getUser);
router.get('/me', /* limiter.gen, */ jwt, userControl.getMe);

module.exports = router;