import express from 'express';
import weatherRoutes from './weather.routes';
import sportRoutes from './sport.routes';
import userRoutes from './user.routes';

const router = express.Router();

router.use('/weather', weatherRoutes);
router.use('/sports', sportRoutes);
router.use('/users', userRoutes);

export default router;