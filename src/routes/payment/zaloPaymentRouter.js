const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {createZaloPayment, callbackZaloPayment} = require("../../controllers/payment/zaloPaymentController");

routerAPI.all("*", auth());

routerAPI.post('/payment-zaloPay', createZaloPayment)
routerAPI.post("/callback", callbackZaloPayment)

module.exports = routerAPI;