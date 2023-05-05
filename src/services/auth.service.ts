import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import TokenData from '../interfaces/vendors/tokenData.interface';
import userService from './user.service';

const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Wrong credentials provided');
  }
  return user;
};

const createCookie = (tokenData: TokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};

const authService = {
  loginUserWithEmailAndPassword,
  createCookie,
};

export default authService;
