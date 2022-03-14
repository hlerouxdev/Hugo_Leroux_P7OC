const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

module.exports = (req, res, next) => {
try {
     const token = req.headers.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, process.env.secretToken); //récupère l'id dans le token
     const userId = decodedToken.userId;
     const isAdmin = decodedToken.isAdmin;;
     req.auth = { userId: userId, isAdmin: isAdmin };
     if (req.body.userId && req.body.userId !== userId) { //vérifie l'identité de l'utilisateur
     throw 'ID utilisateur non valide';
     } else {
          next();
     }
     } catch {
          res.status(401).json({
               error: new Error( {message: `requête incorrecte! ${Error}`} )
          });
     };
};