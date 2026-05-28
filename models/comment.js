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
      // define association here
      Comment.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post"
      })
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      })
    }
  }
  Comment.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    esVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    postId: {
      type: DataTypes.INTEGER,
      allownull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allownull: false
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};