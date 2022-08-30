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

  PostCategories.associate = (models) => {
    PostCategories.belongsTo(models.BlogPosts, { as: 'blogPosts', foreignKey: 'postId' });
    PostCategories.belongsTo(models.Categories, { as: 'categories', foreignKey: 'categoryId' });
  };

  return PostCategories;
};