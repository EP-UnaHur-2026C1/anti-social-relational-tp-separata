'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      })
      
      Post.hasMany(models.Post_Images, {
        foreignKey: "postId",
        as: "images"
      })

      Post.hasMany(models.Comment, {
        foreignKey: "postId",
        as: "comments"
      })

      Post.belongsToMany(models.Tag, {
        through: "PostTag",
        foreignKey: "postId",
        otherKey: "tagId",
        as: "tags"
      })
    }
  }
  Post.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};