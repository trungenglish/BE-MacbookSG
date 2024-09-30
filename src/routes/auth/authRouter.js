const express = require('express');
const authRouter = require('../../middleware/auth');
const {userRegister, userLogin} = require("../../controllers/authController");
const routerAPI = express.Router();

routerAPI.post('/register',userRegister)
routerAPI.post('/login',userLogin)

module.exports = routerAPI;