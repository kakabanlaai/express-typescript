import Joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const register = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required().regex(passwordRegex).messages({
    'string.pattern.base':
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit',
  }),
  email: Joi.string().email({minDomainSegments: 2}).required(),
};

const login = {
  password: Joi.string().required().regex(passwordRegex).messages({
    'string.pattern.base':
      'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit',
  }),
  email: Joi.string().email({minDomainSegments: 2}).required(),
};

const authValidation = {
  register,
  login,
};

export default authValidation;
