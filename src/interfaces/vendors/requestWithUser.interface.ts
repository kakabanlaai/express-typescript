import {Request} from 'express';
import {UserDocument} from '../../models/User.model';

export default interface RequestWithUser extends Request {
  user?: UserDocument;
}
