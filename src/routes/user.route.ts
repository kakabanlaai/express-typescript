import express from 'express';
import {getUser} from '../controllers/user.controller';
import auth from '../middlewares/auth.middleware';
const userRoute = express.Router();

userRoute.get('/:id', auth('getUsers'), getUser);

export default userRoute;
