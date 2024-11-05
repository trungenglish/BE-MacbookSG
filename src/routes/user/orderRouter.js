const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {createOrder} = require("../../controllers/orderController");

// routerAPI.all("*", auth);

routerAPI.post('/order',createOrder)

module.exports = routerAPI;