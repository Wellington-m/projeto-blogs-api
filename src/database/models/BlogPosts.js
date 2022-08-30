module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type:  DataTypes.DATE,
      allowNull: false,
    },
    updated: {
      type:  DataTypes.DATE,
      allowNull: false,
    },
  }, { tableName: 'BlogPosts', timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }

  return BlogPosts;
};