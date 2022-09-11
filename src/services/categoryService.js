const { Category: categoryModel } = require('../database/models');

const create = async (name) => {
  const result = await categoryModel.create({ name });
  console.log(result);
};

module.exports = { create };
