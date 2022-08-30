const { User: userModel } = require('../database/models');

const findAll = async () => {
  const result = await userModel.findAll();
  console.log(result);
  return result;
};

module.exports = { findAll };