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

const getAllUser = async () => {
  const result = await UserModel.find();
  return result;
};

const getUserById = async (id: string) => {
  return UserModel.findById(id);
};

const getUserByEmail = async (email: string) => {
  return UserModel.findOne({email});
};

const updateUserById = async (id: string, updateBody: IUser) => {
  const user = await getUserById(id);
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (
    updateBody.email &&
    (await UserModel.findOne({email: updateBody.email, _id: {$ne: user.id}}))
  ) {
    throw createHttpError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await getUserById(id);
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'User not found');
  }

  await user.deleteOne();
  return user;
};

const userService = {
  createUser,
  getUserByEmail,
  getUserById,
  deleteUserById,
  updateUserById,
  getAllUser,
};

export default userService;
