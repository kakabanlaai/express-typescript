import {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import {Schema} from 'joi';

const validationMiddleware = (validateSchema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = validateSchema.validate(req.body);
    if (value.error) {
      next(createHttpError(400, value.error?.message as string));
    } else {
      next();
    }
  };
};

export default validationMiddleware;
