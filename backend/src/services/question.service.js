const {PrismaClient, Prisma} = require ('@prisma/client');
const httpStatus = require('http-status');
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

const deleteQuestionById = async (questionId) =>
{
    const existQuestion = await prisma.questions.findUnique({
        where: {
            id : questionId,
        },
    });

    if (!existQuestion ) 
    {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question Not Found');
    }

    const deleteQuestion = await prisma.questions.delete({
        where : {
            id : questionId,
        },
    });

    //return deleteQuestion;
};

const updateQuestion = async (req) =>
{
    const questionId = req.params.questionId;
    const question = await prisma.questions.findUnique({
        where: {
            id : questionId,
        },
    });

    if (!question)
    {
        throw new ApiError(httpStatus.NOT_FOUND,'Question Not Found');
    }

    const newTitle = req.body.title;
    const newContent = req.body.content;

    const updatedQuestion = await prisma.questions.update({
        where : {
            id : questionId,
        },
        data : {
            content : newContent,
            title : newTitle,
        },
    });

    return updatedQuestion;
};

const searchQuestion = async (req) =>
{
    const listQuestions = await prisma.answers.findMany(
        {
            cursor : {
                id : req.params.offset,
            },
            take: req.params.limit,
            where : {
                body : {
                    search : req.body.keyword,
                },
            },
        }
    );

    if (!listQuestions)
    {
        throw new ApiError (httpStatus.NOT_FOUND, "There is no questions related to keywords");  
    }

    return listQuestions;
};
module.exports = {
    createQuestion,
    deleteQuestionById,
    updateQuestion,
    searchQuestion,
};