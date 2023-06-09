import dotenv from 'dotenv';
import validateEnv from '../utils/validateEnv';

dotenv.config();
validateEnv();

const config = {
  mongo: {
    username: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${
      process.env.MONGO_PATH || ''
    }`,
  },
  server: {
    port: Number(process.env.PORT) || 3030,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || '',
    accessExpiration: Number(process.env.JWT_ACCESS_EXPIRATION_SECONDS) || 3600,
    refreshExpiration:
      Number(process.env.JWT_REFRESH_EXPIRATION_DAYS) * 24 * 60 * 60 || 1,
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};

export default config;
