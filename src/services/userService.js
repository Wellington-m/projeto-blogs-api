const { User: userModel } = require('../database/models');
const tokenHelper = require('../helpers/token');

const findByEmail = async ({ email, password }) => {
  const [result] = await userModel.findAll({ where: { email } });

  if (!result || result.dataValues.password !== password) return null;

  const token = tokenHelper.createToken({ id: result.dataValues.id });

  return token;
};

const findByPk = async (receiveId) => {
  const rows = await userModel.findByPk(receiveId);
  if (!rows) return null;
  const { id, displayName, email, image } = rows;
  return { id, displayName, email, image };
};

const findAll = async () => {
  const result = await userModel.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  if (result.length === 0) return null;
  return result;
};

const create = async ({ displayName, email, password, image }) => {
  const user = await userModel.findAll({ where: { email } });
  if (user.length > 0) return null;

  const result = await userModel.create({ displayName, email, password, image });
  const token = tokenHelper.createToken({ id: result.id });
  return token;
};

const destroy = async (id) => {
  await userModel.destroy({
    where: { id },
  });
  return true;
};

module.exports = { findByEmail, create, findAll, findByPk, destroy };