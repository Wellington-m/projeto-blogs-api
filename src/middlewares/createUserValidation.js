const createUserSchema = require('../helpers/CreateUserSchemaJoi');

const createUserValidation = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const { error } = createUserSchema.validate({ displayName, email, password, image });

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = createUserValidation;