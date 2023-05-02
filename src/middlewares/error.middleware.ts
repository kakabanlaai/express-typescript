import {NextFunction, Request, Response} from 'express';
import IError from '../interfaces/vendors/IError';

const errorMiddleware = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message || 'Something went wrong',
  } as IError);
};

export default errorMiddleware;
