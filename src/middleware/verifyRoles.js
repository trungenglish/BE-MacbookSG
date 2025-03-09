const errorHandler = require('../helpers/errorHandler')
const ResponseFactory = require('../core/response/ResponseFactory')

const verifyRoles = (...allowedRoles) => async (req, res, next) => {
    try {
        if (!req?.user) {
            return res
            .status(401)
            .json(ResponseFactory.error(
                'User information not found',
            ));
        }

        if (!req.user?.roles) {
            return res
            .status(401)
            .json(ResponseFactory.error(
                'User roles not found',
            ));
        }

        // Convert roles to array if it's not already
        const userRoles = Array.isArray(req.user.roles)
            ? req.user.roles
            : [req.user.roles];

        // Verify roles
        const hasAllowedRole = userRoles.some(role =>
            allowedRoles.includes(role)
        );

        if (!hasAllowedRole) {
            return res
                .status(403)
                .json(ResponseFactory.error('Insufficient permissions'));
        }

        next();
    } catch (error) {
        return res
            .status(500)
            .json(ResponseFactory.error(
                error.message || 'Role verification failed',
            ));
    }
}

module.exports = verifyRoles;