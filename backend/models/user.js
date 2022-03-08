const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var User = sequelize.define("User", {
          _id:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true
          },
     
          firstName:{
               type: Sequelize.DataTypes.STRING(50),
               allowNull: false
          },
     
          lastName:{
               type: Sequelize.DataTypes.STRING(50),
               allowNull: false
          },
     
          email:{
               type: Sequelize.DataTypes.STRING(50),
               allowNull: false,
               unique:true
          },
     
          password:{
               type: Sequelize.DataTypes.STRING,
               allowNull: false
          },
     
          profilePicture:{
               type: Sequelize.DataTypes.STRING
          },
     
          birthDay:{
               type: Sequelize.DataTypes.DATE
          },
     
          department:{
               type: Sequelize.DataTypes.STRING(30),
          },
     
          adress:{
               type: Sequelize.DataTypes.STRING(30),
          },
     
          isAdmin:{
               type: Sequelize.DataTypes.BOOLEAN,
               defaultValue: false,
               allowNull: false
          }
     });

     User.sync( {alter: true} ).then((data) =>{
          console.log('tableau User synchronisé')
     }).catch((error) =>{
          console.log(`erreur de synchronisation du tableau User: ${error}`)
     });
     return User;
   };