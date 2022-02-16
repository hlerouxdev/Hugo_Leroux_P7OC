const express = require('express');
const router = express.Router();
const publicationControl = require('../controllers/Publication')

router.post('/', publicationControl.createPost);
router.put('/:id', publicationControl.modifyPost);
router.delete('/:id', publicationControl.deletePost);
router.get('/:id', publicationControl.getOnePost);
router.get('/', publicationControl.getAllPost);
router.post('/:id/like', publicationControl.likePost);

module.exports = router