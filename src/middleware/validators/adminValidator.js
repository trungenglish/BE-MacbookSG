const Joi = require("joi");

const adminSchema = Joi.object({
    name: Joi.string()
        .required()
        .max(100)
        .messages({
            'string.empty': 'Tên không được để trống',
            'string.max': 'Tên không được vượt quá 100 ký tự',
        }),

    username: Joi.string()
        .required()
        .max(50)
        .messages({
            'string.empty': 'Tên đăng nhập không được để trống',
            'string.max': 'Tên đăng nhập không được vượt quá 50 ký tự',
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'Email không được để trống',
            'string.email': 'Email không hợp lệ',
        }),

    password: Joi.string()
        .required()
        .min(6)
        .max(30)
        .messages({
            'string.empty': 'Mật khẩu không được để trống',
            'string.min': 'Mật khẩu phải có ít nhất 6 ký tự',
            'string.max': 'Mật khẩu không được vượt quá 30 ký tự',
        }),

    phone: Joi.string()
        .allow(null)
        .allow('')
        .pattern(new RegExp('^[0-9]{8,11}$'))
        .messages({
            'string.pattern.base': 'Số điện thoại phải có từ 8 đến 11 chữ số',
        }),

    role: Joi.string()
        .valid('quản trị', 'hỗ trợ khách hàng', 'quản lý tài chính')
        .required()
        .messages({
            'any.only': 'Vai trò chỉ được phép là quản trị, hỗ trợ khách hàng, quản lý tài chính',
            'string.empty': 'Vai trò không được để trống',
        }),
});

const validateAdmin = (req, res, next) => {
    const { error } = adminSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            status: "error",
            message: "Dữ liệu nhập vào không hợp lệ",
            errors: errors,
        });
    }

    next();
};

module.exports = validateAdmin;
