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

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("User connected:", userId, socket.id);
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object, keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId, socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
