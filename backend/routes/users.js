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
    // Add `followId` to the `following` array of the current user
    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: followId },
    });

    // Add the current user's ID to the `followers` array of the user being followed
    await User.findByIdAndUpdate(followId, {
      $addToSet: { followers: userId },
    });

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Unfollow a user
router.put("/unfollow/:id", async (req, res) => {
  const userId = req.params.id;
  const { unfollowId } = req.body;

  try {
    // Remove `unfollowId` from the `following` array of the current user
    await User.findByIdAndUpdate(userId, {
      $pull: { following: unfollowId },
    });

    // Remove the current user's ID from the `followers` array of the user being unfollowed
    await User.findByIdAndUpdate(unfollowId, {
      $pull: { followers: userId },
    });

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
