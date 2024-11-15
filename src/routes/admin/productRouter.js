const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const {getAllProduct, createProduct, updateProduct, deleteProduct, updateAvailableProducts, countProduct,
    getProductById
} = require("../../controllers/productCotnroller");
const validateProduct = require("../../middleware/validators/productValidator");
const validateProductVariant = require("../../middleware/validators/productVariantValidator");

routerAPI.all("*", auth);

routerAPI.get('/product', getAllProduct);
routerAPI.post('/product',  createProduct);
routerAPI.put('/product', updateProduct);
routerAPI.delete('/product/:id', deleteProduct);
routerAPI.put('/product/availability/:id', updateAvailableProducts);
routerAPI.get("/productById/:id", getProductById);

routerAPI.get('/amount-of-products', countProduct);

module.exports = routerAPI;