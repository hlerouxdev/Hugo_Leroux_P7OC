const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var Like = sequelize.define('Like', {
          userLiked:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false
          },
     
          contentLiked:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false
          }
     });

     Like.associate = models => {
          Like.belongsTo(models.User, {
               foreignKey: 'userLiked',
               targetKey: '_id',
               onDelete: 'cascade'
          })
     };

     Like.associate = models => {
          Like.belongsTo(models.Publication, {
               foreignKey: 'contentLiked',
               targetKey: '_id',
               onDelete: 'cascade'
          })
     };

     Like.sync( {alter: true} ).then((data) =>{
          console.log('tableau likes synchronisé')
     }).catch((error) =>{
          console.log(`erreur de synchronisation du tableau likes: ${error}`);
     });
     return Like;
};