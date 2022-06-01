const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { answerService } = require('../services');

const newAnswer = catchAsync(async (req, res) => {
    console.log(req.body);
    res.send({ success: true });
//   const answer = await answerService.createAnswer(req.body);
//   res.send(answer);
});

module.exports = {
  newAnswer,
};
