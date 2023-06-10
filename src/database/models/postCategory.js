module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    },
    { tableName: 'PostCategories', timestamps: false }
  );

  PostCategories.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
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
