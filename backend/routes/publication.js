const express = require('express');
const router = express.Router();
const publicationControl = require('../controllers/npm install mysqlPublication')

router.post('/', publicationControl.createpost);
router.put('/:id', publicationControl.modifypost);
router.delete('/:id', publicationControl.deletepost);
router.get('/:id', publicationControl.getOnepost);
router.get('/', publicationControl.getAllpost);
router.post('/:id/like', publicationControl.likepost);

module.exports = router;