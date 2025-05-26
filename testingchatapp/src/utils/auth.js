// This file contains utility functions for authentication handling in a React application.
import useAuthStore from "../store/useAuthStore";
import { useRoomStore } from "../store/useAuthStore";

export default function hello() {
  console.log("Hello from utils/auth.js!");
}


export function handleLogout(e) {
  e.preventDefault();
  useAuthStore.getState().setToken("");
  localStorage.removeItem("TEMPTOKEN");
  useAuthStore.getState().setUser(null);
  useRoomStore.getState().setRoom(null);
  console.log("Logged out successfully");
  window.location.reload();
  // Optionally, redirect to login page or show a message
}
