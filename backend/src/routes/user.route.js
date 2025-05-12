import express from "express";
import User from "../models/user.model.js";
import { getUserProfile, getUserByUsername } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/search", getUserByUsername);
router.get("/:id", getUserProfile);

export default router;
