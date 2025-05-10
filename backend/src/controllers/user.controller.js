// ROUTES:
// GET /api/users/search?query=
// GET /api/users/:id
import User from "../models/user.model.js";


// SEARCH FOR USER FOR DM by username
// API endpoint: /api/user/search?id=
export const getUserById = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    if (users.length === 0)
      return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Search for user Failed!", error: err.message });
  }
};

// GET USER PROFILE
// API endpoint: /api/user/:id
// fetch user date (used in sidebar/profile)
export const getUserProfile = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "User ID is required" });

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
};
