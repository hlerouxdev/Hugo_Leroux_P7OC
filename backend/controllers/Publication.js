const db = require('../models/index');

exports.createPost =
(req, res, next) => {
     const publiBody = req.body;
     if (!publiBody.content) {
          return res.status().json( { message: 'votre post ne peut pas être vide' } )
     } else {
          const publication = new db.Publication({
               ...publiBody
          });
          publication.save()
          .then(() => res.status(201).json({ message: 'post enregistré !'}))
          .catch(error => res.status(400).json({ error }));
     }
   };

exports.modifyPost =
(req, res, next) => {
     res.status(200).json({message: 'test modify post'});
};

exports.deletePost =
(req, res, next) => {
     db.Publication.findOne({ where: { _id: req.params.id } })
     .then(publication => {
          if(!publication) {
               return res.status(403).json ( {message: 'ce post n\'existe pas'} )
          }
          publication.destroy({ _id: req.body._id })
               .then(() => res.status(200).json({ message: 'post supprimé !'}))
               .catch(error => res.status(400).json({ error }));
          // if (req.auth.userId !== publication.userId) { //vérifie l'identité de l'utilisateur
          //      return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          // } else {
          //      publication.destroy({ _id: req.body._id })
          //      .then(() => res.status(200).json({ message: 'post supprimé !'}))
          //      .catch(error => res.status(400).json({ error }));
          // }
     })
     .catch(error => res.status(500).json({ error }));
};

exports.getAllPost =
(req, res, next) => {
     db.Publication.findAll()
     .then(publications=> res.status(200).json(publications))
     .catch(error => res.status(400).json({ error }));
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
     .catch(error => res.status(404).json({ error }));
};

exports.likePost =
(req, res, next) => {
     const like = req.body.like;
     const userId = req.body.userId;
     if(like > 1 || like < 0){
          return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
     };
     db.User.findOne({ where: { _id: userId } })
     .then(user =>{
          if(!user){
               return res.status(401).json( { message: 'cette requête n\'est pas autorisé' } );
          } else {
               db.Publication.findOne( { where: { _id: req.params._id } } )
               .then(pub =>{
                    const usersLiked = JSON.parse(pub.usersLiked);

                    if(like === 1){
                         if(usersLiked.includes(userId)){
                              return res.status(403).json( { message: 'cette requête n\'est pas autorisé' } );
                         } else {
                              pub.likes += 1;
                              usersLiked.push(userId);
                         }
                         pub.save()
                         .then ( res.status(201).json( { message: 'like ajouté' } ))
                         .catch(error => res.status(404).json({ error }));
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
                         .catch(error => res.status(404).json({ error }));
                    }
               })
               .catch(error => res.status(404).json({ error }));
          };
     })
     .catch(error => res.status(404).json({ error }));
};