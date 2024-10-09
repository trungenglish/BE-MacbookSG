const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    imgUrl: Joi.array().items(Joi.string().uri()),
    description: Joi.string(),
    category: Joi.string().required(),
    quantity: Joi.number().integer().min(0).default(0),
    discount: Joi.number().min(0).max(100).default(0),
    }
);

module.exports = productSchema;