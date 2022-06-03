const Joi = require ('joi');

const createQuestion = {
    body: Joi.object().keys({
        // uid:
        title: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.number()
    }),
};

module.exports = {
    createQuestion,
};