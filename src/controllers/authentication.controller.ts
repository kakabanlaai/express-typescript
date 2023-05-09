import {Request, Response} from 'express';
import httpStatus from 'http-status';
import authService from '../services/auth.service';
import tokenService from '../services/token.service';
import userService from '../services/user.service';
import {catchAsync} from '../utils/catchAsync';

export const registration = catchAsync(async (req: Request, res: Response) => {
  const newUser = await userService.createUser(req.body);
  const token = tokenService.generateToken(newUser);
  res.setHeader('Set-Cookie', authService.createCookie(token));
  res.status(httpStatus.CREATED).send(newUser);
});

export const loggingIn = catchAsync(async (req: Request, res: Response) => {
  const {email, password}: {email: string; password: string} = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = tokenService.generateToken(user);
  res.setHeader('Set-Cookie', authService.createCookie(token));
  res.send(user);
});
