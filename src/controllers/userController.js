const userService = require('../services/userService');

const findByEmail = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.findByEmail({ email, password });
  return res.status(200).json(result);
};

module.exports = { findByEmail };