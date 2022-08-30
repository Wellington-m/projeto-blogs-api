const { User: userModel } = require('../database/models');

const findByEmail = async ({ email, password }) => {
  const [result] = await userModel.findAll({
    where: {
      email,
    },
  });

  if (result.dataValues.password !== password) return null;

  return result;
};

module.exports = { findByEmail };