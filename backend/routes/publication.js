const express = require('express');
const router = express.Router();
const publicationControl = require('../controllers/Publication');
const jwt = require('../middlewares/jwt')

router.post('/', jwt, publicationControl.createPost);
router.put('/:id', jwt, publicationControl.modifyPost);
router.delete('/:id', jwt, publicationControl.deletePost);
router.get('/:id', publicationControl.getOnePost);
router.get('/', publicationControl.getAllPost);
router.post('/:id/like', jwt, publicationControl.likePost);

module.exports = router