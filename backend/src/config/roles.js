const allRoles = {
  user: ['getUser', 'updateUser','createQuestion','deleteQuestion','updateQuestion', 'createAnswer'
  ,'voteAnswer', 'searchQuestion', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'],

  admin: [
    'banUser',
    'getMetrics',
    'getUsers',
    'createAnswer','createQuestion','deleteQuestion','updateQuestion' ,'getUsers', 'manageUsers'
  ,'voteAnswer', 'searchQuestion',
  ],

  moderator: [
    'banUser',
    'getMetrics',
    'getUsers',
  ],
};

allRoles.admin = allRoles.admin.concat(allRoles.user)
allRoles.moderator = allRoles.moderator.concat(allRoles.user)

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
