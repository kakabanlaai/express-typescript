import jwt from 'jsonwebtoken';
import config from '../config/config';
import DataStoredInToken from '../interfaces/vendors/dataStoredInToken.interface';
import TokenData from '../interfaces/vendors/tokenData.interface';
import {UserDocument} from '../models/User.model';

const generateToken = (user: UserDocument): TokenData => {
  const {accessExpiration, secretKey, refreshExpiration} = config.jwt;
  const payload: DataStoredInToken = {
    id: user.id,
    role: user.role,
  };

  return {
    access: {
      expiresIn: Date.now() + accessExpiration * 1000,
      token: jwt.sign(payload, secretKey as string, {
        expiresIn: accessExpiration,
      }),
    },
    refresh: {
      expiresIn: Date.now() + refreshExpiration * 1000,
      token: jwt.sign(payload, secretKey as string, {
        expiresIn: refreshExpiration,
      }),
    },
  };
};

const verifyToken = (token: string) => {
  const payload = jwt.verify(token, config.jwt.secretKey) as DataStoredInToken;

  return payload;
};

const tokenService = {generateToken, verifyToken};

export default tokenService;
