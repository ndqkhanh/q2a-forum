const express = require('express');
const validate = require('../../middlewares/validate');
const adminValidation = require('../../validations/admin.validation');
const adminController = require('../../controllers/admin.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/metrics').get(auth('getMetrics'), adminController.getMetrics);

router.route('/ban-user/:userId').post(auth('banUser'), validate(adminValidation.banUser), adminController.banUser);

module.exports = router;