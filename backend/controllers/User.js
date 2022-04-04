const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

exports.signup =
     (req, res, next) => {
          if (req.body.isAdmin) {
               return res.status(401).json({ message: 'vous ne pouvez pas vous donner le rôle admin' })
          };
          const mailValid = validator.isEmail(req.body.email);
          const passwordValid = validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 });

          if (!mailValid || !passwordValid) {
               if (!mailValid) { //vérifie l'adresse mail
                    return res.status(400).json({ message: 'l\'adresse mail que vous avez entrée n\'est pas une addresse mail valide' });
               };
               if (!passwordValid) { //vérifie que le mdp fasse plus de 8 charactères et contienne bien plusieurs charactères différents
                    return res.status(400).json({ message: 'votre mot de passe doit contenir au moins 8 charactères, dont une lettre minuscule, une majuscule, un chiffre et un charctère spécial' });
               };
          } else {
               db.User.findOne({ where: { email: req.body.email } })
                    .then(user => {
                         if (user) {
                              return res.status(401).json({ message: 'cette adresse mail est déjà prise' })
                         } else {
                              bcrypt.hash(req.body.password, 10)
                                   .then(hash => {
                                        user = new db.User({
                                             firstName: req.body.firstName,
                                             lastName: req.body.lastName,
                                             email: req.body.email,
                                             password: hash,
                                        });
                                        user.save()
                                             .then(() => { res.status(201).json({ message: 'utilisateur créé' }) })
                                             .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                                   })
                                   .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                         };
                    });
          };
     };

exports.login =
     (req, res, next) => {
          db.User.findOne({ where: { email: req.body.email } })
               .then(user => {
                    if (!user) {
                         return res.status(404).json({ message: 'Utilisateur non trouvé !' });
                    } else {
                         bcrypt.compare(req.body.password, user.password) //vérifie le hash du mdp
                              .then(valid => {
                                   if (!valid) {
                                        return res.status(401).json({ message: `Mot de passe incorrect !` })
                                   } else {
                                        console.log(user.id);
                                        res.status(200).json({
                                             userId: user.id,
                                             token: jwt.sign( //créé le token
                                                  { userId: user.id, isAdmin: user.isAdmin },
                                                  process.env.secretToken,
                                                  { expiresIn: '12h' }
                                             )
                                        });
                                   };
                              })
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    }
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.modifyUser =
     (req, res, next) => {
          if (req.body.isAdmin) {
               return res.status(401).json({ message: 'vous ne pouvez pas vous donner le rôle admin' })
          };
          db.User.findOne({ where: { id: req.params.id } })
               .then(user => {
                    if (req.auth.userId === user.id || req.auth.isAdmin === true) {
                         modUser = Object.assign(user, req.body)
                         modUser.save()
                              .then(() => {
                                   res.status(202).json({ message: 'utilisateur modifié' });
                              })
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else {
                         res.status(403).json({ message: 'utilisateur non autiorisé' });
                    };
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.changePicture =
     (req, res, next) => {
          db.User.findOne({ where: { id: req.auth.userId } })
               .then(user => {
                    if (!user) {
                         return res.status(404).json({ message: 'utilisateur non trouvé' })
                    }
                    if (user.id = req.auth || req.aauth.isAdmin == true) {
                         if (user.profilePicture != '') {
                              fs.unlink(`public/images/${user.profilePicture.split('/images/')[1]}`, () => { });
                         }
                         user.profilePicture = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                         user.save()
                              .then(() => {
                                   res.status(202).json({ message: 'Photo de profile changée' });
                              })
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }))
                    }
                    else {
                         return res.status(403).json({ message: 'utilisateur non autorisé' })
                    }
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.changePassword =
     (req, res, next) => {
          if(!validator.isStrongPassword(req.body.password)) {
               return res.status(400).json( { message: 'Votre mot de passe doit contenir au moins 8 charactères, dont une lettre minuscule, une majuscule, un chiffre et un charctère spécial' } )
          }
          db.User.findOne( {where: {id: req.auth.userId}})
          .then(user => {
               if (!user) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé !' });
               } else {
                    if (user.id = req.auth.id) {
                         bcrypt.compare(req.body.password, user.password) //vérifie le hash du mdp
                         .then(valid => {
                              if (!valid) {
                                   return res.status(403).json({ message: `Mot de passe incorrect !` })
                              } else {
                                   user.password = req.body.password
                                   user.save()
                                   .then(() => {
                                        res.status(202).json({ message: 'Mot de passe modifié' });
                                   })
                                   .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                              };
                         })
                         .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else if (user.isAdmin === true) {
                         user.password = req.body.password
                         user.save()
                                   .then(() => {
                                        res.status(202).json({ message: 'Mot de passe modifié' });
                                   })
                                   .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else {
                         return res.status(403).json( { message: 'requête non autorisée' } )
                    }
               }
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     }

exports.deleteUser =
     (req, res, next) => {
          db.User.findOne({ where: { id: req.params.id } })
               .then(user => {
                    if (!user) {
                         return res.status(404).json({ message: 'cet utilisateur n\'existe pas' })
                    }
                    if (req.auth.userId === user.id || req.auth.isAdmin === true) { //vérifie l'identité de l'utilisateur
                         user.destroy()
                              .then(() => res.status(200).json({ message: 'utilisateur supprimé' }))
                              .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
                    } else {
                         return res.status(403).json({ message: 'cette requête n\'est pas autorisé' })
                    }
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.getUserGroup =
     (req, res, next) => {
          db.User.findAll({ attributes: ['firstName', 'lastName', 'email', 'adress', 'department', 'profilePicture'] })
               .then(users => res.status(200).json(users))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.getUser =
     (req, res, next) => {
          db.User.findOne({ where: { id: req.params.id }, attributes: ['firstName', 'lastName', 'email', 'adress', 'department', 'profilePicture'] })

               .then(user => {
                    console.log("rr")
                    res.status(200).json(user)
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };

exports.getMe =
     (req, res, next) => {
          db.User.findOne({ where: { id: req.auth.userId }, attributes: ['firstName', 'lastName', 'email', 'adress', 'department', 'profilePicture'] })

               .then(user => {
                    console.log('tt')
                    console.log(req.auth)
                    res.status(200).json(user)
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     };