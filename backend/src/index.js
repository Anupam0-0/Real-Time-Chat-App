import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import {connectDB} from "./lib/db.js";
import {app, server} from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import roomRoutes from "./routes/room.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: '*' })
);

app.get("/", (req, res) => {
  console.log("Hello");
  return res.json({message: "Hello There"})
})
app.use("/api/users", userRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})