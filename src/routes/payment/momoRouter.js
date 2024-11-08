const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");


routerAPI.all("*", auth);

routerAPI.get('/payment-momo',)

module.exports = routerAPI;