const express = require('express');
const validate = require('../../middlewares/validate');
const ansValidation = require('../../validations/answer.validation');
const ansController = require('../../controllers/answer.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .post(auth('answer'), validate(ansValidation.newAnswer), ansController.newAnswer);

router
    .route('/:answerId')
    // .post(auth('createAnswer'), validate(ansValidation.newAnswer), ansController.newAnswer);
    // .delete(auth('deleteAnswer'), validate(ansValidation.delAnswer), ansController.delAnswer);

module.exports = router;