const { User: userModel } = require('../database/models');
const tokenHelper = require('../helpers/token');

const findByEmail = async ({ email, password }) => {
  const [result] = await userModel.findAll({
    where: {
      email,
    },
  });

  if (!result || result.dataValues.password !== password) return null;

  const token = tokenHelper.createToken({ id: result.dataValues.id });

  return token;
};

module.exports = { findByEmail };