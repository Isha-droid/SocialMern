// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model path

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your JWT secret
    const user = await User.findById(decoded.userId);
    console.log(user)

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user information to the request object
    req.user = {
      userId: user._id,
      username: user.username,
      // Add other user details as needed
    };
    console.log(req.user)

    next(); // Move to the next middleware or rout
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
