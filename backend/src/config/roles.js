const allRoles = {
  user: ['createAnswer','createQuestion','deleteQuestion','updateQuestion'
  ,'voteAnswer', 'searchQuestion'],
  admin: ['createAnswer','createQuestion','deleteQuestion','updateQuestion' ,'getUsers', 'manageUsers'
  ,'voteAnswer', 'searchQuestion'],
  moderator: ['createAnswer', 'createQuestion','deleteQuestion','updateQuestion'
  ,'voteAnswer', 'searchQuestion'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
