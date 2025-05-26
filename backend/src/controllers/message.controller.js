import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getMessageByRoom = async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId,
    })
      .populate("senderId", "-password")
      .populate("roomId")
      .sort({ createdAt: 1 })
      .limit(30);

    res.json(messages);

  } catch (error) {
    console.error("Error in getMessageByRoom: ", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch messages", error: error.message });
  }
};

// POST ./messages
// Optional: Fallback for sending messages when socket is not available || REST-based message sending
export const sendMessageFallback = async (req, res) => {
  try {
    // const { content, image } = req.body;
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
