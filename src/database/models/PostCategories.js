module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    postId: {
      type:  DataTypes.INT,
      allowNull: false,
    },
    categoryId: {
      type:  DataTypes.INT,
      allowNull: false,
    }
  }, { tableName: 'PostCategories', timestamps: false });

  return PostCategories;
};