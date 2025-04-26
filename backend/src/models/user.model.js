import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    profilePic: {
      type: String,
      default: "",
    },
    friends: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      default: []
    }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
