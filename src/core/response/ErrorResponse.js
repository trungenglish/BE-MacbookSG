const ApiResponse = require('./ApiResponse');

class ErrorResponse extends ApiResponse {
    constructor(message = 'Error', statusCode = 500, errors = null) {
        super('error', statusCode, message, null);
        this.errors = errors;
    }
}

module.exports = ErrorResponse;
