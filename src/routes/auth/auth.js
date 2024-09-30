const express = require('express');
const auth = require('../../middleware/auth');
const {createUser, handleLogin} = require("../../controllers/userController");
const routerAPI = express.Router();

routerAPI.post('/register',createUser)
routerAPI.post('/login',handleLogin)

module.exports = routerAPI;