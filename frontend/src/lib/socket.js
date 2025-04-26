import { io } from "socket.io-client";

export const socket = io("http://localhost:5173", {
  auth: {
    token: localStorage.getItem("token"),
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

