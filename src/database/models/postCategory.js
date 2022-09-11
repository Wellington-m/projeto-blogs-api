module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategory', {
    postId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
    }
  }, { tableName: 'PostCategories', timestamps: false });

  PostCategories.associate = (models) => {
    PostCategories.belongsTo(models.BlogPost, { as: 'blogPosts', foreignKey: 'postId' });
    PostCategories.belongsTo(models.Category, { as: 'categories', foreignKey: 'categoryId' });
  };

  return PostCategories;
};