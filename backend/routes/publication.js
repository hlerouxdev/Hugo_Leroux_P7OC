const express = require('express');
const router = express.Router();
const publicationControl = require('../controllers/Publication');
const jwt = require('../middlewares/jwt');
const limiter = require('../middlewares/ratelimiter');
const multer = require('../middlewares/multer-config');

router.post('/', limiter.mod, jwt, multer, publicationControl.createPost);
router.put('/:id', limiter.mod, jwt, multer, publicationControl.modifyPost);
router.delete('/:id', limiter.mod, jwt, publicationControl.deletePost);
router.get('/:id', limiter.gen, publicationControl.getOnePost);
router.get('/', limiter.gen, publicationControl.getAllPost);
router.get('/user/:id', limiter.gen, publicationControl.getUserPosts);
router.get('/user/me', jwt, publicationControl.getMyPosts);
router.post('/:id/like', limiter.mod, jwt, publicationControl.likePost);

module.exports = router