const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('groupomania', 'root', 'L@GrandeArm33', {
     host: 'localhost',
     port: "3306",
     dialect: 'mysql'
});
const userRoutes = require('./routes/user.js');
const publicationRoutes = require('./routes/publication.js');

app.use(express.json());

async () => {
     try {
          await sequelize.authenticate();
          console.log('Connection has been established successfully.');
     } catch (error) {
          console.error('Unable to connect to the database:', error);
     }
}

app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);

module.exports = app