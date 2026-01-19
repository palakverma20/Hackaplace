const express = require('express');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');
const { verifyFirebaseToken } = require('../middleware/auth');

const router = express.Router();

// Get all hackathons
router.get('/', async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate('organizer', 'displayName email')
      .sort({ createdAt: -1 });

    res.json({ hackathons });
  } catch (error) {
    console.error('Get hackathons error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get hackathon by ID
router.get('/:id', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate('organizer', 'displayName email')
      .populate('participants', 'displayName email')
      .populate('teams', 'name leader members')
      .populate('judges', 'displayName email');

    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    res.json({ hackathon });
  } catch (error) {
    console.error('Get hackathon error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create hackathon (organizer only)
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user || (user.role !== 'organizer' && user.role !== 'admin')) {
      return res.status(403).json({ error: 'Only organizers can create hackathons' });
    }

    const hackathon = new Hackathon({
      ...req.body,
      organizer: user._id
    });

    await hackathon.save();

    res.status(201).json({ hackathon });
  } catch (error) {
    console.error('Create hackathon error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update hackathon (organizer only)
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    if (hackathon.organizer.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({ error: 'Only the organizer can update this hackathon' });
    }

    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    res.json({ hackathon: updatedHackathon });
  } catch (error) {
    console.error('Update hackathon error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Join hackathon
router.post('/:id/join', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const hackathon = await Hackathon.findById(req.params.id);

    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    if (hackathon.participants.includes(user._id)) {
      return res.status(400).json({ error: 'Already joined this hackathon' });
    }

    hackathon.participants.push(user._id);
    await hackathon.save();

    res.json({ message: 'Successfully joined hackathon' });
  } catch (error) {
    console.error('Join hackathon error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assign judge to hackathon (organizer/admin only)
router.post('/:id/judges', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const hackathon = await Hackathon.findById(req.params.id);
    const judge = await User.findById(req.body.judgeId);

    if (!hackathon || !judge) {
      return res.status(404).json({ error: 'Hackathon or judge not found' });
    }

    if (hackathon.organizer.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({ error: 'Only the organizer can assign judges' });
    }

    if (!hackathon.judges.includes(judge._id)) {
      hackathon.judges.push(judge._id);
      await hackathon.save();
    }

    res.json({ message: 'Judge assigned successfully' });
  } catch (error) {
    console.error('Assign judge error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
