const express = require('express');
const router = express.Router();
const adminRoutes = require('./admin/authRouter');
const userRoutes = require('./user/authRouter');

//User
router.use('/admin',adminRoutes);

//Admin
router.use('/user',userRoutes);


module.exports = router;