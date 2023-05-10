export type requiredType = 'getUsers' | 'manageUsers';
export type unionRoleType = 'admin' | 'user';

const allRoles: {[k in unionRoleType]: requiredType[]} = {
  admin: ['getUsers', 'manageUsers'],
  user: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles)) as Map<
  unionRoleType,
  string[]
>;

export default {
  roles,
  roleRights,
};
