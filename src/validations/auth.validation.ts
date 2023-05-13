import Joi from 'joi';
import ValidationObj from '../interfaces/vendors/validationObj.interface';
import {password} from './custom.validate';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const register: ValidationObj = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email({minDomainSegments: 2}).required(),
  }),
};

const login: ValidationObj = {
  body: Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email({minDomainSegments: 2}).required(),
  }),
};

const refreshTokens: ValidationObj = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const authValidation = {
  register,
  login,
  refreshTokens,
  verifyEmail,
};

export default authValidation;
