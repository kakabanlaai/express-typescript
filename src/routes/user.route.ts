import express, {Response} from 'express';
const userRoute = express.Router();

userRoute.get('/v1/users', (req, res: Response): Response => {
  return res.send('Get all user');
});

export default userRoute;
