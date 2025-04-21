import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import {connectDB} from "./lib/db";
import {app, server} from "./lib/socket.js";

// import authRouter from "./routes/auth.route.js";
// import messageRoutes from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// for production build
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
    })
}

Server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})