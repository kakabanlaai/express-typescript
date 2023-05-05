import dotenv from 'dotenv';

dotenv.config();

const MONGO_USER = process.env.MONGO_USER || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_PATH = process.env.MONGO_PATH || '';
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;

const PORT = process.env.PORT ? Number(process.env.PORT) : 3030;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_EXPIRATION_SECONDS = Number(
  process.env.JWT_ACCESS_EXPIRATION_SECONDS
);

const config = {
  mongo: {
    username: MONGO_USER,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: PORT,
  },
  jwt: {
    secretKey: JWT_SECRET,
    accessExpiration: JWT_ACCESS_EXPIRATION_SECONDS,
  },
};

export default config;
