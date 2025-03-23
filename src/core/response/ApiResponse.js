class ApiResponse {
    constructor() {
        if (this.constructor === ApiResponse) {
            throw new Error("Interface không thể được khởi tạo trực tiếp.");
        }
    }
    
    getStatus() { throw new Error("Phương thức getStatus chưa được implement"); }
    getStatusCode() { throw new Error("Phương thức getStatusCode chưa được implement"); }
    getMessage() { throw new Error("Phương thức getMessage chưa được implement"); }
    getData() { throw new Error("Phương thức getData chưa được implement"); }
    getTimestamp() { throw new Error("Phương thức getTimestamp chưa được implement"); }
}

module.exports = ApiResponse;