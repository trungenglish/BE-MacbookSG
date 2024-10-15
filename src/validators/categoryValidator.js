const Joi = require('joi');

const categorySchema = Joi.object({
    name: Joi.string().required().max(50),
    }
);

module.exports = categorySchema;