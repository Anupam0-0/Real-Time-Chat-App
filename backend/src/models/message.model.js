import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    seen: { 
      type: Boolean, 
      default: false 
    },
    image: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }, // Automatically add createdAt and updatedAt timestamps
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
