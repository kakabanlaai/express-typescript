import {unionRoleType} from '../../config/role';

export default interface DataStoredInToken {
  id: string;
  role: unionRoleType;
}
