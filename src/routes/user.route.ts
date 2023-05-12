import express from 'express';
import userController from '../controllers/user.controller';
import auth from '../middlewares/auth.middleware';
import validateRequest from '../middlewares/validation.middleware';
import userValidation from '../validations/user.validation';
const userRoute = express.Router();

userRoute
  .route('/')
  .post(
    auth('manageUsers'),
    validateRequest(userValidation.createUser),
    userController.createUser
  )
  .get(auth('manageUsers'), userController.getUsers);

userRoute
  .route('/:id')
  .get(
    auth('manageUsers'),
    validateRequest(userValidation.getUser),
    userController.getUser
  )
  .patch(
    auth('manageUsers'),
    validateRequest(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    auth('manageUsers'),
    validateRequest(userValidation.deleteUser),
    userController.deleteUser
  );

export default userRoute;
