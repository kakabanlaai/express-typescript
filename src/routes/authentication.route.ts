import {Router} from 'express';
import authController from '../controllers/authentication.controller';
import auth from '../middlewares/auth.middleware';
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

authRoute.post(
  '/send-verification-email',
  auth(),
  authController.sendVerificationMail
);

authRoute.get(
  '/verify-email',
  validateRequest(authValidation.verifyEmail),
  authController.verifyEmail
);

export default authRoute;
