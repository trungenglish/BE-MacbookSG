const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const white_lists = ['/register', '/login'];
    if (white_lists.find(item => '/api/v1' + item === req.originalUrl)) {
        return next();
    } else {

    }
}

module.exports = auth;