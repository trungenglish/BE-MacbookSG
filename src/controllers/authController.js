const { createUserService, loginService} = require('../services/authService');
const Joi = require('joi');
const userSchema = require('../validators/userValidator');

const userRegister = async (req, res) => {
    const { name, email, password, phone } = req.body;

    //validate
    const {error} = userSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            details: error.details.map((err) => err.message)
        });
    }

    const data = await createUserService(name, email, password, phone);
    return res.status(200).json(data);
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    return res.status(200).json(data);
}

module.exports = {
    userRegister,
    userLogin
};