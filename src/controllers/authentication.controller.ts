import {Request, Response} from 'express';
import httpStatus from 'http-status';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import userService from '../services/user.service';
import {catchAsync} from '../utils/catchAsync';

const registration = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  const token = tokenService.generateToken(newUser);
  res.status(httpStatus.CREATED).send({newUser, token});
});

const loggingIn = catchAsync(async (req: Request, res: Response) => {
  const {email, password}: {email: string; password: string} = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = tokenService.generateToken(user);
  res.send({user, token});
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const {refreshToken}: {refreshToken: string} = req.body;
  const token = await authService.refreshAuth(refreshToken);
  res.send(token);
});

const authController = {
  refreshToken,
  registration,
  loggingIn,
};

export default authController;
