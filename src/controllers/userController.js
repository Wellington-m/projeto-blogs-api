const userService = require('../services/userService');

const findAll = async (req, res) => {
  const result = userService.findAll();
  return res.status(200).json(result);
};

module.exports = { findAll };