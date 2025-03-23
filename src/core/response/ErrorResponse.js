const ApiResponse = require('./ApiResponse');

class ErrorResponse extends ApiResponse {
    constructor(message, statusCode = 500) {
        super();
        this.status = "error";
        this.statusCode = statusCode;
        this.message = message;
        this.data = null;
        this.timestamp = new Date().toDateString();
    }

    getStatus() { return this.status; }
    getStatusCode() { return this.statusCode; }
    getMessage() { return this.message; }
    getData() { return this.data; }
    getTimestamp() { return this.timestamp; }
}

module.exports = ErrorResponse;