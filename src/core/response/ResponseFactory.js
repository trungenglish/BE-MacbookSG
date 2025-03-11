const SuccessResponse = require('./SuccessResponse');
const ErrorResponse = require('./ErrorResponse');

class ResponseFactory {
    static SUCCESS = 'success';
    static ERROR = 'error';
    static NOT_FOUND = 'not_found';

    static createResponse(type, message, data = null, statusCode = null) {
        switch (type) {
            case this.SUCCESS:
                return new SuccessResponse(message, data);
                
            case this.ERROR:
                return new ErrorResponse(message, statusCode || 500);
                
            case this.NOT_FOUND:
                return new NotFoundResponse(message);
                
            default:
                throw new Error('Invalid response type');
        }
    }

    static success(message, data = null) {
        return this.createResponse(this.SUCCESS, message, data);
    }

    static error(message, statusCode = 500) {
        return this.createResponse(this.ERROR, message, null, statusCode);
    }

    static notFound(message = "Không tìm thấy tài nguyên") {
        return this.createResponse(this.NOT_FOUND, message);
    }

    // static badRequest(message = 'Bad Request', errors = null) {
    //     return new ErrorResponse(message, 400, errors);
    // }

    // static unauthorized(message = 'Unauthorized') {
    //     return new ErrorResponse(message, 401);
    // }

    // static forbidden(message = 'Forbidden'){
    //     return new ErrorResponse(message, 403);
    // }
}

module.exports = ResponseFactory;