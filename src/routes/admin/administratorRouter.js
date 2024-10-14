const express = require('express');
const auth = require("../../middleware/authMiddleware");
const {getAllAdministrator, updateAdministrator, deleteAdministrator} = require("../../controllers/admin/administratorController");
const {adminRegister} = require("../../controllers/admin/authController");
const routerApi = express.Router();

routerApi.all("*", auth);

routerApi.get('/administrator', getAllAdministrator)
routerApi.post('/administrator', adminRegister)
routerApi.put('/administrator', updateAdministrator)
routerApi.delete('/administrator', deleteAdministrator)

module.exports = routerApi;