const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var Like = sequelize.define("Like", {
          userLiked:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false
          },
     
          contentLiked:{
               type: Sequelize.DataTypes.STRING,
               allowNull: false
          }
     });

     Like.sync( {alter: true} ).then((data) =>{
          console.log('tableau likes synchronisé')
     }).catch((error) =>{
          console.log(`erreur de synchronisation du tableau likes: ${error}`);
     });
     return Like;
};