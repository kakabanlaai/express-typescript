import {NextFunction, Response} from 'express';
import createHttpError from 'http-errors';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import role, {requiredType} from '../config/role';
import DataStoredInToken from '../interfaces/vendors/dataStoredInToken.interface';
import RequestWithUser from '../interfaces/vendors/requestWithUser.interface';
import userService from '../services/user.service';

const auth = (...requiredRights: requiredType[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      try {
        const jwtPayload = jwt.verify(
          token,
          config.jwt.secretKey
        ) as DataStoredInToken;

        //check user can access required
        if (requiredRights) {
          const userRights = role.roleRights.get(jwtPayload.role);
          const hasRequiredRights = requiredRights.every((require) =>
            userRights?.includes(require)
          );
          if (!hasRequiredRights) {
            next(createHttpError(httpStatus.FORBIDDEN, 'Forbidden'));
          }
        }

        const user = await userService.getUserById(jwtPayload.id);
        if (user) {
          req.user = user;
          next();
        } else {
          next(createHttpError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
        }
      } catch (error) {
        // console.log(error);
        next(createHttpError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
      }
    } else {
      next(createHttpError(httpStatus.UNAUTHORIZED, 'Missing token'));
    }
  };
};

export default auth;
