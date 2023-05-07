const userService = require('../services/userService');

const ERROR_MESSAGE = 'Server error';
const USER_NOT_FOUND_ERROR = 'No user was found!';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.findByEmail({ email, password });
  
    if (!result) return res.status(400).json({ message: 'Invalid fields' });
  
    return res.status(200).json({ token: result });
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const findByPk = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.findByPk(id);
    if (!result) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: ERROR_MESSAGE });
  }
};

const findAll = async (_req, res) => {
  try {
    const result = await userService.findAll();
    if (!result) return res.status(204).json({ message: USER_NOT_FOUND_ERROR });
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

const destroy = async (req, res) => {
  const { id } = req;
  const result = await userService.destroy(id);
  if (result) return res.status(204).json();
};

module.exports = { login, create, findAll, findByPk, destroy };