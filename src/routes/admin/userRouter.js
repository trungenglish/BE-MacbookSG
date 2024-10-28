const express = require('express');
const routerAPI = express.Router();
const auth = require("../../middleware/authMiddleware");
const { getAllUsers, updateUsers, deleteUser } = require('../../controllers/admin/userController');
const {userRegister} = require("../../controllers/user/authController");

routerAPI.all("*", auth);

routerAPI.get('/users', getAllUsers);
routerAPI.put('/users', updateUsers);
routerAPI.post('/users', userRegister);
routerAPI.delete('/users/:id', deleteUser);

module.exports = routerAPI;