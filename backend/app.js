const express = require('express');
const app = express();
const userRoutes = require('./routes/user.js');
const publicationRoutes = require('./routes/publication.js');
const Sequelize = require('sequelize');

require('dotenv').config({path: '../.env'});

const sequelize = new Sequelize('groupomania', process.env.sequelizeUser, process.env.sequelizePassword, {
     dialect: 'mysql',
     port: '3306'
});

sequelize.authenticate().then( ()=> {
     console.log('connexion réussie :)')
}) .catch(() => {
     console.log('connexion échouée :\'(')
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);

module.exports = app;