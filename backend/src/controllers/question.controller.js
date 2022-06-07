const httpStatus = require ('http-status');
const catchAsync = require ('../utils/catchAsync');
const ApiError = require ('../utils/ApiError');
const questionService = require ('../services/question.service');


const createQuestion = catchAsync( async (req, res) => {
    // console.log (req);
    // const questionContent = req.body.content;
    // const questionTitle = req.body.title;

    // Bug dong nay
    // khong tra ve record question duoc
    const question = await questionService.createQuestion(req);

    res.status(httpStatus.CREATED).send(question);
});

const deleteQuestion = catchAsync ( async(req, res) => {
    const question = await questionService.deleteQuestionById(req.params.questionId);
    console.log (question);
    if (!question)
    {
        res.send({"success": False});
    }
    res.status(httpStatus.NO_CONTENT).send({"success" : True});
});

module.exports = {
    createQuestion,
    deleteQuestion,
};
