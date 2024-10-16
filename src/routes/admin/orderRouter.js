const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllOrder} = require("../../controllers/orderController");

routerAPI.all("*", auth);

routerAPI.get('/order',getAllOrder)

module.exports = routerAPI;