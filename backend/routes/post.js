const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Assuming Post model path

const authMiddleware = require("../middleware/authMiddleware"); // Path to your auth middleware

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

// Create a new post
router.post("/", async (req, res) => {
  const userId = req.user.userId;
  console.log(userId)
  const { desc, img } = req.body;
  try {
    const newPost = new Post({
      userId,
      desc,
      img,
    });
    console.log(newPost)

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a post by ID (only the post owner)
router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { desc, img } = req.body;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);
    console.log(post)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log("data base "+ post.userId)
    console.log("jwt "+userId)


    if (post.userId.toString()!== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    post.desc = desc || post.desc;
    post.img = img || post.img;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a post by ID (only the post owner)
router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !=userId.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await post.deleteOne({postId});
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Like a post
router.put("/:id/like", async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId;
  console.log(postId)
  console.log(userId)

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
      res.json({ message: "Post liked" });
    } else {
      post.likes = post.likes.filter(id => id.toString() !== userId);
      await post.save();
      res.json({ message: "Post unliked" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a post by ID
router.get("/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
