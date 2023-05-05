import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import IUser from '../interfaces/models/user.interface';
import User from '../models/User.model';

const createUser = async (userBody: IUser) => {
  if (await User.findOne({email: userBody.email}))
    throw createHttpError(
      httpStatus.BAD_REQUEST,
      `User with email ${userBody.email} already exists.`
    );

  return User.create(userBody);
};

const getUserByEmail = async (email: string) => {
  return User.findOne({email});
};

const userService = {
  createUser,
  getUserByEmail,
};

export default userService;
