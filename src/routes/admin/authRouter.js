const express = require('express');
const {adminLogin, adminRegister, adminAccount} = require("../../controllers/admin/authController");
const auth = require("../../middleware/authMiddleware");
const routerApi = express.Router();

routerApi.all("*", auth);

routerApi.post('/login', adminLogin);
routerApi.post('/register', adminRegister);
routerApi.get('/account', adminAccount);

module.exports = routerApi;