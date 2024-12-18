import express from 'express';
import { weatherController } from '../controllers/weather.controller';

const router = express.Router();

router.get('/current/:location', weatherController.getWeather);
router.get('/forecast/:location', weatherController.getWeatherForecast);

export default router;