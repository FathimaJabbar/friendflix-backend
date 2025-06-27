// routes/match.js
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed

// GET /api/match/:userId
router.get('/match/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch current user
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Match users with at least one movie in common
  const matchedUsers = await User.find({
  _id: { $ne: mongoose.Types.ObjectId(userId) }, // ✅ proper ObjectId comparison
  movies: { $in: currentUser.movies }
}).select('username movies');


    res.json(matchedUsers);
  } catch (error) {
    console.error('Match error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
