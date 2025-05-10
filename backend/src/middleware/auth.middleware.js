import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


// TOKEN HAS userId

export const protectRoutes = async (req, res, next) => {
  // Getting jwt token from the request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded); // Log the decoded token for debugging
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }
    req.user = user; // Attach the user to the request object
    next();
  } catch (error) {
    console.error("Error in protectRoutes middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
