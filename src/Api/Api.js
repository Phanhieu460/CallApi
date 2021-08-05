import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  timeout: 5000,
  responseType: "json",
});
axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});
// Xử lý đê chỉ lấy data trả về response.data
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // only get data
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
