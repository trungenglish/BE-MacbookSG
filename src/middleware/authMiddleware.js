require('dotenv').config();
const jwtHelper = require('../helpers/jwt.helper');

const authMiddleware = async (req, res, next) => {
    const white_lists = ['/user/register', '/user/login','/admin/register', '/admin/login'];

    if (white_lists.find(item => '/api/v1' + item === req.originalUrl)) {
        return next();
    } else {
        if (req?.headers?.authorization?.split(' ')[1]){
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = await jwtHelper.verifyToken(token, process.env.JWT_SECRET);
                req.user = {
                    _id: decoded._id,
                    email: decoded.email,
                    name: decoded.name,
                }
                next();
            } catch{
                return res.status(401).json({
                    status: 'error',
                    message: "Token hết hạn/ hoặc không hợp lệ",
                });
            }
        }else {
            return res.status(401).json({
                message: "Bạn chưa truyền access token ở header/Hoặc token hết hạn"
            })
        }
    }
}

module.exports = authMiddleware;