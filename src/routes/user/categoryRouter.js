const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const { getAllCate } = require('../../controllers/categoryController');

// routerAPI.all("*", auth);

routerAPI.get('/category', getAllCate)

module.exports = routerAPI;