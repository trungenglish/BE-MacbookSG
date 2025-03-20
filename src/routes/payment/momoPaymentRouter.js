const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {createMomoPayment} = require("../../controllers/payment/momoPaymentController");

routerAPI.all("*", auth());

routerAPI.post('/payment-momo', createMomoPayment)

module.exports = routerAPI;