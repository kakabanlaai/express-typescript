import {cleanEnv, port, str} from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    MONGO_PASSWORD: str(),
    MONGO_USER: str(),
    MONGO_PATH: str(),
    PORT: port(),
  });
};

export default validateEnv;
