const express = require('express');
const {adminLogin, adminRegister} = require("../../controllers/admin/authController");
const routerApi = express.Router();

routerApi.post('/login', adminLogin);
routerApi.post('/register', adminRegister);

module.exports = routerApi;