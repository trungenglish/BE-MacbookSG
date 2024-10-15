const express = require('express');
const {adminLogin, adminRegister, adminAccount} = require("../../controllers/admin/authController");
const auth = require("../../middleware/authMiddleware");
const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.post('/login', adminLogin);
routerAPI.post('/register', adminRegister);
routerAPI.get('/account', adminAccount);

module.exports = routerAPI;