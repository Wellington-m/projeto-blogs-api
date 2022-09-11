const { Category: categoryModel } = require('../database/models');

const findAll = async () => {
  const result = await categoryModel.findAll();
  return result;
};

const create = async (name) => {
  const result = await categoryModel.create({ name });
  return result;
};

module.exports = { findAll, create };
