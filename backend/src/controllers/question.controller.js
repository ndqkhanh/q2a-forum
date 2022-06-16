const httpStatus = require ('http-status');
const catchAsync = require ('../utils/catchAsync');
const ApiError = require ('../utils/ApiError');
const questionService = require ('../services/question.service');


const createQuestion = catchAsync( async (req, res) => {
    const question = await questionService.createQuestion(req);

    res.status(httpStatus.CREATED).send(question);
});

const deleteQuestion = catchAsync ( async(req, res) => {
    const question = await questionService.deleteQuestionById(req.params.questionId);
    res.send ({success : !!question});
});

const updateQuestion = catchAsync ( async (req, res) =>
{
    const question = await questionService.updateQuestion (req);
    res.send(question);
}

);

const searchQuestion = catchAsync (async (req, res) => {
    const listQuestions = await questionService.searchQuestion(req);
    res.send(listQuestions);
});

const getLatestFeed = catchAsync (async (req, res) => {
    const latestFeed = await questionService.getLatestFeed(req.params.page);
    res.send(latestFeed);
});

module.exports = {
    createQuestion,
    deleteQuestion,
    updateQuestion,
    searchQuestion,
    getLatestFeed,
};
