const httpStatus = require ('http-status');
const catchAsync = require ('../utils/catchAsync');
const ApiError = require ('../utils/ApiError');
const questionService = require ('../services/question.service');


const createQuestion = catchAsync( async (req, res) => {
    console.log (req);
    const questionContent = req.body.content;
    const questionTitle = req.body.title;

    // Bug dong nay
    // khong tra ve record question duoc
    const question = await questionService.createQuestion(questionContent, questionTitle);
    
    //
    
    res.status(httpStatus.CREATED).send(question);

});

module.exports = {
    createQuestion,
};
