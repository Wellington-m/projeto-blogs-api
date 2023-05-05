const jwt = require('jsonwebtoken');
require('dotenv/config');

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secret';
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY, JWT_OPTIONS);
  return token;
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = { createToken, verifyToken };