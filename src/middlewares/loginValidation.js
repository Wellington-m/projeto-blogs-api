const loginSchema = require('../helpers/loginSchemaJoi');

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = loginValidation;