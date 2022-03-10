const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var Publication = sequelize.define('Publication', {
          _id:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true
          },

          userId:{
               type: Sequelize.DataTypes.INTEGER,
               allowNull: false
          },
     
          content:{
               type: Sequelize.DataTypes.STRING,
               allowNull: false
          },

          filePath:{
               type: Sequelize.DataTypes.STRING
          },
     
          likes:{
               type: Sequelize.DataTypes.INTEGER,
          }
     });

     Publication.associate = models => {
          Publication.belongsTo(models.User, {
               foreignKey: 'userId',
               targetKey: '_id',
               onDelete: 'cascade',
               onUpdate: 'cascade'
          })
     }

     Publication.associate = models => {
          Publication.hasMany(models.Comment, {
               onDelete: 'cascade'
          });
     };

     Publication.associate = models => {
          Publication.hasMany(models.Like, {
               onDelete: 'cascade'
          });
     };

     Publication.sync( {alter: true} ).then((data) =>{
          console.log('tableau publications synchronisé')
     }).catch((error) =>{
          console.log(`erreur de synchronisation du tableau publications: ${error}`);
     });
     return Publication;
   };