import { create } from "zustand";
import apiInstance from "../lib/axios"; // Adjust the import path as necessary

const useAuthStore = create((set) => ({
  user: localStorage.getItem("userId") || null,
  isLoggedIn: !!localStorage.getItem("userId"),
  error: null,
  setUser: (user) => {
    localStorage.setItem("userId", user);
    set({ user, isLoggedIn: true });
  },
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  logout: async () => {
    await apiInstance.post("/auth/logout");
    localStorage.removeItem("userId");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;
