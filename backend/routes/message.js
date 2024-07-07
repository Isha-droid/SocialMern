const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary
const authMiddleware = require("../middleware/authMiddleware"); // Path to your auth middleware


// Route to get all messages
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().populate('userId', 'username profilePicture');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Route to send a message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, mediaUrl } = req.body;
    console.log(content)
    console.log(mediaUrl)


    // Validate userId and content
  const userId = req.user.userId;

    if (!userId || !content) {
      return res.status(400).json({ error: 'User ID and content are required' });
    }

    // Create and save a new message
    const newMessage = new Message({
      userId,
      content,
      mediaUrl: mediaUrl || null // Use mediaUrl if provided, otherwise default to null
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

module.exports = router;
