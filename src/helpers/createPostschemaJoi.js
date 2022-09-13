const Joi = require('joi');

const MESSAGE_ERROR = 'Some required fields are missing';

const createPostschemaJoi = Joi.object({
  title: Joi.string().required().messages({
    'any.required': MESSAGE_ERROR,
    'string.empty': MESSAGE_ERROR,
  }),
  content: Joi.string().required().messages({
    'any.required': MESSAGE_ERROR,
    'string.empty': MESSAGE_ERROR,
  }),
  categoryIds: Joi.array().required().items(Joi.number()).messages({
    'any.required': MESSAGE_ERROR,
    'string.empty': MESSAGE_ERROR,
  }),
});

module.exports = createPostschemaJoi;