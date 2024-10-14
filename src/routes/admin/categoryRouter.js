const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const { getAllCate, createCate, updateCate, deleteCate } = require('../../controllers/categoryController');

routerAPI.all("*", auth);

routerAPI.get('/category', getAllCate)
routerAPI.post('/category', createCate)
routerAPI.put('/category', updateCate)
routerAPI.delete('/category/:id', deleteCate)

module.exports = routerAPI;