const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Tên không được để trống',
            'string.min': 'Tên phải có ít nhất 3 ký tự',
            'string.max': 'Tên không được vượt quá 50 ký tự',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Email không hợp lệ',
            'string.empty': 'Email không được để trống',
        }),

    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{8,11}$'))
        .messages({
            'string.pattern.base': 'Số điện thoại phải có từ 8 đến 11 chữ số',
        }),

    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Mật khẩu không được để trống',
            'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
            'string.max': 'Mật khẩu không được vượt quá 30 ký tự',
        }),

    city: Joi.string()
        .min(2)
        .max(100)
        .optional()
        .messages({
            'string.min': 'Tên thành phố phải có ít nhất 2 ký tự',
            'string.max': 'Tên thành phố không được vượt quá 100 ký tự',
        }),
});

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body, { abortEarly: true });

    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            status: "error",
            message: "Dữ liệu nhập vào không hợp lệ",
            errors: errors
        });
    }

    next(); 
};

module.exports = validateUser;
