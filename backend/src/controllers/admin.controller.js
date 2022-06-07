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

module.exports = {
  getMetrics,
  banUser,
};
