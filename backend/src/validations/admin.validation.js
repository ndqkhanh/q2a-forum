const Joi = require('joi');

const banUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};

module.exports = {
  banUser,
};
