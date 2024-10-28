const Joi = require("joi");

const adminSchema = Joi.object({
    name: Joi.string().required().max(100),
    username: Joi.string().required().max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    phone: Joi.string().allow(null).allow(''),
    role: Joi.string().valid('admin', 'support', 'finance').required()
    }
);

module.exports = adminSchema;