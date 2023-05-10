import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import {catchAsync} from '../utils/catchAsync';

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});
