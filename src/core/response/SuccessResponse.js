const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
    constructor(message, data = null) {
        super();
        this.status = "success";
        this.statusCode = 200;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toDateString();
    }

    getStatus() { return this.status; }
    getStatusCode() { return this.statusCode; }
    getMessage() { return this.message; }
    getData() { return this.data; }
    getTimestamp() { return this.timestamp; }
}

module.exports = SuccessResponse;