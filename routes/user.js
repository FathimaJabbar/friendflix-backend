const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/user/add-movies/:userId
router.post('/add-movies/:userId', async (req, res) => {
  const { movies } = req.body;

  if (!movies || !Array.isArray(movies)) {
    return res.status(400).json({ msg: 'Movies must be an array' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Avoid duplicates
    const updatedMovies = [...new Set([...user.movies, ...movies])];
    user.movies = updatedMovies;

    await user.save();
    res.json({ msg: 'Movies added successfully', movies: user.movies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
