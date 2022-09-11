const createCategorySchema = require('../helpers/createCategorySchemaJoi');

const createCategoryValidation = (req, res, next) => {
  const { name } = req.body;

  const { error } = createCategorySchema.validate({ name });

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = createCategoryValidation;