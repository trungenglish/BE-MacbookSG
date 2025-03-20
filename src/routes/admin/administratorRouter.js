const express = require('express');
const auth = require("../../middleware/authMiddleware");
const {getAllAdministrator, updateAdministrator, deleteAdministrator} = require("../../controllers/admin/administratorController");
const {adminRegister} = require("../../controllers/admin/authController");
const routerAPI = express.Router();

routerAPI.all("*", auth());

routerAPI.get('/administrator', getAllAdministrator)
routerAPI.post('/administrator', adminRegister)
routerAPI.put('/administrator', updateAdministrator)
routerAPI.delete('/administrator/:id', deleteAdministrator)

module.exports = routerAPI;