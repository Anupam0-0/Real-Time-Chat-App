import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000/api', // Replace with your API URL
  withCredentials: true, // 🔥 KEY: Send cookies!
});

export default axiosInstance;