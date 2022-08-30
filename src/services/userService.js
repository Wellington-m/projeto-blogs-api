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

const create = async ({ displayName, email, password, image }) => {
  const result = await userModel.create({ displayName, email, password, image });
  return result;
};

module.exports = { findByEmail, create };