const db = require('../models/index');
const fs = require('fs');
const validator = require('validator')

exports.createPost =
(req, res, next) => {
     if (!req.body.content && !req.file || validator.isEmpty(req.body.content)) {
          return res.status(400).json( { message: 'votre post ne peut pas être vide' } )
     } else {
          const pub = new db.Publication({
               userId: req.auth.userId,
               ...req.body
          });
          if(req.file){
               console.log('test 1')
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
     db.Publication.findOne({where: { _id: req.params.id}})
     .then(pub => {
          if(req.body.likes || req.body.usersLiked){ //empêche l'ajout de likes via la route modifyPost
               return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          };
          if(req.auth.userId === pub._id || req.auth.isAdmin === true){
               if(req.file){
                    if(pub.filePath){
                         fs.unlink(`images/${pub.filePath.split('/images/')[1]}`, () =>{});
                    };
                    pub.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
               }
               newPub = Object.assign( pub, req.body)
               .then(() =>{newPub.save()})
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }))
               .then(() => res.status(201).json({ message: 'post modifié !'}))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          } else{
               return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          }
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
               pub.destroy({ _id: req.body._id })
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
     if (!commentBody.content) {
          return res.status(400).json( { message: 'votre post ne peut pas être vide' } )
     } else {
          const comment = new db.Publication({
               userId: req.auth.userId,
               isComment: true,
               ...publiBody
          });
          comment.save()
          db.Publication.findOne({where: {_id: req.params.id}})
          .then(pub => {
               pub.comments.push(comment._id)
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

exports.likePost =
(req, res, next) => {
     const like = req.body.like;
     const userId = req.auth.userId;
     if(like > 1 || like < 0){
          return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
     };
     db.User.findOne({ where: { _id: userId } })
     .then(user =>{
          if(!user){
               return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
          } else {
               db.Publication.findOne( { where: { _id: req.params.id } } )
               .then( pub =>{
                    if(pub.userId === userId){
                         return res.status(403).json( { message: 'Vous ne pouvez pas liker votre propre post' } )
                    };

                    let usersLiked = pub.usersLiked;
                    console.log(usersLiked)
                    console.log(typeof(usersLiked))
                    if(like === 1){
                         if(usersLiked.includes(userId)){
                              return res.status(403).json( { message: 'cette requête n\'est pas autorisé' } );
                         } else {
                              pub.likes += 1;
                              usersLiked += userId
                              console.log(usersLiked)
                              console.log(typeof(usersLiked))
                         }
                         pub.save()
                         .then ( res.status(201).json( { message: 'like ajouté' } ))
                         .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    }

                    if(like === 0){
                         if(!usersLiked.includes(userId)){
                              return res.status(403).json( { message: 'cette requête n\'est pas autorisé' } );
                         } else {
                              pub.likes -= 1;
                              usersLiked.splice(usersLiked.indexOf(userId), 1);
                         }
                         pub.save()
                         .then ( res.status(201).json( { message: 'like enlevé' } ))
                         .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    }
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          };
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};