import { Request, Response } from 'express';
import axios from 'axios';

const WEATHER_API_KEY = '233e6c2040494734a82132204241712';
const BASE_URL = 'http://api.weatherapi.com/v1';

export const getWeather = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    const url = `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${location}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch current weather data' });
  }
};

export const getWeatherForecast = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    const url = `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1`;
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather forecast data' });
  }
};