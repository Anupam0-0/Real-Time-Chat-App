import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore";

let socket = null;

// Base URL for server connection
const baseURL = import.meta.env.MODE === "development"
  ? "http://localhost:3000" // ✅ This should be your backend port
  : "/";

// Generate consistent room ID (sorted)
const generateRoomId = (id1, id2) => {
  return [String(id1), String(id2)].sort().join("_");
};

// Connect socket using user's ID from Zustand store
export const connectSocket = () => {
  const userId = useAuthStore.getState().user?._id;

  if (!userId) {
    console.warn("User not authenticated. Cannot connect socket.");
    return;
  }

  if (!socket) {
    socket = io(baseURL, {
      auth: { userId },
      transports: ["websocket"], // ✅ Prevent long-polling fallback
      withCredentials: true, // If you're using cookies later
    });

    socket.on("connect", () => {
      console.log("✅ Connected with socket ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Socket connection error:", err);
    });
  }
};

// Join a room by friendId and your own ID (DM or group)
export const joinRoom = ({ friendId, myId }) => {
  const roomId = generateRoomId(friendId, myId);
  console.log("📥 Joining room:", roomId);
  socket?.emit("joinRoom", { roomId });
};

// Send message to socket server
export const sendMessage = ({ friendId, myId, content }) => {
  const roomId = generateRoomId(friendId, myId);
  const msg = {
    roomId,
    senderId: myId,
    receiverId: friendId,
    content,
    timestamp: new Date().toISOString(),
  };

  socket?.emit("sendMessage", msg);
};

// Check connection by pinging server
export const checkConnection = () => {
  const userId = useAuthStore.getState().user?._id;
  socket?.emit("check", userId);
  console.log("🧪 Checking socket connection for:", userId);
};

// Return socket instance
export const getSocket = () => socket;

// Cleanly disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected cleanly.");
  }
};
