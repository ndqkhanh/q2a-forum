const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createAnswer = async (userBody) => {
  // const accessToken = userBody.headers.authorization.split(" ")[1];
  // const tokens = await tokenService.verifyToken(accessToken[1], tokenTypes.ACCESS_TOKEN);
  // console.log(tokens.payload.sub);
  const userid = userBody.user['id'];
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
