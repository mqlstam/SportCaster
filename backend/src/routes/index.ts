import express from 'express';
import weatherRoutes from './weather.routes';
import sportRoutes from './sport.routes';

const router = express.Router();

router.use('/weather', weatherRoutes);
router.use('/sports', sportRoutes);

export default router;