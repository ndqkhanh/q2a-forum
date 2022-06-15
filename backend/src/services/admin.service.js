const httpStatus = require('http-status');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');
const userService = require('./user.service');

const getAllMetrics = async () => {
  const questionCount = await prisma.questions.count();
  const userCount = await prisma.users.count();
  const answerCount = await prisma.answers.count();
  return { questionCount, userCount, answerCount };
};

const disableUser = async (req) => {
  const checkUserExists = await userService.getUserById(req.params.userId);
  if (!checkUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!(checkUserExists.role === 2)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is a moderator or an admin');
  }
  if (checkUserExists.disabled === true && req.body.status === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already banned');
  } else if (checkUserExists.disabled === false && req.body.status === false) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already unbanned');
  }
  const user = await prisma.users.update({
    where: { id: req.params.userId },
    data: { disabled: req.body.status },
  });
  return user;
};

const getPendingQuestions = async (page, limit) => {
  const list_pending_quetions = await prisma.questions.findMany({
    skip: page * limit,
    take: limit,
    orderBy: {
      updated_at: 'desc',
    },
  });
  return list_pending_quetions;
};

const approveDeclineQuestion = async (questionId, status) => {
  const question = await prisma.questions.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  if (question.status !== 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question is already approved or declined');
  }
  const questionResult = await prisma.questions.update({
    where: { id: questionId },
    data: {
      status: status === 0 ? 2 : 1,
    },
  });
  return questionResult;
};

const getUsers = async (page, limit) => {
  const listUsers = await prisma.users.findMany({
    skip: page * limit,
    take: limit,
    select: {
      id: true,
      username: true,
      profilepictureurl: true,
      role: true,
      name: true,
      disabled: true,
    },
  });
  return listUsers;
};

module.exports = {
  getAllMetrics,
  disableUser,
  getPendingQuestions,
  approveDeclineQuestion,
  getUsers,
};
