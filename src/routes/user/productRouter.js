const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct, getProductByCategory, getProductById} = require("../../controllers/productCotnroller");
const {filterIncrease, filterDecrease} = require("../../controllers/filterController");

routerAPI.get('/product', auth(), getAllProduct);
routerAPI.get('/productByCate/:id', getProductByCategory);
routerAPI.get("/productById/:id", getProductById);
routerAPI.get('/filterIncrease/:id', filterIncrease);
routerAPI.get('/filterDecrease/:id', filterDecrease);

module.exports = routerAPI;