const express = require('express');
const User = require('../models/User');
const { verifyFirebaseToken } = require('../middleware/auth');

const router = express.Router();

// Get current user profile
router.get('/profile', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', verifyFirebaseToken, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (admin only)
router.get('/', verifyFirebaseToken, async (req, res) => {
  try {
    const currentUser = await User.findOne({ firebaseUid: req.user.uid });

    if (currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user role (admin only)
router.put('/:id/role', verifyFirebaseToken, async (req, res) => {
  try {
    const currentUser = await User.findOne({ firebaseUid: req.user.uid });

    if (currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
