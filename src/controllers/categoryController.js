const categoryService = require('../services/categoryService');

const ERROR_MESSAGE = 'Server error';

const findAll = async (_req, res) => {
  try {
    const result = await categoryService.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
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