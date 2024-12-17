import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string | undefined;
  mongoUri: string | undefined;
  nodeEnv: string | undefined;
}

export const config: Config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV,
};