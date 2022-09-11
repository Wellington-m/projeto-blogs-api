const { Category: categoryModel } = require('../database/models');

const create = async (name) => {
  const result = await categoryModel.create({ name });
  return result;
};

module.exports = { create };
