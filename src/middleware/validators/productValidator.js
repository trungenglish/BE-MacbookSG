const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Tên sản phẩm không được để trống',
            'string.max': 'Tên sản phẩm không được vượt quá 50 ký tự',
            'any.required': 'Tên sản phẩm là bắt buộc',
        }),

    description: Joi.string()
        .optional()
        .messages({
            'string.base': 'Mô tả phải là một chuỗi ký tự',
        }),

    idCategory: Joi.string()
        .required()
        .messages({
            'string.empty': 'Danh mục không được để trống',
            'any.required': 'Danh mục là bắt buộc',
        }),

    isActive: Joi.boolean()
        .optional()
        .messages({
            'boolean.base': 'Trạng thái hoạt động phải là kiểu boolean',
        }),

    images: Joi.array()
        .items(Joi.string().uri())
        .optional()
        .messages({
            'array.base': 'Hình ảnh phải là một mảng',
            'string.uri': 'URL hình ảnh không hợp lệ',
        }),

    defaultVariant: Joi.object({
        color: Joi.string().required(),
        storage: Joi.string().required(),
        price: Joi.number().required(),
        priceAfterDiscount: Joi.number().optional(),
        quantity: Joi.number().required(),
        discount: Joi.number().optional(),
        isActive: Joi.boolean().optional(),
        isDefault: Joi.boolean().required()
    }).optional(),

    variants: Joi.array()
        .items(Joi.object({
            color: Joi.string().required(),
            storage: Joi.string().required(),
            price: Joi.number().required(),
            priceAfterDiscount: Joi.number().optional(),
            quantity: Joi.number().required(),
            discount: Joi.number().optional(),
            isActive: Joi.boolean().optional(),
            isDefault: Joi.boolean().required()
        }))
        .optional()
});

const validateProduct = (req, res, next) => {
    console.log("Dữ liệu gửi từ frontend:", req.body);
    const { error } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            status: "error",
            message: "Dữ liệu nhập vào không hợp lệ",
            errors: errors
        });
    }

    next();
}

module.exports = validateProduct;
