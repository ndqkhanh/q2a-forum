const {PrismaClient, Prisma} = require ('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require ('../utils/ApiError');
const prisma = new PrismaClient();

const VoteAnswer = async (req) =>
{
    const answer = await prisma.answers.findUnique ({
        where : {
            id : req.answer.id,
        },
    });

    if (!answer)
    {
        throw new ApiError(httpStatus.NOT_FOUND, 'Answer Not Found');
    }

    const checkVotingExist = await prisma.voting.findUnique({
        where :{
            aid: req.params.answerID,
        },
    });
    
    if (!checkVotingExist)
    {
        const voting = await prisma.voting.create ({
        status : req.body.status,
    });
        return voting;
    }
    else
    {
        const voting = await prisma.voting.update({
            data:
            {
                status: req.body.status,
            }
        });
        return voting;
    }

}
module.exports = {
    VoteAnswer,
};