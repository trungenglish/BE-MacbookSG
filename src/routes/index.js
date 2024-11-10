const express = require('express');
const router = express.Router();

//Admin
router.use('/admin', require('./admin/authRouter'));
router.use('/admin', require('./admin/userRouter'));
router.use('/admin', require('./admin/categoryRouter'));
router.use('/admin', require('./admin/administratorRouter'));
router.use('/admin', require('./admin/productRouter'));
router.use('/admin', require('./admin/orderRouter'));

//User
router.use('/user', require('./user/authRouter'));
router.use('/user', require('./user/categoryRouter'));
router.use('/user', require('./user/productRouter'));
router.use('/user', require('./user/orderRouter'));
router.use('/user', require('./payment/momoPaymentRouter'))
router.use('/user', require('./payment/zaloPaymentRouter'))

module.exports = router;