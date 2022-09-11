const categoryService = require('../services/categoryService');

const create = async (req, _res) => {
  const { name } = req.body;
  await categoryService.create(name);
};

module.exports = { create };