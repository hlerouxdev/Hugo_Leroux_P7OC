const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var Comment = sequelize.define("Comment", {
          _id:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true
          },

          contentCommented:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false,
          },
     
          userId:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false
          },
     
          content:{
               type: Sequelize.DataTypes.STRING,
               allowNull: false
          },

          likes:{
               type: Sequelize.DataTypes.INTEGER,
          }
     });

     Comment.sync( {alter: true} ).then((data) =>{
          console.log('tableau comments synchronisé')
     }).catch((error) =>{
          console.log(`erreur de synchronisation du tableau comments: ${error}`);
     });
     return Comment;
 };