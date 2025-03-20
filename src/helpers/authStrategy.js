const jwtHelper = require('./jwt.helper');

class AuthStrategy {
    async authenticate(req) {
        throw new Error('Phương thức authenticate() chưa được triển khai!');
    }
}

class JwtAuthStrategy extends AuthStrategy {
    async authenticate(req) {
        if (!req?.headers?.authorization) {
            throw new Error('Bạn chưa truyền access token ở header');
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Token không hợp lệ');
        }

        try {
            const decoded = await jwtHelper.verifyToken(token, process.env.JWT_SECRET);
            return {
                _id: decoded._id,
                email: decoded.email,
                name: decoded.name,
                roles: decoded.role
            };
        } catch {
            throw new Error('Token hết hạn hoặc không hợp lệ');
        }
    }
}

module.exports = { JwtAuthStrategy };