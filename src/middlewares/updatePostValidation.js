const updatePostSchema = require('../helpers/updatePostSchemaJoi');

const updatePostValidation = (req, res, next) => {
  const { title, content } = req.body;

  const { error } = updatePostSchema.validate({ title, content });

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = updatePostValidation;