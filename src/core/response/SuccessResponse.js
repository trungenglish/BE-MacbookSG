const ApiResponse = require('./ApiResponse');

class SuccessResponse extends ApiResponse {
    constructor(message, data = null) {
        super();
        this._status = "success";
        this._statusCode = 200;
        this._message = message;
        this._data = data;
        this._timestamp = new Date().toDateString();
    }

    getStatus() { return this._status; }
    getStatusCode() { return this._statusCode; }
    getMessage() { return this._message; }
    getData() { return this._data; }
    getTimestamp() { return this._timestamp; }
}

module.exports = SuccessResponse;