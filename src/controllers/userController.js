const userService = require('../services/userService');

const ERROR_MESSAGE = 'Server error';

const findByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.findByEmail({ email, password });
  
    if (!result) return res.status(400).json({ message: 'Invalid fields' });
  
    return res.status(200).json({ token: result });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { findByEmail };