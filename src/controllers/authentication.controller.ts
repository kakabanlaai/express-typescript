import bcrypt from 'bcrypt';
import {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import IUser from '../interfaces/models/User';
import User from '../models/User.model';

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: IUser = req.body;
  if (await User.findOne({email: userData.email})) {
    next(
      createHttpError(400, `User with email ${userData.email} already exists.`)
    );
  } else {
    const hashPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({
      ...userData,
      password: hashPassword,
    });

    newUser.password = '';

    res.send(newUser);
  }
};

export const loggingIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logInData: {email: string; password: string} = req.body;
  const user = await User.findOne({email: logInData.email});
  if (user) {
    const isPasswordMatching = await bcrypt.compare(
      logInData.password,
      user.password
    );
    if (isPasswordMatching) {
      user.password = '';
      res.send(user);
    } else {
      next(createHttpError(401, 'Wrong credentials provided'));
    }
  } else {
    next(createHttpError(401, 'Wrong credentials provided'));
  }
};
