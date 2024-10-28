const express = require('express');
const {adminLogin, adminRegister, adminAccount, adminRefreshToken} = require("../../controllers/admin/authController");
const auth = require("../../middleware/authMiddleware");
const routerAPI = express.Router();

routerAPI.post('/login', adminLogin);
routerAPI.post('/register', adminRegister);
routerAPI.get('/account', auth, adminAccount);
routerAPI.post("/refresh-token", adminRefreshToken);

module.exports = routerAPI;