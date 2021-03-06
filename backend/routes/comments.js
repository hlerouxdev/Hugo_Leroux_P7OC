const express = require('express');
const router = express.Router();
const commentControl = require('../controllers/Comment');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');

router.post('/comment/:id', limiter.mod, jwt, commentControl.createComment);
router.put('/comment/:id', limiter.mod, jwt, commentControl.modifyComment);
router.delete('/comment/:id', limiter.mod, jwt, commentControl.deleteComment);

module.exports = router;
