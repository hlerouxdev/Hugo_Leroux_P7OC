const { Model } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
     var Publication = sequelize.define("Publication", {
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
          },
     
          usersLiked:{
               type: Sequelize.DataTypes.STRING,
               get() {
                    return this.getDataValue('usersLiked').split(';')
                },
                set(val) {
                   this.setDataValue('usersLiked',val.join(';'));
                },
               defaultValue: '[]'
          }
     });

     Publication.sync( {alter: true} ).then((data) =>{
          console.log('tableau Publication synchronisé')
     }).catch((error) =>{
          console.log('erreur de synchronisation du tableau Publication')
     });
     return Publication;
   };