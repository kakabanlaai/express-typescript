import {Router} from 'express';
import authController from '../controllers/authentication.controller';
import validateRequest from '../middlewares/validation.middleware';
import authValidation from '../validations/auth.validation';

const authRoute = Router();

authRoute.post(
  '/registration',
  validateRequest(authValidation.register),
  authController.registration
);

authRoute.post(
  '/login',
  validateRequest(authValidation.login),
  authController.loggingIn
);

authRoute.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokens),
  authController.refreshToken
);

export default authRoute;
