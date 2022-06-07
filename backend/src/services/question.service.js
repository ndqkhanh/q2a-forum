const {PrismaClient, Prisma} = require ('@prisma/client');
const ApiError = require ('../utils/ApiError');
const prisma = new PrismaClient();


const createQuestion = async(req) => {
    const userid = req.user.id;
    const question = prisma.questions.create(
        {
            data: {
               uid: userid,
               content: req.body.content,
               title: req.body.title,
            },
        });
    return question;
};

module.exports = {
    createQuestion,
};