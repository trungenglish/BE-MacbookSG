const SuccessResponse = require('./SuccessResponse');
const ErrorResponse = require('./ErrorResponse');

class ResponseFactory {
    static success(data, message, statusCode) {
        return new SuccessResponse(data, message, statusCode);
    }

    static error(message, statusCode, errors) {
        return new ErrorResponse(message, statusCode, errors);
    }

    static notFound(message = 'Resource not found') {
        return new ErrorResponse(message, 404);
    }

    static badRequest(message = 'Bad Request', errors = null) {
        return new ErrorResponse(message, 400, errors);
    }

    static unauthorized(message = 'Unauthorized') {
        return new ErrorResponse(message, 401);
    }

    static forbidden(message = 'Forbidden'){
        return new ErrorResponse(message, 403);
    }
}

module.exports = ResponseFactory;