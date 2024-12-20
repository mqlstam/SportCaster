import express from 'express';
import { getWeather, getWeatherForecast } from '../controllers/weather.controller';

const router = express.Router();

router.get('/current/:location', getWeather);
router.get('/forecast/:location', getWeatherForecast);

export default router;