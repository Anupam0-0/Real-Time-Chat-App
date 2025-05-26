import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Room from "../models/room.model.js";
import jwt from "jsonwebtoken";
import { send } from "process";

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
  // console.log("Socket token:", token);
  if (!token) return next(new Error("User Token not provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new Error("Invalid token"));

    const userId = decoded.userId;
    socket.userId = userId;
    // console.log("User authenticated", userId);

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

io.on("connection", (socket) => {
  const userId = socket.userId;
  console.log(">> New socket connection", socket.id, "for user:", userId);

  // returns to client that socket is connected
  socket.emit("connected", { socketId: socket.id });

  // returns to client that socket is connected
  socket.on("check", (userId) =>
    console.log("Checking connection for user:", userId)
  );

  // User joins a room w/ receiver username
  socket.on("join_room", async ({ receiver }) => {
    try {
      if (!receiver || typeof receiver !== "string") {
        return socket.emit("error", { message: "Invalid receiver username" });
      }

      const senderId = userId;
      const receiverIdObject = await User.findOne({
        username: receiver,
      }).select("_id");
      if (!receiverIdObject) {
        return socket.emit("error", { message: "Receiver not found" });
      }
      const receiverId = receiverIdObject._id.toString();

      // Sort IDs to prevent duplicate rooms for the same two people
      const sortedMembers = [senderId, receiverId].sort();

      // Ensure only one room exists for these two users
      let room = await Room.findOne({
        isGroup: false,
        members: sortedMembers,
      }) 

      if (!room) {
        // Use a consistent ordering of members to prevent duplicate rooms
        room = await Room.create({
          isGroup: false,
          members: sortedMembers,
        });
      }
      const mongoRoomId = room._id.toString();
      
      console.log(`${senderId} joining room with ${receiverId} who is ${receiver} (RoomId: ${mongoRoomId})`);
      socket.join(mongoRoomId); // Join the MongoDB room
      socket.emit("joined_room", mongoRoomId);
    } catch (error) {
      console.error("Error joining room:", error.message);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  // listens client message and broadcarsts to all clients in the room
  socket.on("send_message", async ({ roomId, content }) => {
    if (!roomId || !content)
      return socket.emit("error", { message: "Invalid roomId or content" });

    try {
      const newmessage = await Message.create({
        senderId: userId,
        roomId: roomId, // This is now a valid MongoDB ObjectId
        content,
      });

      console.log("New message created:", newmessage);
      io.to(roomId).emit("receive_message", {
        success: true,
        _id: newmessage._id,
        senderId: userId,
        roomId: roomId,
        content,
        createdAt: newmessage.createdAt,
      });
    } catch (error) {
      console.error("Error sending message:", error.message);
      socket.emit("error", { message: "Failed to send message" });
    }
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
