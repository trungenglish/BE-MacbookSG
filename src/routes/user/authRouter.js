const express = require('express');
const authRouter = require('../../middleware/authMiddleware');
const {userRegister, userLogin, userAccount} = require("../../controllers/user/authController");
const auth = require('../../middleware/authMiddleware');
const  routerAPI = express.Router();

routerAPI.all("*", auth)

routerAPI.post('/register',userRegister)
routerAPI.post('/login',userLogin)
routerAPI.get('/account', userAccount)

module.exports = routerAPI;