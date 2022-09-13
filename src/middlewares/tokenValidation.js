const tokenHelper = require('../helpers/token');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const result = tokenHelper.verifyToken(authorization);
  if (!result) return res.status(401).json({ message: 'Expired or invalid token' });

  req.id = result.id;

  next();
};

module.exports = tokenValidation;