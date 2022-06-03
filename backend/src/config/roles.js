const allRoles = {
  user: ['getUser', 'updateUser', 'createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'],
  admin: ['getUser', 'updateUser', 'createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer', 'getUsers'],
  moderator: ['getUser', 'updateUser', 'createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
