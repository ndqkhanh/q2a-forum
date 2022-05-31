const express = require('express');
const validate = require('../../middlewares/validate');
const ansValidation = require('../../validations/auth.validation');
const ansController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/answer', validate(ansValidation.register), ansController.register);

module.exports = router;