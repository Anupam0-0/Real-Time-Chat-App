import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api"
      : "/api",
  withCredentials: true, // key to send cookies
});

export const handleSignup = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/signup", userData);
    if (res.status === 200) {
      const userId = res.data.userId; // Assuming the response contains the userId
      useAuthStore.getState().setUser(userId); // Set the user ID in the store
      localStorage.setItem("monochatID", userId);
      console.log(res.data);
      return res.data; // Return the response data
    }
  } catch (error) {
    console.error("Error in handleSignup:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const handleLogin = async (userData) => {
  try {
    const res = await axiosInstance.post("/auth/login", userData);
    if (res.status === 200) {
      const userId = res.data.userId; // Assuming the response contains the userId
      useAuthStore.getState().setUser(userId); // Set the user ID in the store
      localStorage.setItem("monochatID", userId);
    //   console.log(res.data);
      return res.data; // Return the response data
    }
  } catch (error) {
    console.error("Error in handleLogin:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await axiosInstance.get(`/users/search?query=${query}`);
    return response.data; // Return the list of users
  } catch (error) {
    console.error("Error in searchUsers:", error);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const AddFriend = async (friendId) => {
  const user = useAuthStore.getState().user; // Get the user ID from the store
  try {
    const res = await axiosInstance.post("/friends/add", {
      friendId: friendId,
      userId: user,
    });
    // console.log(friendId, user, "wants to be friends");
    if (res.status === 200) {
      const ans = "added";
      return ans; // Return the status of the response
    }
  } catch (error) {
    console.error("Error in handleAddFriend:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export const FriendList = async () => {
  try {
    const res = await axiosInstance.get(`/friends/list`);
    if (res.status === 200) {
      return res.data; // Return the list of friends
    }
  } catch (error) {
    console.error("Error in FriendList:", error.message);
    throw error; // Rethrow the error to be handled by the calling function
  }
};

export default axiosInstance;
