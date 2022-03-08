const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const user = require('../models/user');
require('dotenv').config({path: '../.env'});

exports.signup =
(req, res, next) => {
     if(req.body.isAdmin){
          return res.status(401).json( { message: 'vous ne pouvez pas vous donner le rôle admin' } )
     };
     const mailValid = validator.isEmail(req.body.email);
     const passwordValid = validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});

     if(!mailValid || !passwordValid){
          if(!mailValid){ //vérifie l'adresse mail
               return res.status(400).json({ message: 'l\'adresse mail que vous avez entrée n\'est pas une addresse mail valide' })
          };
          if(!passwordValid){ //vérifie que le mdp fasse plus de 8 charactères et contienne bien plusieurs charactères différents
               return res.status(400).json({ message: 'votre mot de passe doit contenir au moins 8 charactères, dont une lettre minuscule, une majuscule, un chiffre et un charctère spécial' })
          };
     } else {
          db.User.findOne({ where: { email: req.body.email } })
          .then(user =>{
               if (user) {
                    return res.status(401).json( { message: 'cette adresse mail est déjà prise' } )
               } else {
                    bcrypt.hash(req.body.password, 10)
                    .then( hash =>{
                         user = new db.User({
                              firstName: req.body.firstName,
                              lastName: req.body.lastName,
                              email: req.body.email,
                              password: hash,
                         });
                         user.save()
                         .then(() =>{res.status(201).json({message: 'utilisateur créé'}) })
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
          return res.status(401).json( { message: 'Utilisateur non trouvé !' } );
     } else {
          bcrypt.compare(req.body.password, user.password) //vérifie le hash du mdp
          .then(valid => {
               if (!valid) {
                    return res.status(401).json( { message: `Mot de passe incorrect !` } )
               } else {
                    res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( //créé le token
                         { userId: user._id, isAdmin: user.isAdmin },
                         process.env.secretToken,
                         { expiresIn: '12h' }
                    )
                    });
               };
          })
          .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
     }})
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.modifyUser =
(req, res, next) => {
     if(req.body.isAdmin){
          return res.status(401).json( { message: 'vous ne pouvez pas vous donner le rôle admin' } )
     };
     db.User.findOne({where: { _id: req.params.id }})
     .then(user =>{
          if(req.auth.userId === user._id || req.auth.isAdmin === true){
               modUser = Object.assign(user, req.body)
               modUser.save()
               .then(() =>{
                    res.status(202).json({message: 'utilisateur modifié'});
               })
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          } else {
               res.status(403).json({message: 'utilisateur non autiorisé'});
          };
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.deleteUser =
(req, res, next) => {
     db.User.findOne({where: { _id: req.params.id }})
     .then(user => {
          if(!user) {
               return res.status(404).json ( {message: 'cette requête n\'est pas autorisé'} )
          }
          if (req.auth.id === user.id || req.auth.isAdmin === true) { //vérifie l'identité de l'utilisateur
               user.destroy({ _id: req.params.id })
               .then(() => res.status(200).json({ message: 'utilisateur supprimé'}))
               .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
          } else {
          return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          }
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.getUserGroup =
(req, res, next) => {
     db.User.findAll({attributes:['firstName', 'lastName', 'email', 'adress', 'department', 'birthDay', 'profilePicture']})
     .then(users =>{
          res.status(200)
          res.send(JSON.stringify(users));
     })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.getUser =
(req, res, next) => {
     db.User.findOne({where: { _id: req.params._id }, attributes: ['firstName', 'lastName', 'email', 'adress', 'department', 'birthDay', 'profilePicture']})
     .then(user => { res.status(200).json({user}) })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};

exports.getMe =
(req, res, next) => {
     db.User.findOne({where: { _id: req.auth.userId }})
     .then(user => { res.status(200).json({user}) })
     .catch(error => res.status(500).json({ message: `oops! something went wrong... ${error}` }));
};