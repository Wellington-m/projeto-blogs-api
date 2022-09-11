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
    models.BlogPost.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPost',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategories;
};