const {loginService, createAdminService} = require("../../services/admin/authService");

const adminLogin = async (req, res) => {
    const {username, password} = req.body;
    const data = await loginService(username, password);
    return res.status(200).json(data);
}

const adminRegister = async (req, res) => {
    const {name, username, email, password, role} = req.body;
    const data = await createAdminService(name, username, email, password, role);
    return res.status(200).json(data);
}

module.exports = {
    adminLogin, adminRegister
};