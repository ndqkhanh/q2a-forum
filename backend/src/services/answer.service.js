const httpStatus = require('http-status');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');

const createAnswer = async (userBody) => {
  const checkQuestionExists = await prisma.questions.findUnique({
    where: {
      id: userBody.body.qid,
    },
  });
  if (!checkQuestionExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question does not exist');
  }

  const userid = userBody.user.id;
  const answer = prisma.answers.create({
    data: {
      qid: userBody.body.qid,
      content: userBody.body.content,
      uid: userid,
    },
  });
  return answer;
};

const changeAnswer = async (userBody) => {
  const checkAnswerExists = await prisma.answers.findUnique({
    where: {
      id: userBody.params.answerId,
    },
  });
  if (!checkAnswerExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Answer does not exist');
  }

  const answer = prisma.answers.update({
    where: {
      id: userBody.params.answerId,
    },
    data: {
      content: userBody.body.content,
    },
  });
  return answer;
};

const delAnswerById = async (userBody) => {
  const deleteAnswer = await prisma.answers.delete({
    where: {
      id: userBody,
    },
  });
  if (!deleteAnswer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
  }
  return deleteAnswer;
};

module.exports = {
  createAnswer,
  changeAnswer,
  delAnswerById,
};
