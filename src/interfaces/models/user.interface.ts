import {unionRoleType} from '../../config/role';

export default interface IUser {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: unionRoleType;
  isEmailVerified: boolean;
}
