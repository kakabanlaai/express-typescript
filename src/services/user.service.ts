import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import IUser from '../interfaces/models/user.interface';
import UserModel from '../models/User.model';

const createUser = async (userBody: IUser) => {
  if (await UserModel.findOne({email: userBody.email}))
    throw createHttpError(
      httpStatus.BAD_REQUEST,
      `User with email ${userBody.email} already exists.`
    );
  return UserModel.create(userBody);
};

const getUserById = async (id: string) => {
  return UserModel.findById(id);
};

const getUserByEmail = async (email: string) => {
  return UserModel.findOne({email});
};

const userService = {
  createUser,
  getUserByEmail,
  getUserById,
};

export default userService;
