import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore";

let socket = null;

export const connectSocket = () => {
  const userId = useAuthStore.getState().user;
  console.log("User ID:", userId);

  if (!userId){
    console.error("User ID is not available. Cannot connect socket.");
    return;
  }
  

  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: {
        userId: userId,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
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

    socket.off("receiveMessage"); // Remove any previous handler
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
