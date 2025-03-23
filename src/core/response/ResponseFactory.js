const SuccessResponse = require('./SuccessResponse');
const ErrorResponse = require('./ErrorResponse');
// const NotFoundResponse = require('./NotFoundResponse');
//Mình sử dụng Factory Pattern để tạo response chuẩn hóa, đảm bảo code DRY (Don't Repeat Yourself).
//  Nhưng mình thấy nó chưa đủ linh hoạt, nên đã kết hợp Builder Pattern để có thể mở rộng thêm metadata, headers...
// mà không làm vỡ code cũ. Nếu sau này team cần thêm các loại response như PaginationResponse,
// chỉ cần mở rộng ResponseBuilder mà không phải sửa từng API!"

// ➡ Vừa thể hiện tư duy tổ chức code, vừa cho thấy khả năng mở rộng hệ thống!
class ResponseBuilder {
    constructor(type) {
        this.type = type;
        this.message = "";
        this.data = null;
        this.statusCode = 200;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    build() {
        switch (this.type) {
            case ResponseFactory.SUCCESS:
                return new SuccessResponse(this.message, this.data);
            case ResponseFactory.ERROR:
                return new ErrorResponse(this.message, this.statusCode);
            // case ResponseFactory.NOT_FOUND:
            //     return new NotFoundResponse(this.message);
            default:
                throw new Error('❌ Invalid response type');
        }
    }
}

class ResponseFactory {
    static SUCCESS = 'success';
    static ERROR = 'error';
    static NOT_FOUND = 'not_found';

    static createResponse(type) {
        return new ResponseBuilder(type);
    }

    static success(message, data = null) {
        return this.createResponse(this.SUCCESS).setMessage(message).setData(data).build();
    }

    static error(message, statusCode = 500) {
        return this.createResponse(this.ERROR).setMessage(message).setStatusCode(statusCode).build();
    }

    // static notFound(message = "Không tìm thấy tài nguyên") {
    //     return this.createResponse(this.NOT_FOUND).setMessage(message).build();
    // }
}

module.exports = ResponseFactory;
