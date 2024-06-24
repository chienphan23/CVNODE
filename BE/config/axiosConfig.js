import axios from 'axios';

// Tạo một instance của Axios
const api = axios.create({
  baseURL: 'https://example.com/api',
  // Các cấu hình khác tùy theo yêu cầu của bạn
});

// Thêm interceptor để xử lý lỗi trả về từ server
api.interceptors.response.use(
  (response) => {
    // Nếu có dữ liệu hợp lệ, trả về response
    return response;
  },
  (error) => {
    // Xử lý lỗi
    if (error.response) {
      // Lỗi từ phía server, có response từ server
      console.error('Server error:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // Không có response từ server
      console.error('No response received:', error.request);
    } else {
      // Lỗi trong quá trình thiết lập yêu cầu
      console.error('Request setup error:', error.message);
    }

    // Trả về một promise với thông báo lỗi để có thể xử lý ở nơi khác
    return Promise.reject(error);
  }
);