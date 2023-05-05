import {Router} from 'express';
import {loggingIn, registration} from '../controllers/authentication.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import authValidation from '../validations/auth.validation';

const authRoute = Router();

authRoute.post(
  '/registration',
  validationMiddleware(authValidation.register),
  registration
);

authRoute.post('/login', validationMiddleware(authValidation.login), loggingIn);

export default authRoute;
