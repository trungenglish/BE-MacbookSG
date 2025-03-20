const express = require('express');
const {adminLogin, adminRegister, adminAccount, adminRefreshToken} = require("../../controllers/admin/authController");
const auth = require("../../middleware/authMiddleware");
const validateAdmin = require("../../middleware/validators/adminValidator");
const routerAPI = express.Router();

routerAPI.post('/login', adminLogin);
routerAPI.post('/register',validateAdmin, adminRegister);
routerAPI.get('/account', auth(), adminAccount);
routerAPI.post("/refresh-token", adminRefreshToken);

module.exports = routerAPI;