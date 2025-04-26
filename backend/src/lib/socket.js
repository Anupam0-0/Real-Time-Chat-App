import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null;
}

// used to store the socket id of the user
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("New socket connection", socket.id);

  socket.on('joinRoom', ({roomId}) => {
    socket.join(roomId);
    console.log(`User: ${socket.id} joined room: ${roomId}`);
  })

  socket.on('sendMessage', ({roomId, message}) => {
    socket.to(roomId).emit('receiveMessage', message);
    console.log(`Message sent to room: ${roomId}`, message);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);
  });
});

export { app, server, io };
