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
  
  sequelize.authenticate().then( ()=> {
    console.log('connexion réussie :)');
}) .catch((error) => {
    console.log(error);
    console.log('connexion échouée :\'(');
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
