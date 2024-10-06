const express = require('express');
const {adminLogin} = require("../../controllers/admin/authController");
const routerApi = express.Router();

routerApi.post('/login',adminLogin);

module.exports = routerApi;