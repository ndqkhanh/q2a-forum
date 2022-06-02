const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createAnswer = async (userBody) => {
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

module.exports = {
  createAnswer,
};
