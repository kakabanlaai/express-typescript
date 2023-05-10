import {NextFunction, Request, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import Joi from 'joi';
import ValidationObj from '../interfaces/vendors/validationObj.interface';

const validateRequest = (schema: ValidationObj) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //get {body?:..., params?:...} to validate
    const validateValue = Object.keys(schema).reduce(
      (obj: {[key: string]: unknown}, key) => {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
          obj[key] = req[key as keyof Request];
        }
        return obj;
      },
      {}
    );

    const validationResult = Joi.object(schema).validate(validateValue);
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
