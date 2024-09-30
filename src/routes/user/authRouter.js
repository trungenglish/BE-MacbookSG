const express = require('express');
const authRouter = require('../../middleware/authMiddleware');
const {userRegister, userLogin} = require("../../controllers/user/authController");
const  routerAPI = express.Router();

routerAPI.post('/register',userRegister)
routerAPI.post('/login',userLogin)

module.exports = routerAPI;