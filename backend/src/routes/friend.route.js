import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import { friendsList, addFriend } from "../controllers/friends.controller.js";

const router = express.Router();

router.get("/list", protectRoutes, friendsList);
router.post("/add", protectRoutes, addFriend);

export default router;
