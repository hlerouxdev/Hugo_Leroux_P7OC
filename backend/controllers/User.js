const db = require('../models/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const user = require('../models/user');
require('dotenv').config({path: '../.env'});

exports.signup =
(req, res, next) => {
     const mailValid = validator.isEmail(req.body.email);
     const passwordValid = validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});

     if(!mailValid || !passwordValid){
          if(!mailValid){ //vérifie l'adresse mail
               console.log('testmail')
               return res.status(400).json({ message: 'l\'adresse mail que vous avez entrée n\'est pas une addresse mail valide' })
          };
          if(!passwordValid){ //vérifie que le mdp fasse plus de 8 charactères et contienne bien plusieurs charactères différents
               console.log('testpass')
               return res.status(400).json({ message: 'votre mot de passe doit contenir au moins 8 charactères, dont une lettre minuscule, une majuscule, un chiffre et un charctère spécial' })
          };
     } else {
          console.log('test2')
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
                    .catch((error) =>{
                         res.status(500).json({message: error})
                    });
               }
          })
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
               console.log(valid)
               if (!valid) {
                    return res.status(401).json( { message: `Mot de passe incorrect !` } )
               } else {
                    res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( //créé le token
                         { userId: user._id },
                         process.env.secretToken,
                         { expiresIn: '12h' }
                    )
                    });
               };
          })
          .catch(error => res.status(500).json({ error }));
     }})
     .catch(error => res.status(500).json({ error }));
};

exports.modifyUser =
(req, res, next) => {
     db.User.findOne({ where: { id: req.body.id } });
     if(req.auth.userId === user.id){
          user= {
               ... req.body
          }
          .then(() =>{
               res.status(202).json({message: 'utilisateur modifié'});
          })
          .catch((error) =>{
               res.status(500).json({message: error})
          });
     } else {
          res.status(403).json({message: 'utilisateur non autiorisé'})
     };
};

exports.deleteUser =
(req, res, next) => {
     User.findOne({where: { _id: req.params._id }})
     .then(user => {
          if(!user) {
               return res.status(404).json ( {message: 'cette requête n\'est pas autorisé'} )
          }
          if (req.auth.id === user.id) { //vérifie l'identité de l'utilisateur
               user.deleteOne({ _id: req.params.id })
               .then(() => res.status(200).json({ message: 'utilisateur supprimé'}))
               .catch(error => res.status(400).json({ error }));
          } else {
          return res.status(403).json ( {message: 'cette requête n\'est pas autorisé'} )
          }
     })
     .catch(error => res.status(500).json({ error }));
};

exports.getUserGroup =
(req, res, next) => {
     db.User.findAll()
     .then(() =>{
          console.log(db.User)
          console.log(typeOf(db.User))
          res.status(200)
          res.send(JSON.stringify(db.User));
     })
     .catch(error => res.status(500).json({ error }));
};

exports.getUser =
(req, res, next) => {
     db.User.findOne({where: { _id: req.params._id }})
     .then(user => { res.status(200).json({user}) })
     .catch(error =>{ res.status(500).json({error}) });
};

exports.getMe =
(req, res, next) => {
     res.status(200).json({message: 'test get me'});
};