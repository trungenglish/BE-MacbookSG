//validate data by joi
const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),
    password: Joi.string().required(),
    city: Joi.string()
});

module.exports = userSchema;