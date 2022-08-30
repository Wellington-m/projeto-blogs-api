module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
    email: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
    password: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
    image: {
      type:  DataTypes.VARCHAR,
      allowNull: false,
    },
  }, { tableName: 'Users', timestamps: false });

  return Users;
};