const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { adminService } = require('../services');

const getMetrics = catchAsync(async (req, res) => {
  const metrics = await adminService.getAllMetrics();
  res.send(metrics);
});

const banUser = catchAsync(async (req, res) => {
  const user = await adminService.disableUser(req);
  if (user) res.send({ success: true });
  else res.send({ success: false });
});

module.exports = {
  getMetrics,
  banUser,
};
