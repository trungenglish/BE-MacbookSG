const { createUserService } = require('../services/userService');
const Joi = require('joi');
const userSchema = require('../validators/userValidator');

const createUser = async (req, res) => {
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

const handleLogin = async (req, res) => {

}

module.exports = {
    createUser,
    handleLogin
};