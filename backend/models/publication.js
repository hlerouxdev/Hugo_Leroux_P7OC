'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    static associate(models) {
      models.Publication.belongsTo(models.User),
      models.Publication.hasMany(models.Like, {
        onDelete: "cascade",
        hooks: true
      }),
      models.Publication.hasMany(models.Comment, {
        onDelete: "cascade",
        hooks: true
      })
    }
  }
  Publication.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    filePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};