import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore";

let socket = null;

export const connectSocket = () => {
  const userId = useAuthStore.getState().user;
  
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: {
        userId: userId,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Connection error:", err.message);
    });

    socket.on("receiveMessage", (message) => {
      console.log("📨 Message received:", message);
    });
  }
  
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
