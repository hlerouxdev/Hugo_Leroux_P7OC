const db = require('../models/index');
const fs = require('fs');
const validator = require('validator')

exports.createPost =
(req, res, next) => {
     if ((!req.body.content && !req.file) || validator.isEmpty(req.body.content)) {
          return res.status(400).json( { message: 'votre post ne peut pas être vide' } )
     } else {
          const pub = new db.Publication({
               userId: req.auth.userId,
               ...req.body
          });
          if(req.file){
               pub.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               console.log(pub)
          }
          pub.save()
          .then(() => res.status(201).json({ message: 'post enregistré !'}))
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     }
};

exports.modifyPost =
(req, res, next) => {
     console.log('test 1')
     if(req.body.likes){ //empêche l'ajout de likes via la route modifyPost
          return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} );
     };
     console.log('test 2')
     db.Publication.findOne({where: { _id: req.params.id}})
     .then(pub => {
          console.log('test 3')
          if(req.auth.userId === pub.userId || req.auth.isAdmin === true){
               if(req.file){
                    if(pub.filePath){
                         fs.unlink(`images/${pub.filePath.split('/images/')[1]}`, () =>{});
                    };
                    pub.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
               };
               console.log('test 4')
               newPub = Object.assign( pub, req.body);
               console.log('test 5')
               newPub.save()
               .then(() => res.status(201).json({ message: 'post modifié !'}))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          } else{
               return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} );
          };
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.deletePost =
(req, res, next) => {
     db.Publication.findOne({ where: { _id: req.params.id } })
     .then(pub => {
          if(!pub) {
               return res.status(403).json ( {message: 'ce post n\'existe pas'} )
          }
          if (req.auth.userId === pub.userId || req.auth.isAdmin === true) { //vérifie l'identité de l'utilisateur
               if(pub.filePath){
                    fs.unlink(`images/${pub.filePath.split('/images/')[1]}`, () =>{});
               }
               pub.destroy()
               db.Comment.destroy({where: {contentCommented: pub._id}})
               .then(() => res.status(200).json({ message: 'post supprimé !'}))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          } else {
               return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          };
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.commentPost =
(req, res, next) => {
     const commentBody = req.body;
     if (!commentBody.content || validator.isEmpty(commentBody.content)) {
          return res.status(400).json( { message: 'votre post ne peut pas être vide' } )
     } else {
          db.Publication.findOne({where: {_id: req.params.id}})
          .then(pub => {
               const comment = new db.Comment({
                    contentCommented: pub._id,
                    userId: req.auth.userId,
                    ...commentBody
               })
               comment.save()
               .then( res.status(201).json( { message: 'commentaire créé' } ))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     }
};

exports.getAllPost =
(req, res, next) => {
     db.Publication.findAll()
     .then(publications=> res.status(200).json(publications))
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
   };

exports.getOnePost =
(req, res, next) => {
     db.Publication.findOne({ where: { _id: req.params.id } })
     .then(publication => {
          if(!publication){
               return res.status(404).json( { message: 'Ce post n\'existe pas' } );
          } else {
               res.status(200).json(publication);
          };
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.getPostComments =
(req, res, next) => {
     db.Publication.findOne({where: {_id: req.params.id}})
     .then(() =>{
          db.findAll({where: {contentCommented: req.params.id}})
          .then(comments=> res.status(200).json(comments))
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.likePost =
(req, res, next) => {
     const postLiked = req.params.id;
     const like = req.body.like;
     const userId = req.auth.userId;

     if(like > 1 || like < 0){
          return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
     };

     db.User.findOne({ where: { _id: userId } })
     .then(user =>{
          if(!user){
               return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
          }
          db.findAll({where: {userLiked: userId, contentLiked: postLiked}})
          .then( oldLike =>{
               if(oldLike){
                    if(like = 0) {
                         oldLike.destroy()
                         .then(() =>{res.status(200).jeons({message: 'like enlevé'})})
                         .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else{
                         return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
                    };
               } else {
                    if(like = 1){
                         const newLike = new db.Like({
                              userLiked: userId,
                              contentLiked: postLiked
                         });
                         newLike.save()
                         .then(() =>{res.status(200).jeons({message: 'like ajouté'})})
                         .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else {
                         return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
                    };
               };
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};