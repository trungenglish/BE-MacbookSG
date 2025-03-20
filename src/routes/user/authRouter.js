const express = require('express');
const {userRegister, userLogin, userAccount, userRefreshToken} = require("../../controllers/user/authController");
const auth = require('../../middleware/authMiddleware');
const  routerAPI = express.Router();
const validateUser = require('../../middleware/validators/userValidator')
const {adminRefreshToken} = require("../../controllers/admin/authController");

routerAPI.post('/register',validateUser ,userRegister)
routerAPI.post('/login',userLogin)
routerAPI.get('/account', auth(), userAccount)
routerAPI.post('/refresh-token', userRefreshToken)

module.exports = routerAPI;