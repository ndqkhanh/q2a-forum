const allRoles = {
  user: ['createAnswer', 'createQuestion'],
  admin: ['createAnswer', 'getUsers', 'manageUsers'],
  moderator: ['createAnswer']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
