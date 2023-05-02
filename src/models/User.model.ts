import Joi from 'joi';
import {Document, Schema, model} from 'mongoose';
import IUser from '../interfaces/models/User';

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema<IUserModel>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
});

//create Joi schema
const userValidateSchema = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  email: Joi.string().email({minDomainSegments: 2}).required(),
};

export const CreateUserValidSchema = Joi.object(userValidateSchema);

//remove all required flag
export const UpdateUserValidateSchema = CreateUserValidSchema.fork(
  Object.keys(userValidateSchema),
  (schema) => schema.optional()
);

export const LoginDataValidSchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  email: Joi.string().email({minDomainSegments: 2}).required(),
});

const User = model<IUserModel>('User', UserSchema);

export default User;
