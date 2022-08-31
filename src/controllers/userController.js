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

const findAll = async (_req, res) => {
  try {
    const result = await userService.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await userService.create({ displayName, email, password, image });
  
    if (!result) return res.status(409).json({ message: 'User already registered' });
  
    return res.status(201).json({ token: result });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

module.exports = { findByEmail, create, findAll };