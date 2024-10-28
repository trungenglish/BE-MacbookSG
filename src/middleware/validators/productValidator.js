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

    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.base': 'Giá phải là một số',
            'number.positive': 'Giá phải là số dương',
            'any.required': 'Giá là bắt buộc',
        }),

    priceAfterDiscount: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.base': 'Giá sau giảm phải là một số',
            'number.min': 'Giá sau giảm không được nhỏ hơn 0',
            'any.required': 'Giá sau giảm là bắt buộc',
        }),

    imgUrls: Joi.array()
        .items(Joi.string().uri())
        .required()
        .messages({
            'string.uri': 'Mỗi hình ảnh phải có URL hợp lệ',
            'array.base': 'imgUrls phải là một mảng',
            'any.required': 'imgUrls là bắt buộc',
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
});

const validateProduct = (req, res, next) => {
    console.log("Dữ liệu gửi từ frontend:", req.body); // Kiểm tra dữ liệu từ client
    const {error} = productSchema.validate(req.body, {abortEarly: true});

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
