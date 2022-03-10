'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;
require('dotenv').config({path: '../.env'});
sequelize = new Sequelize(process.env.sequelizeDb, process.env.sequelizeUser, process.env.sequelizePassword, {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306'
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//associations
db.User.hasMany(db.Publication);
db.User.hasMany(db.Like);
db.User.hasMany(db.Comment);

db.Publication.hasMany(db.Comment);
db.Publication.hasMany(db.Like);
db.Publication.belongsTo(db.User);

db.Comment.belongsTo(db.Publication);
db.Comment.belongsTo(db.User);

db.Like.belongsTo(db.Publication);
db.Like.belongsTo(db.User);
  
sequelize.authenticate()
.then( ()=> {
    console.log('connexion réussie :)');
}) .catch((error) => {
    console.log(`connexion échouée :'( ${error}`);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;