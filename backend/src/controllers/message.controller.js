import User from "../models/user.model.js";
import Message from "../models/message.model.js";

import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;
//     const filteredUsers = await User.find({
//       _id: { $ne: loggedInUserId },
//     }).select("-password");

//     res.status(200).json(filteredUsers);
//   } catch (error) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const myId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userToChatId },
//         { senderId: userToChatId, receiverId: myId },
//       ],
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     // let imageUrl;
//     // if (image) {
//     //   // Upload base64 image to cloudinary
//     //   const uploadResponse = await cloudinary.uploader.upload(image);
//     //   imageUrl = uploadResponse.secure_url;
//     // }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       content: text,
//       image: " ",
//       // image: imageUrl,
//     });

//     await newMessage.save();

//     const receiverSocketId = receiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// GET /messages/:roomId
// Fetch last N messages from a room
export const getMessageByRoom = async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId,
    })
      .populate("sender", "-password")
      .populate("roomId")
      .sort({ createdAt: 1 })
      .limit(30);

    res.json(messages);

  } catch (error) {
    console.error("Error in getMessageByRoom: ", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: err.message });
  }
};

// POST ./messages
// Optional: Fallback for sending messages when socket is not available || REST-based message sending
export const sendMessageFallback = async (req, res) => {
  try {
    const { content, image } = req.body;
    const { id: roomId } = req.params;
    const senderId = req.user._id;

    // let imageUrl;
    // if (image) {
    //   // Upload base64 image to cloudinary
    //   const uploadResponse = await cloudinary.uploader.upload(image);
    //   imageUrl = uploadResponse.secure_url;
    // }

    const newMessage = new Message({
      sender: senderId,
      roomId,
      content: text,
      image: " ",
      // image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessageFallback controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }

}
