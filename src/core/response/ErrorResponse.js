const ApiResponse = require('./ApiResponse');

class ErrorResponse extends ApiResponse {
    constructor(message, statusCode = 500) {
        super();
        this._status = "error";
        this._statusCode = statusCode;
        this._message = message;
        this._data = null;
        this._timestamp = new Date().toDateString();
    }

    getStatus() { return this._status; }
    getStatusCode() { return this._statusCode; }
    getMessage() { return this._message; }
    getData() { return this._data; }
    getTimestamp() { return this._timestamp; }
}

module.exports = ErrorResponse;