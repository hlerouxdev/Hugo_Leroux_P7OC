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
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    department: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    adress: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};