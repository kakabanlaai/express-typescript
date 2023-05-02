import express from 'express';
import authRoute from './authentication.route';
import userRoute from './user.route';

const route = express.Router();

route.use(authRoute);
route.use(userRoute);

export default route;
