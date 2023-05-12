import {Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import userService from '../services/user.service';
import {catchAsync} from '../utils/catchAsync';

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw createHttpError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const queryResult = await userService.getAllUser();

  res.send(queryResult);
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);
  const newUser = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(newUser);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.deleteUserById(req.params.id);
  res.send(user);
});

const userController = {getUser, createUser, updateUser, deleteUser, getUsers};

export default userController;
