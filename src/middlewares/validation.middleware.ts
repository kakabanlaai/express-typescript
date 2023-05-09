import {NextFunction as ExpressNext, Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import {ObjectSchema} from 'joi';

const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: ExpressNext) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(
        createHttpError(
          httpStatus.BAD_REQUEST,
          validationResult.error.message as string
        )
      );
    } else {
      next();
    }
  };
};

export default validateRequest;
