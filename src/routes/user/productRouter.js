const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct} = require("../../controllers/productCotnroller");

routerAPI.all("*", auth);

routerAPI.get('/product', getAllProduct);

module.exports = routerAPI;