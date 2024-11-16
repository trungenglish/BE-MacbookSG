const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {createOrder} = require("../../controllers/orderController");
const {getCity, getDistrict} = require("../../controllers/cityDistrictController");

// routerAPI.all("*", auth);

routerAPI.post('/order',createOrder)
routerAPI.get("/city", getCity)
routerAPI.get("/district", getDistrict)

module.exports = routerAPI;