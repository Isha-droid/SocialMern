const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming User model is defined in ./User
const authMiddleware = require('../middleware/authMiddleware'); // Path to your auth middleware
const mongoose = require("mongoose");
// Apply authMiddleware to all routes in this router
// Update a user by ID (only the user themselves)
router.put("/:id",authMiddleware, async (req, res) => {
  const { username, email, profilePicture, coverPicture, desc, city, relationship } = req.body;
  const userId = req.params.id;
  const loggedInUserId = req.user.userId; // Assuming you have this information in the request
  console.log(userId)
  console.log(loggedInUserId)
  try {
    // Check if the user making the request is the same as the user being updated
    if (userId != loggedInUserId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    let updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
        profilePicture,
        coverPicture,
        desc,
        city,
        relationship,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user by ID (only the user themselves)
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  const loggedInUserId = req.user.userId; // Assuming you have this information in the request

  try {
    // Check if the user making the request is the same as the user being deleted
    if (userId != loggedInUserId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    let deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a user by ID
router.get("/:identifier", async (req, res) => {
  const identifier = req.params.identifier;

  try {
    let user;

    // Check if the identifier is a valid ObjectId (assuming it's MongoDB)
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      user = await User.findById(identifier);
    } else {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Follow a user
router.put("/follow/:username", async (req, res) => {
  const username = req.params.username;
  const { followUsername } = req.body;
  console.log(followUsername)

  try {
    // Find the current user and the user to be followed by their usernames
    const user = await User.findOne({ username: username });
    const userToFollow = await User.findOne({ username: followUsername });

    if (!user || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the other user
    if (user.following.includes(userToFollow._id)) {
      return res.json({ message: "You are already following this user" });

    }

    // Add userToFollow._id to the following array of the current user
    user.following.push(userToFollow._id);
    await user.save();

    // Add user._id to the followers array of the user being followed
    userToFollow.followers.push(user._id);
    await userToFollow.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/unfollow/:username", async (req, res) => {
  const username = req.params.username;
  const { unfollowUsername } = req.body;

  try {
    // Find the current user and the user to be unfollowed
    const user = await User.findOne({ username: username });
    console.log(unfollowUsername)
    const userToUnfollow = await User.findOne({ username: unfollowUsername });
    console.log(userToUnfollow)

    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // // Check if the user is not following the other user
    if (!user.following.includes(userToUnfollow._id)) {
      return res.json({ message: "You are not following this user" });
    }

    // Remove userToUnfollow._id from the following array of the current user
    user.following.pull(userToUnfollow._id);
    await user.save();

    // Remove user._id from the followers array of the user being unfollowed
    userToUnfollow.followers.pull(user._id);
    await userToUnfollow.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/friends/:userId", authMiddleware, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the user's following (assumed to be friends)
    const friends = await Promise.all(
      user.following.map(async (friendId) => {
        return await User.findById(friendId);
      })
    );

    res.json(friends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
