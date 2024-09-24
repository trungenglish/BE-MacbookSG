const express = require('express');
const auth = require('../../middleware/auth');
const routerAPI = express.Router();

routerAPI.all("*", auth)