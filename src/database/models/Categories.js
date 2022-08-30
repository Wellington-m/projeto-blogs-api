module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    }
  }, { tableName: 'Categories', timestamps: false });

  return Categories;
};