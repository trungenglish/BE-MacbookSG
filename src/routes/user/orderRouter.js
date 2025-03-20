const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {createOrder, getOrderById} = require("../../controllers/orderController");
const {getCity, getDistrict} = require("../../controllers/cityDistrictController");

// routerAPI.all("*", auth);

routerAPI.post('/order',auth(),createOrder)
routerAPI.get('/your-order',auth(), getOrderById)
routerAPI.get("/city", getCity)
routerAPI.get("/district", getDistrict)

module.exports = routerAPI;