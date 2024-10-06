const {loginService} = require("../../services/admin/authService");


const adminLogin = async (req, res) => {
    const {email, password} = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data);
}

module.exports = {
    adminLogin
};