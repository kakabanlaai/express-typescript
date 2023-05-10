import Joi from 'joi';
import {isObjectIdOrHexString} from 'mongoose';
import ValidationObj from '../interfaces/vendors/validationObj.interface';

const createUser: ValidationObj = {};

const getUser: ValidationObj = {
  params: Joi.object().keys({
    id: Joi.string().custom((value, helpers) => {
      if (!isObjectIdOrHexString(value)) {
        return helpers.error('any.invalid');
      }

      return value;
    }),
  }),
};

const userValidation = {
  getUser,
};

export default userValidation;
