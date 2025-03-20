require('dotenv').config();
const { JwtAuthStrategy } = require('../helpers/authStrategy');
//dùng Decorator Pattern trong authMiddleware.js

const white_lists = ['/user/register', '/user/login', '/admin/register', '/admin/login'];

const authMiddleware = (strategy = new JwtAuthStrategy()) => async (req, res, next) => {
    if (white_lists.includes(req.originalUrl.replace('/api/v1', ''))) {
        return next();
    }

    try {
        req.user = await strategy.authenticate(req);
        next();
    } catch (error) {
        return res.status(401).json({ status: 'error', message: error.message });
    }
}

module.exports = authMiddleware;
