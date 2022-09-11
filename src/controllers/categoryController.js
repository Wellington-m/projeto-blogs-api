const categoryService = require('../services/categoryService');

const ERROR_MESSAGE = 'Server error';

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const { dataValues } = await categoryService.create(name);
  
    return res.status(201).json({ id: dataValues.id, name: dataValues.name });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { create };