import {Router} from 'express';
import {loggingIn, registration} from '../controllers/authentication.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import {CreateUserValidSchema, LoginDataValidSchema} from '../models/User.model';

const path = '/auth';
const authRoute = Router();

authRoute.post(
  `${path}/registration`,
  validationMiddleware(CreateUserValidSchema),
  registration
);

authRoute.post(
  `${path}/login`,
  validationMiddleware(LoginDataValidSchema),
  loggingIn
);

export default authRoute;
