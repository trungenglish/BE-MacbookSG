const express = require('express');
const router = express.Router();

const adminAuthRouter = require('./admin/authRouter');
const adminUsersRouter = require('./admin/userRouter');

const userAuthRouter = require('./user/authRouter');

//User
router.use('/admin',adminAuthRouter);
router.use('/admin',adminUsersRouter);

//Admin
router.use('/user',userAuthRouter);


module.exports = router;