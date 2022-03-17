const express = require('express');
const router = express.Router();
const commentControl = require('../controllers/Comment');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');

router.post('/:id/comments', limiter.mod,  jwt, commentControl.createComment);
router.get('/:id/comments', limiter.gen, jwt, commentControl.getComments);
router.delete('/comments/:id', limiter.mod, jwt, commentControl.deleteComment);

module.exports = router
