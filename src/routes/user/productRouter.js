const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct, getProductByCategory} = require("../../controllers/productCotnroller");

routerAPI.get('/product', auth, getAllProduct);
routerAPI.get('/productByCate/:id', getProductByCategory);

module.exports = routerAPI;