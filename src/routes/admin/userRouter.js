const express = require('express');
const routerAPI = express.Router();
const { getUsers } = require('../../controllers/admin/userController');

routerAPI.get('/users', getUsers);
routerAPI.put('/users', )

module.exports = routerAPI;