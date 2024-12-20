import { Request, Response } from 'express';

export const weatherController = {

  getWeather(req: Request, res: Response) {
    try {
      // TODO: Implement weather service
      res.status(200).json({ message: 'Getting current weather' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getWeatherForecast(req: Request, res: Response) {
    try {
      // TODO: Implement forecast service
      res.status(200).json({ message: 'Getting weather forecast' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

}

