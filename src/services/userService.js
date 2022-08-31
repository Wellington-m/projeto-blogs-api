const { User: userModel } = require('../database/models');
const tokenHelper = require('../helpers/token');

const findByEmail = async ({ email, password }) => {
  const [result] = await userModel.findAll({ where: { email } });

  if (!result || result.dataValues.password !== password) return null;

  const token = tokenHelper.createToken({ id: result.dataValues.id });

  return token;
};

const findAll = async () => {
  const result = await userModel.findAll();
  return result;
};

const create = async ({ displayName, email, password, image }) => {
  const user = await userModel.findAll({ where: { email } });
  if (user.length > 0) return null;

  const result = await userModel.create({ displayName, email, password, image });
  const token = tokenHelper.createToken({ id: result.id });
  return token;
};

module.exports = { findByEmail, create, findAll };