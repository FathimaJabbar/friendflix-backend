const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ msg: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      passwordHash,
      movies: [] 
    });

    const savedUser = await newUser.save();
    res.json({ msg: 'User registered successfully', userId: savedUser._id });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
