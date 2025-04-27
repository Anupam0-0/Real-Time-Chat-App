import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);

const userSocketMap = {}; // {userId: socketId}
const reverseSocketMap = {}; // {socketId: userId}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null;
}

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  console.log("New socket connection", socket.id, "for user:", userId);
  socket.emit("connected", { socketId: socket.id });
  socket.on("check", (userId) => {
    console.log("Checking connection for user:", userId);
  });
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User ${userId} n ${socket.id} joined room: ${roomId}`);
    console.log("Current rooms:", roomId);
  });

  socket.on("sendMessage", (message) => {
    const { roomId } = message;
    // socket.to(roomId).emit("receiveMessage", message); // to all except sender
    // socket.emit("receiveMessage", { success: true, data: message }); // to sender
    io.to(roomId).emit("receiveMessage", { success: true, data: message }); // to all incl sender
  });

  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected: ${socket.id}`);

    if (userId) {
      delete userSocketMap[userId];
    }
    delete reverseSocketMap[socket.id];
  });
});

export { app, server, io };
