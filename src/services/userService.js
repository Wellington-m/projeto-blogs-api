const { user: userModel } = require('../database/models');

const findAll = async () => {
  const result = await userModel.findAll();
  return result;
};

module.exports = { findAll };