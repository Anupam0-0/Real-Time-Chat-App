import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);

// used to store the socket id of the user
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
  console.log("New socket connection", socket.id);
  console.log("userId from frontend:", socket.handshake.auth.userId);







  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

});

export { app, server, io };






