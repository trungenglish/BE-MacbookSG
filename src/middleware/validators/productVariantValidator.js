const Joi = require("joi");

const productVariantSchema = Joi.object({
    idPro: Joi.string()
        .required()
        .messages({
            'string.empty': 'ID sản phẩm không được để trống',
            'any.required': 'ID sản phẩm là bắt buộc',
        }),

    color: Joi.string()
        .required()
        .messages({
            'string.empty': 'Màu sắc không được để trống',
            'any.required': 'Màu sắc là bắt buộc',
        }),

    storage: Joi.string()
        .required()
        .messages({
            'string.empty': 'Dung lượng lưu trữ không được để trống',
            'any.required': 'Dung lượng lưu trữ là bắt buộc',
        }),

    price: Joi.number()
        .required()
        .min(0)
        .messages({
            'number.base': 'Giá phải là một số',
            'number.min': 'Giá phải lớn hơn hoặc bằng 0',
            'any.required': 'Giá là bắt buộc',
        }),

    priceAfterDiscount: Joi.number()
        .min(0)
        .default(0)
        .messages({
            'number.base': 'Giá sau giảm phải là một số',
            'number.min': 'Giá sau giảm phải lớn hơn hoặc bằng 0',
        }),

    quantity: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
            'number.base': 'Số lượng phải là một số nguyên',
            'number.min': 'Số lượng không được nhỏ hơn 0',
        }),

    discount: Joi.number()
        .min(0)
        .max(100)
        .default(0)
        .messages({
            'number.base': 'Giảm giá phải là một số',
            'number.min': 'Giảm giá không được nhỏ hơn 0',
            'number.max': 'Giảm giá không được lớn hơn 100',
        }),

    isActive: Joi.boolean()
        .default(true)
        .messages({
            'boolean.base': 'Trạng thái hoạt động phải là kiểu boolean',
        }),

    isDefault: Joi.boolean()
        .default(false)
        .messages({
            'boolean.base': 'Trạng thái mặc định phải là kiểu boolean',
        }),
});

const validateProductVariant = (req, res, next) => {
    const { error } = productVariantSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            status: "error",
            message: "Dữ liệu nhập vào không hợp lệ",
            errors: errors,
        });
    }

    // Kiểm tra nếu priceAfterDiscount lớn hơn price
    if (req.body.priceAfterDiscount > req.body.price) {
        return res.status(400).json({
            status: "error",
            message: "Giá sau giảm không được lớn hơn giá gốc",
        });
    }

    next();
}

module.exports = validateProductVariant;
