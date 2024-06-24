class AppError extends Error {
  constructor(message, statusCode) {
    // hàm tạo 2 tham số
    super(message); // lấy từ lớp cha
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default AppError;
