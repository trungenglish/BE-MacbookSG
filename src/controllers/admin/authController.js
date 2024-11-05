const {loginService, createAdminService, refreshTokenService} = require("../../services/admin/authService");

const adminLogin = async (req, res) => {
    const {username, password} = req.body;
    const data = await loginService(username, password);
    return res.status(200).json(data);
}

const adminRegister = async (req, res) => {
    const {name, username, email, phone, password, role} = req.body;
    const data = await createAdminService(name, username, email, phone, password, role);
    return res.status(200).json(data);
}

const adminAccount = async (req,res) => {
    console.log("check",req.user);
    return res.status(200).json(req.user)
}

const adminRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    const data = await refreshTokenService(refreshToken);
    return res.status(200).json(data);
}

module.exports = {
    adminLogin, adminRegister, adminAccount, adminRefreshToken
};