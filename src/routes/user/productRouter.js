const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct, getProductByCategory, getProductById} = require("../../controllers/productCotnroller");

routerAPI.get('/product', auth, getAllProduct);
routerAPI.get('/productByCate/:id', getProductByCategory);
routerAPI.get("/productById/:id", getProductById);

module.exports = routerAPI;