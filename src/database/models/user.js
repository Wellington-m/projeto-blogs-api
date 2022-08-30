module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:  DataTypes.STRING,
      allowNull: false,
    },
  }, { tableName: 'Users', timestamps: false });

  return Users;
};