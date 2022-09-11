const categoryService = require('../services/categoryService');

const ERROR_MESSAGE = 'Server error';

const findAll = async () => {
  const result = await categoryService.findAll();
  console.log(result);
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { dataValues } = await categoryService.create(name);
  
    return res.status(201).json({ id: dataValues.id, name: dataValues.name });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { findAll, create };