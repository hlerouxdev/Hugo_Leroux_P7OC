const db = require('../models/index');
const fs = require('fs');

exports.createPost =
(req, res, next) => {
     const pubBody = req.body;
     if (!pubBody.content && !req.file) {
          return res.status(400).json( { message: 'votre post ne peut pas être vide' } )
     } else {
          const pub = new db.Publication({
               userId: req.auth.userId,
               ...pubBody
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
          db.User.findOne({where: {_id: req.auth.userId}})
          .then(userActing =>{
               if(req.body.likes || req.body.usersLiked){ //empêche l'ajout de likes via la route modifyPost
                    return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
               };
               if(userActing._id === pub._id || userActing.isAdmin === true){
                    newPub = Object.assign( pub, req.body)
               newPub.save()
               .then(() => res.status(201).json({ message: 'post modifié !'}))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
               } else{
                    return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
               }
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
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
          db.User.findOne({where: {_id: req.auth.userId}})
          .then( userActing =>{
               if (userActing._id === pub.userId || userActing.isAdmin === true) { //vérifie l'identité de l'utilisateur
                    publ.destroy({ _id: req.body._id })
                    .then(() => res.status(200).json({ message: 'post supprimé !'}))
                    .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
               } else {
                    return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
               };
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
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
     console.log(userId)
     console.log('test 1')
     if(like > 1 || like < 0){
          return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
     };
     console.log('test 2')
     db.User.findOne({ where: { _id: userId } })
     .then(user =>{
          console.log('test 3')
          if(!user){
               return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
          } else {
               console.log('test 4')
               db.Publication.findOne( { where: { _id: req.params.id } } )
               .then(async pub =>{
                    console.log('test 5')
                    if(pub.userId === userId){
                         return res.status(403).json( { message: 'Vous ne pouvez pas liker votre propre post' } )
                    };

                    const usersLiked = JSON.parse(pub.usersLiked);
                    console.log(usersLiked)
                    console.log(typeof(usersLiked))
                    console.log('test 6')
                    if(like === 1){
                         if(usersLiked.includes(userId)){
                              return res.status(403).json( { message: 'cette requête n\'est pas autorisé' } );
                         } else {
                              console.log('test 7')
                              pub.likes += 1;
                              await usersLiked.push(userId);
                              console.log(usersLiked)
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