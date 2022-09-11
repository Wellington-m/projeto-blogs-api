const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'name is required',
    'string.empty': 'name is required',
  }),
});

module.exports = createCategorySchema;