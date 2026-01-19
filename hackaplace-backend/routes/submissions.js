const express = require('express');
const Submission = require('../models/Submission');
const Hackathon = require('../models/Hackathon');
const Team = require('../models/Team');
const { verifyFirebaseToken } = require('../middleware/auth');

const router = express.Router();

// Get submissions for a hackathon
router.get('/hackathon/:hackathonId', verifyFirebaseToken, async (req, res) => {
  try {
    const submissions = await Submission.find({ hackathon: req.params.hackathonId })
      .populate('team', 'name leader members')
      .populate('hackathon', 'name')
      .sort({ submittedAt: -1 });

    res.json({ submissions });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get submission by ID
router.get('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('team', 'name leader members')
      .populate('hackathon', 'name');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json({ submission });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create submission
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await require('../models/User').findOne({ firebaseUid: req.user.uid });
    const team = await Team.findById(req.body.teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if user is team leader
    if (team.leader.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Only team leader can submit' });
    }

    // Check if team already submitted
    const existingSubmission = await Submission.findOne({
      hackathon: req.body.hackathonId,
      team: req.body.teamId
    });

    if (existingSubmission) {
      return res.status(400).json({ error: 'Team already submitted for this hackathon' });
    }

    const submission = new Submission({
      hackathon: req.body.hackathonId,
      team: req.body.teamId,
      title: req.body.title,
      description: req.body.description,
      githubUrl: req.body.githubUrl,
      demoUrl: req.body.demoUrl,
      files: req.body.files || []
    });

    await submission.save();

    const populatedSubmission = await Submission.findById(submission._id)
      .populate('team', 'name leader members')
      .populate('hackathon', 'name');

    res.status(201).json({ submission: populatedSubmission });
  } catch (error) {
    console.error('Create submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update submission (team leader only)
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await require('../models/User').findOne({ firebaseUid: req.user.uid });
    const submission = await Submission.findById(req.params.id).populate('team');

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    if (submission.team.leader.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Only team leader can update submission' });
    }

    const updatedSubmission = await Submission.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('team', 'name leader members')
     .populate('hackathon', 'name');

    res.json({ submission: updatedSubmission });
  } catch (error) {
    console.error('Update submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
