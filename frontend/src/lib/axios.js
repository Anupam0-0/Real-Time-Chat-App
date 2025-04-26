import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // key to send cookies
})

export const searchUsers = async (query) => {
    try {
        const response = await axiosInstance.get(`/users/search?query=${query}`);
        return response.data; // Return the list of users

    } catch (error) {
        console.error("Error in searchUsers:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}

export const handleAddFriend = async (id) => {
    try {
        const res = await axiosInstance.post('/friends/add', { id });
        if ()
        
    } catch (error) {
        console.error("Error in handleAddFriend:", error);
        throw error; // Rethrow the error to be handled by the calling function
        
    }
}

export default axiosInstance;
