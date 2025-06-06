import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/check", (req, res) => {
  res.json({ message: "Hello from auth route. PS: Try Get for user" });

})
router.post("/signup", signup);
router.post("/login", login);
router.get("/login", (req, res) => {
  console.log(req.body);
  res.json({ message: "Hello from auth route. PS: Try Post for login" });
});
router.post("/logout", logout);

router.put("/update-profile", protectRoutes, updateProfile);
router.get("/check", protectRoutes, checkAuth);

export default router;
