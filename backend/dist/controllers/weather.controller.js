"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherForecast = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const WEATHER_API_KEY = '233e6c2040494734a82132204241712';
const BASE_URL = 'http://api.weatherapi.com/v1';
const getWeather = async (req, res) => {
    try {
        const { location } = req.params;
        const url = `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${location}`;
        const response = await axios_1.default.get(url);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch current weather data' });
    }
};
exports.getWeather = getWeather;
const getWeatherForecast = async (req, res) => {
    try {
        const { location } = req.params;
        const url = `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=1`;
        const response = await axios_1.default.get(url);
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather forecast data' });
    }
};
exports.getWeatherForecast = getWeatherForecast;
