import { create } from "zustand";
import apiInstance from "../lib/axios"; // Adjust the import path as necessary

const useAuthStore = create((set) => ({
  // returns the userId from localStorage if it exists, otherwise null
  user: localStorage.getItem("monochatID") || null,

  // checks if the userId exists in localStorage to determine if the user is logged in
  // if it exists, isLoggedIn will be true, otherwise false 
  isLoggedIn: !!localStorage.getItem("monochatID"),
  error: null,

  // sets the userId in localStorage and updates the state
  setUser: (user) => {
    localStorage.setItem("monochatID", user);
    set({ user, isLoggedIn: true });
  },

  // clears the userId from localStorage and updates the state
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // logs out the user by making a POST request to the logout endpoint
  // clears the userId from localStorage and updates the state
  logout: async () => {
    await apiInstance.post("/auth/logout");
    localStorage.removeItem("monochatID");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
