import express from "express";
import User from "../models/user.model.js";
import { getUserById } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/search", getUserById);

export default router;
