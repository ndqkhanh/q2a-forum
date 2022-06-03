const {PrismaClient, Prisma, prisma} = require ('@prisma/client');
const ApiError = require ('../utils/ApiError');


const createQuestion = async(questionContent, questionTitle) => {
    const question = prisma.questions.create(
        {
            data: {
               uid : 1,
               content: questionContent,
               title: questionTitle,
               //status : 0,
            },
        });
    return question;
};

module.exports = {
    createQuestion,
};