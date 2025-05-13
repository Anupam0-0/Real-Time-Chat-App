// ROUTES:
// GET /api/rooms
// POST /api/rooms/dm
// POST /api/rooms/group
// PUT /api/rooms/group/:id/rename
// PUT /api/rooms/group/:id/members
// GET api/rooms/all

import Room from "../models/room.model.js";

// GET /api/rooms
// Get all DM + group rooms user is a part of
export const getAllUserRooms = async (req, res) => {
  const { userId } = req.user;
  try {
    const rooms = await Room.find({ members: userId })
      .populate("members", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    if (!rooms) {
      return res.status(404).json({ message: "No rooms found" });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch rooms", error: error.message });
  }
};

// POST api/rooms/dm
// Find if DM room exists between two users
// If not, create it with `isGroup: false`
export const createFetchDMRoom = async (req, res) => {
  try {
    const { receiverId } = req.body;
    //check if DM already exists
    const room = await Room.findOne({
      isGroup: false,
      members: { $all: [req.user.userId, receiverId], $size: 2 },
    });

    if (!existingRoom) {
      room = await Room.create({
        isGroup: false,
        members: [req.user.userId, receiverId],
        roomName: "",
      });
    }

    if (!room) {
      return res
        .status(404)
        .json({ message: "No room found || Couldn't make one" });
    }

    room = await room
      .populate("members", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch/Create DM room", error });
  }
};

// POST api/rooms/group
// Create a group with name and list of user IDs
export const createGroupRoom = async (req, res) => {
  const { name, members } = req.body;
  if (!name || !members || members.length == 2) {
    return res
      .status(400)
      .json({ message: "Group requires name and at least 2 members" });
  }

  try {
    const room = await Room.create({
      name,
      members: [req.user.userId, ...members],
      isGroup: true,
    });

    if (!room) {
      return res.status(404).json({ message: "Couldn't create group" });
    }

    const populatedRoom = await room
      .populate("members", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(populatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create group", error });
  }
};

// PUT /api/rooms/group/:id/rename
// Update group name
export const renameGroup = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Group name is required" });
  }

  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    ).populate("members", "-password");

    if (!room) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to rename group", error });
  }
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to rename group", error });
  }
};

// PUT /api/rooms/group/:id/members
// Add/remove users in group
export const updateGroupMembers = async (req, res) => {
  const { members } = req.body;

  if (!members || members.length < 1) {
    return res.status(400).json({ message: "At least one member is required" });
  }

  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { members },
      { new: true }
    ).populate("members", "-password");

    if (!room) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update group members", error });
  }
};
