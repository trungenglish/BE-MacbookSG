const express = require('express');
const routerAPI = express.Router();

routerAPI.get('/users',getUsers);

module.exports = routerAPI;