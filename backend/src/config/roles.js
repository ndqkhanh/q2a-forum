const allRoles = {
  user: ['createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'],
  admin: ['createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer', 'getUsers', 'manageUsers'],
  moderator: ['createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
