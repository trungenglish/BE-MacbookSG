const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct, createProduct, updateProduct, deleteProduct, updateAvailableProducts} = require("../../controllers/productCotnroller");

routerAPI.all("*", auth);

routerAPI.get('/product', getAllProduct);
routerAPI.post('/product', createProduct);
routerAPI.put('/product', updateProduct);
routerAPI.delete('/product/:id', deleteProduct);
routerAPI.put('/product/availability/:id', updateAvailableProducts);

module.exports = routerAPI;