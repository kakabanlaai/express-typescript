import {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import Joi from 'joi';

const validationMiddleware = (validateSchema: object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = Joi.object(validateSchema).validate(req.body);
    if (value.error) {
      next(
        createHttpError(httpStatus.BAD_REQUEST, value.error?.message as string)
      );
    } else {
      next();
    }
  };
};

export default validationMiddleware;
