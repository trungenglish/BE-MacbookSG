const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllOrder, getOrderById} = require("../../controllers/orderController");

routerAPI.all("*", auth);

routerAPI.get('/order', getAllOrder)
routerAPI.get('/your-order', getOrderById)
// routerAPI.delete('/order/:id', deleteOrder)

module.exports = routerAPI;