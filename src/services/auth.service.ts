import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import TokenData from '../interfaces/vendors/tokenData.interface';
import tokenService from './token.service';
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

const refreshAuth = async (refreshToken: string): Promise<TokenData> => {
  try {
    const tokenData = tokenService.verifyToken(refreshToken);
    const user = await userService.getUserById(tokenData.id);

    if (user) {
      return tokenService.generateToken(user);
    } else {
      throw createHttpError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
  } catch (error) {
    throw createHttpError(
      httpStatus.UNAUTHORIZED,
      (error as {message: string}).message
    );
  }
};

const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken);
    const user = await userService.getUserById(verifyEmailTokenDoc.id);
    if (!user) {
      throw new Error();
    }
    user.isEmailVerified = true;
    await user.save();
  } catch (error) {
    throw createHttpError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

const authService = {
  loginUserWithEmailAndPassword,
  refreshAuth,
  verifyEmail,
};

export default authService;
