const errorHandler = require('../helpers/errorHandler')

const verifyRoles = (...allowedRoles) => async (req, res, next) => {
    try {
        if (!req?.user) {
            throw new Error('User information not found');
        }

        if (!req.user?.roles) {
            throw new Error('User roles not found');
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
            throw new Error('Insufficient permissions');
        }

        next();
    } catch (error) {
        return errorHandler(res, 403, error.message || 'Role verification failed');
    }
}

module.exports = verifyRoles;