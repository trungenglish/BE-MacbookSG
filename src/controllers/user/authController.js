const { createUserService, loginService, refreshTokenService} = require('../../services/user/authService');
const userSchema = require('../../middleware/validators/userValidator');

const userRegister = async (req, res) => {
    const { name, email, password, phone, city } = req.body;
    const data = await createUserService(name, email, password, phone, city);
    return res.status(200).json(data);
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
}

const userAccount = async (req, res) => {
    return res.status(200).json(req.user);
}

const userRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const data = await refreshTokenService(refreshToken);
    return res.status(200).json(data);
}

module.exports = {
    userRegister,
    userLogin,
    userAccount,
    userRefreshToken
};