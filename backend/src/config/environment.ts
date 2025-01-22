import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | undefined;
  mongoUri: string | undefined;
  nodeEnv: string | undefined;
}

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://ntpn294:Avans1234@ntpnavans.g3clv.mongodb.net/SportCaster',
  corsOrigin: process.env.CORS_ORIGIN || 'https://happy-sea-04e498803.4.azurestaticapps.net'
};