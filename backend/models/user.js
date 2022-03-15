'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Publication, {
        onDelete: "cascade",
        hooks: true
      }),
      models.User.hasMany(models.Like, {
        onDelete: "cascade",
        hooks: true
      }),
      models.User.hasMany(models.Comment, {
        onDelete: "cascade",
        hooks: true
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthDay: DataTypes.DATE,
    department: DataTypes.STRING,
    adress: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};