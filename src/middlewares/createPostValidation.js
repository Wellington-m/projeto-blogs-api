const createPostSchema = require('../helpers/createPostschemaJoi');

const createPostValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = createPostSchema.validate({ title, content, categoryIds });
  console.log(error);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = createPostValidation;