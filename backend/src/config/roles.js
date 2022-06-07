const allRoles = {
  user: ['createAnswer','createQuestion'],
  admin: ['createAnswer','createQuestion', 'getUsers', 'manageUsers'],
  moderator: ['createAnswer', 'createQuestion'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
