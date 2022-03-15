'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Like.belongsTo(models.Publication, {
        foreignKey: {
          allowNull: false,
          onDelete: "cascade",
          hooks: true
        }
      }),
      models.Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
          onDelete: "cascade",
          hooks: true
        }
      })
    }
  }
  Like.init({
    UserId: DataTypes.INTEGER,
    PublicationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};