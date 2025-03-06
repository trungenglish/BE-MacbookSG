class ApiResponse {
    constructor(status, statusCode, message, data = null){
        this.status = status;
        this.statusCode = statusCode;
        this.messsage = message;
        this.data = data;
        this.timestap = new Date().toDateString();
    }
}

module.exports = ApiResponse;