module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
    content: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
    published: {
      type:  DataTypes.DATETIME,
      allowNull: false,
    },
    updated: {
      type:  DataTypes.DATETIME,
      allowNull: false,
    },
  }, { tableName: 'BlogPosts', timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  }

  return BlogPosts;
};