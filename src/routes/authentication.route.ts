import {Router} from 'express';
import {loggingIn, registration} from '../controllers/authentication.controller';
import validateRequest from '../middlewares/validation.middleware';
import authValidation from '../validations/auth.validation';

const authRoute = Router();

authRoute.post(
  '/registration',
  validateRequest(authValidation.register),
  registration
);

authRoute.post('/login', validateRequest(authValidation.login), loggingIn);

export default authRoute;
