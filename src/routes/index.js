const express = require('express');
const router = express.Router();

const adminAuthRouter = require('./admin/authRouter');
const adminUsersRouter = require('./admin/userRouter');

const userAuthRouter = require('./user/authRouter');

//Admin
router.use('/admin',adminAuthRouter);
router.use('/admin',adminUsersRouter);

//User
router.use('/user',userAuthRouter);


module.exports = router;