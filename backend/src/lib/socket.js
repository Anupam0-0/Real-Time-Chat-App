import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import Message from "../models/message.model.js"
import Room from "../models/room.model.js";

const app = express();
const server = createServer(app);

const userSocketMap = {}; // {userId: socketId}
const reverseSocketMap = {}; // {socketId: userId}

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("User Token not provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new Error("Invalid token"));

    const userId = decoded.userId;
    socket.userId = userId;
    console.log("User authenticated", userId);

    userSocketMap[userId] = socket.id; // Store the socket ID for the user
    reverseSocketMap[socket.id] = userId; // Store the user ID for the socket

    next();
  } catch (error) {
    next(new Error("Invalid token"));
    console.log("Invalid token", error);
  }
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId] || null;
}


// emit -> connected
// on -> check
// on -> join-room
// on -> send_message -> add to db + emit io.to "receive_message" room
// on -> disconnect


io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;
  console.log("New socket connection", socket.id, "for user:", userId);

  // returns to client that socket is connected
  socket.emit("connected", { socketId: socket.id });

  // returns to client that socket is connected
  socket.on("check", (userId) => console.log("Checking connection for user:", userId));


  Room.find({ members: userId }).then((rooms) => {
    rooms.forEach((room) => {
      socket.join(room._id.toString());
      console.log(`>> User ${userId} joined room: ${room._id}`);
    });
  })

  // User joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${userId} n ${socket.id} joined room: ${roomId}`);
  });


  // listens client message and broadcarsts to all clients in the room
  socket.on("send_message", async ({ roomId, content }) => {
    const newmessage = await Message.create({
      senderId: userId,
      roomId: roomId,
      content,
    });
    // socket.to(roomId).emit("receiveMessage", message); // to all except sender
    // socket.emit("receiveMessage", { success: true, data: message }); // to sender
    io.to(roomId).emit("receive_message", {
      success: true,
      _id: newmessage._id,
      senderId: userId,
      roomId: roomId,
      content,
      createdAt: newmessage.createdAt,
    }); // to all incl sender
  });


  // User disconnects
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected: ${socket.id}`);
    if (userId) {
      delete userSocketMap[userId];
    }
    delete reverseSocketMap[socket.id];
  });
});

export { app, server, io };

// scalable socker mapping logic// In-memory map (replace with Redis later)
// const userSockeinsetMap = new Map(); // userId -> socketId
// const socketUserMap = new Map(); // socketId -> userId

// export const addSocketConnection = (userId, socketId) => {
//   userSocketMap.set(userId, socketId);
//   socketUserMap.set(socketId, userId);
// };

// export const removeSocketConnection = (socketId) => {
//   const userId = socketUserMap.get(socketId);
//   if (userId) userSocketMap.delete(userId);
//   socketUserMap.delete(socketId);
// };

// export const getSocketIdByUserId = (userId) => userSocketMap.get(userId);
// export const getUserIdBySocketId = (socketId) => socketUserMap.get(socketId);
