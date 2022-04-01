const db = require('../models/index');
const validator = require('validator')

exports.createComment =
     (req, res, next) => {
          const commentBody = req.body;
          if (!commentBody.content || validator.isEmpty(commentBody.content)) {
               return res.status(400).json({ message: 'votre commentaire ne peut pas être vide' })
          } else {
               db.Publication.findOne({ where: { id: req.params.id } })
                    .then(pub => {
                         const comment = new db.Comment({
                              PublicationId: pub.id,
                              UserId: req.auth.userId,
                              ...commentBody
                         })
                         comment.save()
                              .then(res.status(201).json({ message: 'commentaire créé' }))
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    })
                    .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          };
     };

exports.modifyComment =
     (req, res, next) => {
          if (!req.body.content || validator.isEmpty(req.body.content)) {
               return res.status(400).json({ message: 'votre commentaire ne peut pas être vide' });
          };
          db.Comment.findOne({ where: { id: req.params.id } })
               .then(comment => {
                    if (comment.UserId !== req.auth.userId) {
                         return res.status(400).json({ message: 'cous ne pouvez pas modifier ce comentaire' });
                    } else {
                         comment.content = req.body.content;
                         comment.save()
                              .then(res.status(201).json({ message: 'commentaire modifié' }))
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    };
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.getComments =
     (req, res, next) => {
          db.Comment.findAll({ where: { PublicationId: req.params.id } })
               .then(comments => res.status(200).json(comments))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }))
     };

exports.deleteComment =
     (req, res, next) => {
          db.Comment.findOne({ where: { id: req.params.id } })
               .then(comment => {
                    if (comment.UserId !== req.auth.userId || ReadableStream.auth.isAdmin === false) {
                         return res.status(403).json({ message: 'vous ne pouvez pas supprimer ce commentaire' })
                    } else {
                         comment.destroy({ where: { id: req.params.id } })
                              .then(res.status(201).json({ message: 'commentaire supprimé' }))
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    }
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };