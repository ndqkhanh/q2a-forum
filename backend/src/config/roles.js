const allRoles = {
  user: ['getUser', 'updateUser', 'createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'
,'createQuestion','deleteQuestion','updateQuestion'
,'voteAnswer', 'searchQuestion'],
  admin: [
    'banUser',
    'getMetrics',
    'getUser',
    'updateUser',
    'createAnswer',
    'updateAnswer',
    'deleteAnswer',
    'pickCorrectAnswer',
    'getUsers',
    'createAnswer','createQuestion','deleteQuestion','updateQuestion' ,'getUsers', 'manageUsers'
  ,'voteAnswer', 'searchQuestion',
  ],
  moderator: ['getMetrics', 'getUser', 'updateUser', 'createAnswer', 
  'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer',
  , 'createQuestion','deleteQuestion','updateQuestion'
  ,'voteAnswer', 'searchQuestion'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
