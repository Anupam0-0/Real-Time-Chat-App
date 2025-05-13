import { create } from "zustand";
import apiInstance from "../lib/axios"; // Adjust the import path as necessary

const useAuthStore = create((set) => ({
  user: localStorage.getItem("monochatUser") || null,
  setUser: (user) => {
    localStorage.setItem("monochatUser", user);
    set({ user, isLoggedIn: true });
  },

  token: localStorage.getItem("monochatToken") || null,
  setToken: (token) => {
    localStorage.setItem("monochatToken", token);
    set({ token, isLoggedIn: true });
  },

  isLoggedIn: !!localStorage.getItem("monochatUser"),
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // LOGIC LOGOUT
  logout: async () => {
    try {
      await apiInstance.post("/auth/logout");
      localStorage.removeItem("monochatUser");
      set({ user: null, token: null, isLoggedIn: false });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;
