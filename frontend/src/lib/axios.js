import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // key to send cookies
})

export default axiosInstance;
