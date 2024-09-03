const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Profile = require('../models/Profile');

router.post('/userdetails', async (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const userData = await User.findById(UserId).select('-password');
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = await Profile.findOne({ userId: UserId });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json({ userData, userProfile });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
