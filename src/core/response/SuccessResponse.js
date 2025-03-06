const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
    constructor(data, message = 'Success', statusCode = 200) {
        super('success', statusCode, message, data);
    }
}

module.exports = SuccessResponse;