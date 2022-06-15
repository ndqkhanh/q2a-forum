const Joi = require('joi');

const banUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};

const getPendingQuestions = {
  params: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
  }),
};

module.exports = {
  banUser,
  getPendingQuestions,
};
