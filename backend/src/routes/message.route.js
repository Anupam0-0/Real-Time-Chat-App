import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import { getMessageByRoom, sendMessageFallback } from "../controllers/message.controller.js";

const router = express.Router();

// router.get("/users", protectRoutes, getUsersForSidebar);
// router.get("/:id", protectRoutes, getMessages);
// router.post("/send/:id", protectRoutes, sendMessage);

router.get("/users/:roomId", protectRoutes, getMessageByRoom);
router.post("/users/:roomId", protectRoutes, sendMessageFallback);

export default router;