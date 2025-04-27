import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore";

const userId = useAuthStore.getState().user;

let socket = null; 

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: { userId },
    });

    socket.on("connected", (data) => {
      console.log("✅ Connected with socket ID:", data.socketId);
    });

    socket.on("receiveMessage", (message) => {
      // console.log("📩 Message received:", message);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Socket connection error:", err.message);
    });
  }
};

const generateRoomId = (id1, id2) => {
  return [String(id1), String(id2)].sort().join("_");
};

export const joinRoom = (ids) => {
  const { friendId, myId } = ids;
  const roomId = generateRoomId(friendId, myId);
  console.log("Joining room:", roomId);
  socket.emit("joinRoom", { roomId });
};

export const sendMessage = ({friendId, myId, content}) => {
  const roomId = generateRoomId(friendId, myId);
  const msg = {
    roomId,
    senderId: myId,
    receiverId: friendId,
    content,
    timestamp: new Date().toISOString(),
  };
  // console.log("Sending message:", msg);
  socket.emit("sendMessage", msg);
};

export const checkConnection = () => {
  socket.emit("check", userId);
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
