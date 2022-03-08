const express = require('express');
const router = express.Router();
const publicationControl = require('../controllers/Publication');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');

router.post('/', limiter.mod, jwt, publicationControl.createPost);
router.put('/:id', limiter.mod, jwt, publicationControl.modifyPost);
router.delete('/:id', limiter.mod, jwt, publicationControl.deletePost);
router.post('/:id', limiter.mod, jwt, publicationControl.commentPost);
router.get('/:id', limiter.gen, publicationControl.getOnePost);
router.get('/', limiter.gen, publicationControl.getAllPost);
router.post('/:id/like', limiter.mod, jwt, publicationControl.likePost);

module.exports = router