const allRoles = {
  user: [
    'getUser',
    'updateUser',
    'createQuestion',
    'deleteQuestion',
    'updateQuestion',
    'createAnswer',
    'voteAnswer',
    'searchQuestion',
    'updateAnswer',
    'deleteAnswer',
    'pickCorrectAnswer',
  ],

  moderator: ['approveDeclineQuestion', 'getPendingQuestions', 'banUser', 'getMetrics', 'getUsers'],

  admin: ['configForum'],
};

allRoles.moderator = allRoles.moderator.concat(allRoles.user);
allRoles.admin = allRoles.admin.concat(allRoles.moderator);

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
