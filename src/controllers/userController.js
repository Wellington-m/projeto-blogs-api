const userService = require('../services/userService');

const findByEmail = async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.findByEmail({ email, password });

  if (!result) return res.status(400).json({ message: 'Invalid fields' });

  return res.status(200).json({ token: result });
};

module.exports = { findByEmail };