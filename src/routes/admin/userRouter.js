const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const { getAllUsers, updateUsers, deleteUser } = require('../../controllers/admin/userController');

routerAPI.all("*", auth);

routerAPI.get('/users', getAllUsers);
routerAPI.put('/users', updateUsers);
routerAPI.delete('/users/:id', deleteUser);

module.exports = routerAPI;