import Joi from 'joi';
import role from '../config/role';
import IUser from '../interfaces/models/user.interface';
import ValidationObj from '../interfaces/vendors/validationObj.interface';
import {objectId, password} from './custom.validate';

const createUser: ValidationObj<IUser> = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required().custom(password),
    email: Joi.string().email({minDomainSegments: 2}).required(),
    role: Joi.string()
      .required()
      .valid(...role.roles),
  }),
};

const getUser: ValidationObj = {
  params: Joi.object({
    id: Joi.required().custom(objectId),
  }),
};

const deleteUser: ValidationObj = {
  params: Joi.object({
    id: Joi.required().custom(objectId),
  }),
};

const updateUser: ValidationObj<IUser> = {
  body: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    password: Joi.string().custom(password),
    email: Joi.string().email({minDomainSegments: 2}),
  }),
  params: Joi.object({
    id: Joi.required().custom(objectId),
  }),
};

const userValidation = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
export default userValidation;
