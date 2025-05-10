import User from "../models/user.model.js";

export const friendsList = async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).json({ message: userId});
  }
  try {
    const user = await User.findById(userId).populate(
      "friends",
      "_id username profilePic fullName"
    );
    res.status(200).json(user.friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  if (!userId || !friendId) {
    return res
      .status(400)
      .json({ message: "User ID and Friend ID are required" });
  }
  if (userId === friendId) {
    return res.status(400).json({ message: "Cannot add yourself as a friend" });
  }
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends" });
    }
    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend added successfully" });
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ message: error.message });
  }
};
