import jwt from 'jsonwebtoken';
import config from '../config/config';
import DataStoredInToken from '../interfaces/vendors/dataStoredInToken.interface';
import TokenData from '../interfaces/vendors/tokenData.interface';
import {UserDocument} from '../models/User.model';

const generateToken = (user: UserDocument): TokenData => {
  const {accessExpiration, secretKey} = config.jwt;
  const payload: DataStoredInToken = {
    id: user.id,
    role: user.role,
  };

  return {
    expiresIn: accessExpiration,
    token: jwt.sign(payload, secretKey as string, {expiresIn: accessExpiration}),
  };
};

const tokenService = {generateToken};

export default tokenService;
