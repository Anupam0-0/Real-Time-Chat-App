import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    isGroup: { type: Boolean, default: false },
    members: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
