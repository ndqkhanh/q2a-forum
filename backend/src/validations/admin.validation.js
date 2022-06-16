const Joi = require('joi');

const banUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
  body: Joi.object().keys({
    status: Joi.boolean().required(),
  }),
};


const setConfiguration = {
  params: Joi.object().keys(
    {
      slug: Joi.string().required(),
    }),
  body: Joi.object().keys({
    value: Joi.string(),
  }),
};

module.exports = {
  banUser,
  setConfiguration,
};
