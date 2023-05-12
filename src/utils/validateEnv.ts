import {cleanEnv, num, port, str} from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_USER: str(),
    MONGO_PATH: str(),
    PORT: port(),
    JWT_SECRET: str(),
    JWT_ACCESS_EXPIRATION_SECONDS: num(),
    JWT_REFRESH_EXPIRATION_DAYS: num(),
  });
};

export default validateEnv;
