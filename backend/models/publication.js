'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Publication.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
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
    UserId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    filePath: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};