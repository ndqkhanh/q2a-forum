const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');

const getMetrics = catchAsync(async (req, res) => {
  const metrics = await adminService.getAllMetrics();
  res.send(metrics);
});

const banUser = catchAsync(async (req, res) => {
  const user = await adminService.disableUser(req);
  res.send({ success: !!user });
});

const getPendingQuestions = catchAsync(async (req, res) => {
  const list_pending_quetions = await adminService.getPendingQuestions(req.params.page, req.params.limit);
  res.send(list_pending_quetions);
});

const approveDeclineQuestion = catchAsync(async (req, res) => {
  const questionResult = await adminService.approveDeclineQuestion(req.body.questionId, req.body.status);
  res.send({ success: !!questionResult });
});


module.exports = {
  getMetrics,
  banUser,
  getPendingQuestions,
  approveDeclineQuestion,
};
