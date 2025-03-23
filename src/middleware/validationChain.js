class ValidationHandler {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class AuthValidationHandler extends ValidationHandler {
    handle(request) {
        if (!request.token) {
            throw new Error('No token provided');
        }
        return super.handle(request);
    }
}

class RoleValidationHandler extends ValidationHandler {
    handle(request) {
        if (!request.user.roles.includes('admin')) {
            throw new Error('Insufficient permissions');
        }
        return super.handle(request);
    }
}

const authHandler = new AuthValidationHandler();
const roleHandler = new RoleValidationHandler();

authHandler.setNext(roleHandler);

app.use((req, res, next) => {
    try {
        authHandler.handle(req);
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});