const express = require('express');
const routerAPI = express.Router();
const { getAllUsers } = require('../../controllers/admin/userController');

routerAPI.get('/users', getAllUsers);
// routerAPI.put('/users', )

module.exports = routerAPI;