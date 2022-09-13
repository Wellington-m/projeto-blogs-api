module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    published: {
      type:  DataTypes.DATE,
      allowNull: true,
    },
    updated: {
      type:  DataTypes.DATE,
      allowNull: true,
    },
  }, { tableName: 'BlogPosts', timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  }

  return BlogPosts;
};