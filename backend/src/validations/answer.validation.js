const Joi = require('joi');

const newAnswer = {
  body: Joi.object().keys({
    qid: Joi.string().uuid().required(),
    content: Joi.string().required(),
  }),
};

const updateAnswer = {
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};


module.exports = {
  newAnswer,
  updateAnswer,
};
