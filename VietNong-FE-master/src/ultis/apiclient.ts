import axios, { AxiosInstance } from 'axios';

// Khởi tạo axios với URL gốc của API

//deploy

// const apiclient: AxiosInstance = axios.create({
//   baseURL: 'https://apivietnong-f9a8ecdydsdmebb3.canadacentral-01.azurewebsites.net/api',
//   headers: {
//     'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
//     Accept: '*/*',
//   },
// });

//localhost
const apiclient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7050/api',
  headers: {
    'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
    Accept: '*/*',
  },
});


// Thêm interceptor để tự động thêm token vào tiêu đề
apiclient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào tiêu đề
    }
    return config; // Trả về cấu hình đã chỉnh sửa
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiclient;