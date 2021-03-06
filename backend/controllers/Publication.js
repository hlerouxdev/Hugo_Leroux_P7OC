const db = require('../models/index');
const fs = require('fs');
const validator = require('validator');

exports.createPost =
  (req, res, next) => {
    if ((!req.body.content || validator.isEmpty(req.body.content))) {
      return res.status(400).json({ message: 'votre post ne peut pas être vide' })
    } else {
      let pub = new db.Publication({
        UserId: req.auth.userId,
        ...req.body,
        filepath: ''
      });
      if (req.file) {
        pub.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
      //enregistre le nouveau post
      pub.save()
        .then(() => res.status(201).json({ message: 'post enregistré !' }))
        .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
    }
  };

exports.modifyPost =
  (req, res, next) => {
    if (req.body.likes) { //empêche l'ajout de likes via la route modifyPost
      return res.status(403).json({ message: 'cette requête n\'est pas autorisé' });
    };
    db.Publication.findOne({ where: { id: req.params.id } })
      .then(pub => {
        if (req.auth.userId === pub.UserId || req.auth.isAdmin === true) {
          if (req.file) {
            if (pub.filePath) {
              fs.unlink(`/public/images/${pub.filePath.split('/images/')[1]}`, () => { });
            };
            pub.filePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
          };
          newPub = Object.assign(pub, req.body);
          newPub.save()
            .then(() => res.status(201).json({ message: 'post modifié !' }))
            .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
        } else {
          return res.status(403).json({ message: 'cette requête n\'est pas autorisé' });
        };
      })
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  };

exports.deletePost =
  (req, res, next) => {
    db.Publication.findOne({ where: { id: req.params.id } })

      .then(pub => {
        console.log(pub)
        if (!pub) {
          return res.status(404).json({ message: 'ce post n\'existe pas' })
        }
        if (req.auth.userId === pub.UserId || req.auth.isAdmin === true) { //vérifie l'identité de l'utilisateur
          if (pub.filePath) {
            fs.unlink(`/public/images/${pub.filePath.split('/images/')[1]}`, () => { });
          }
          pub.destroy()
            .then(() => res.status(200).json({ message: 'post supprimé !' }))
            .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
        } else {
          return res.status(403).json({ message: 'cette requête n\'est pas autorisé' })
        };
      })
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  };

//------------------------------------------------------ Controlleurs Get ------------------------------------------------------

const includePostUser = {
  include: [
    {//recuperation du model user inclu avec des atttributs specifier (ex:evite de donné le Mdp)
      model: db.User,
      attributes: [
        "id",
        "lastName",
        "firstName",
        "profilePicture"
      ]
    },
    {
      model: db.Comment,
      include: [
        {
          model: db.User,
          attributes: [
            "id",
            "lastName",
            "firstName",
            "profilePicture"
          ]
        }
      ]
    },
    {
      model: db.Like
    }
  ]
}

exports.getAllPost =
  (req, res, next) => {
    db.Publication.findAll(includePostUser)
      .then(publications => res.status(200).json(publications))
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  };

exports.getOnePost =
  (req, res, next) => {
    db.Publication.findOne({ where: { id: req.params.id }, ...includePostUser })
      .then(pub => {
        if (!pub) {
          return res.status(404).json({ message: 'Ce post n\'existe pas' });
        } else {
          res.status(200).json(pub);
        };
      })
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  };

exports.getUserPosts =
  (req, res, next) => {
    db.Publication.findAll({ where: { UserId: req.params.id }, ...includePostUser })
      .then(publications => res.status(200).json(publications))
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  }

exports.getMyPosts =
  (req, res, next) => {
    db.Publication.findAll({ where: { UserId: req.auth.userId }, ...includePostUser })
      .then(publications => res.status(200).json(publications))
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  }

//------------------------------------------------------ Controlleur Likes ------------------------------------------------------

exports.likePost =
  (req, res, next) => {
    const PublicationLiked = req.params.id;
    const like = req.body.like;
    const userId = req.auth.userId;

    if (like > 1 || like < 0) {
      return res.status(400).json({ message: 'cette requête n\'est pas autorisé' });
    };
    db.User.findOne({ where: { id: userId } })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'cette requête n\'est pas autorisé l\'utilisateur n\'existe pas' });
        }
        db.Like.findOne({ where: { UserId: userId, PublicationId: PublicationLiked } })
          .then(oldLike => {
            if (oldLike) {
              if (like === 0) {
                oldLike.destroy()
                  .then(() => { res.status(200).json({ message: 'like enlevé' }) })
                  .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
              } else {
                return res.status(400).json({ message: 'Vous avez déjà liké ce post' });
              };
            } else {
              if (like === 1) {
                const newLike = new db.Like({
                  UserId: userId,
                  PublicationId: PublicationLiked
                })
                newLike.save()
                  .then(() => { res.status(200).json({ message: 'like ajouté' }) })
                  .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
              } else {
                return res.status(400).json({ message: 'Vous devez liker le post avant d\'enlever le like' });
              };
            };
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
      })
      .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
  };