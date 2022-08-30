const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET;
const JWT_OPTIONS = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_KEY, JWT_OPTIONS);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, JWT_SECRET_KEY);
  return payload;
};

module.exports = { createToken, verifyToken };