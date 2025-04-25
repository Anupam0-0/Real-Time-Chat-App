import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import {connectDB} from "./lib/db.js";
import {app, server} from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log("Hello");
  return res.json({message: "Hello There"})
})
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// for production build
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})