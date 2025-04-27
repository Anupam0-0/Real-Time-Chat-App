import { io } from "socket.io-client";
import  useAuthStore  from "../store/useAuthStore";

const userId = useAuthStore.getState().user;

export const socket = io("http://localhost:3000", {
  auth: {
    userId: userId,
  },
});


const generateRoomId = (id1, id2) => {
  return [id1, id2].sort().join("_");
};

export const joinChatRoom = (friendId, myId) => {
  const roomId = generateRoomId(friendId, myId);
  socket.emit("joinRoom", { roomId });
};

export const sendMessage = (friendId, myId, message) => {
  const roomId = generateRoomId(friendId, myId);
  socket.emit("sendMessage", {
    roomId,
    message: {
      senderId: myId,
      content: message,
      timestamp: new Date().toISOString(),
    },
  });
};

export const checkConnection = (userId) => {
  socket.emit("check", userId);
}




socket.on('connected', (data) => {
  console.log('✅ Connected to Socket.IO server:', data.socketId);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from Socket.IO server');
});

socket.on('connect_error', (err) => {
  console.error('🚨 Connection error:', err.message);
});



