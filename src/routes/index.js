const express = require('express');
const router = express.Router();

const authAdminRouter = require('./admin/authRouter');
const usersAdminRouter = require('./admin/userRouter');
const cateAdminRouter = require('./admin/categoryRouter');
const adminAdminRouter = require('./admin/administratorRouter');
const productAdminRouter = require('./admin/productRouter');
const orderAdminRouter = require('./admin/orderRouter');

const authUserRouter = require('./user/authRouter');
const cateUserRouter = require('./user/categoryRouter');
const productUserRouter = require('./user/productRouter');
const orderUserRouter = require('./user/orderRouter');


//Admin
router.use('/admin', authAdminRouter);
router.use('/admin', usersAdminRouter);
router.use('/admin', cateAdminRouter);
router.use('/admin', adminAdminRouter);
router.use('/admin', productAdminRouter);
router.use('/admin', orderAdminRouter);

//User
router.use('/user', authUserRouter);
router.use('/user', cateUserRouter);
router.use('/user', productUserRouter);
router.use('/user', orderUserRouter);

module.exports = router;