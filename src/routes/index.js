const express = require('express');
const router = express.Router();

const adminAuthRouter = require('./admin/authRouter');
const adminUsersRouter = require('./admin/userRouter');
const adminCateRouter = require('./admin/categoryRouter');
const adminAdminRouter = require('./admin/administratorRouter');

const userAuthRouter = require('./user/authRouter');
const userCateRouter = require('./user/categoryRouter');

//Admin
router.use('/admin', adminAuthRouter);
router.use('/admin', adminUsersRouter);
router.use('/admin', adminCateRouter);
router.use('/admin', adminAdminRouter);

//User
router.use('/user', userAuthRouter);
router.use('/user', userCateRouter);

module.exports = router;