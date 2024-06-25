const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming User model is defined in ./User
const authMiddleware = require('../middleware/authMiddleware'); // Path to your auth middleware

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);
// Update a user by ID (only the user themselves)
router.put("/:id", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);

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
router.put("/follow/:id", async (req, res) => {
  const userId = req.params.id;
  const { followId } = req.body;

  try {
    // Find the current user and the user to be followed
    const user = await User.findById(userId);
    const userToFollow = await User.findById(followId);

    if (!user || !userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the other user
    if (user.following.includes(followId)) {
      return res.status(400).json({ message: "You are already following this user" });
    }

    // Add followId to the following array of the current user
    user.following.push(followId);
    await user.save();

    // Add userId to the followers array of the user being followed
    userToFollow.followers.push(userId);
    await userToFollow.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/unfollow/:id", async (req, res) => {
  const userId = req.params.id;
  const { unfollowId } = req.body;

  try {
    // Find the current user and the user to be unfollowed
    const user = await User.findById(userId);
    const userToUnfollow = await User.findById(unfollowId);

    if (!user || !userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is not following the other user
    if (!user.following.includes(unfollowId)) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Remove unfollowId from the following array of the current user
    user.following.pull(unfollowId);
    await user.save();

    // Remove userId from the followers array of the user being unfollowed
    userToUnfollow.followers.pull(userId);
    await userToUnfollow.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
