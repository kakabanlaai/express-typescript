import {Router} from 'express';
import authRoutes from './authentication.route';
import userRoutes from './user.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

export default router;
