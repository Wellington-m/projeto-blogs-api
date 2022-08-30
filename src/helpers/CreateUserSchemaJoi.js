const Joi = require('joi');

const DISPLAY_NAME_MESSAGE = '"displayName" length must be at least 8 characters long';
const EMAIL_MESSAGE = '"email" must be a valid email';
const PASSWORD_MESSAGE = '"password" length must be at least 6 characters long';

const createUserSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'any.required': DISPLAY_NAME_MESSAGE,
    'string.empty': DISPLAY_NAME_MESSAGE,
    'string.min': DISPLAY_NAME_MESSAGE,
  }),
  email: Joi.string().email().required().messages({
    'any.required': EMAIL_MESSAGE,
    'string.empty': EMAIL_MESSAGE,
    'string.email': EMAIL_MESSAGE,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': PASSWORD_MESSAGE,
    'string.empty': PASSWORD_MESSAGE,
    'string.min': PASSWORD_MESSAGE,
  }),
  image: Joi.string(),
});

module.exports = createUserSchema;