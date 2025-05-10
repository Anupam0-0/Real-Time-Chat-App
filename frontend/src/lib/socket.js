import { io } from "socket.io-client";
import useAuthStore from "../store/useAuthStore";

const userId = useAuthStore.getState().user;

let socket = null; 

// const baseURL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : '/';
const baseURL = "http://localhost:5173/"


export const connectSocket = (userId) => {
  if (!socket) {
    socket = io(baseURL , {
      auth: { userId },
      withCredentials: true,
    });

    socket.on("connected", (data) => {
      console.log("✅ Connected with socket ID:", data.socketId);
    });

    // socket.on("receiveMessage", (message) => {
    //    console.log("📩 Message received:", message);
    // });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("🚨 Socket connection error:", err);
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
  console.log("Checking connection for user:", userId);
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
