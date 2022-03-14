'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      models.Comment.belongsTo(models.Publication, {
        foreignKey: {
          allowNull: false
        }
      }),
      {
        onDelete: 'cascade',
          hooks: true
      }
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    publicationId: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};