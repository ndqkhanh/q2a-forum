// const tokenService = require('./token.service');
// const { tokenTypes } = require('../config/tokens');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const createAnswer = async (userBody) => {
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NDdiNzNjOC01ZGMzLTQ2ZWUtOGU0Yy1iZDlmYmFmN2RlN2YiLCJpYXQiOjE2NTQwMTgzNTEsImV4cCI6MTY1NjYxMDM1MSwidHlwZSI6InJlZnJlc2gifQ.tQ2Fn0xtYLAkp13d4DolSo2CYnpdjydCbT7lX_cKSoc";
  // const checkTokens = await tokenService.verifyToken(accessToken, tokenTypes.ACCESS);
  const answer = await prisma.answers.create({
    data: userBody,
  });
  return answer;
  // return checkTokens ? answer : null;
};

module.exports = {
  createAnswer,
};
