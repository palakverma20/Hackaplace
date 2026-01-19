const express = require('express');
const Team = require('../models/Team');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');
const { verifyFirebaseToken } = require('../middleware/auth');

const router = express.Router();

// Get teams for a hackathon
router.get('/hackathon/:hackathonId', async (req, res) => {
  try {
    const teams = await Team.find({ hackathon: req.params.hackathonId })
      .populate('leader', 'displayName email')
      .populate('members', 'displayName email')
      .sort({ createdAt: -1 });

    res.json({ teams });
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'displayName email')
      .populate('members', 'displayName email')
      .populate('hackathon', 'name');

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ team });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create team
router.post('/', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const hackathon = await Hackathon.findById(req.body.hackathonId);

    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }

    // Check if user is already in a team for this hackathon
    const existingTeam = await Team.findOne({
      hackathon: req.body.hackathonId,
      $or: [
        { leader: user._id },
        { members: user._id }
      ]
    });

    if (existingTeam) {
      return res.status(400).json({ error: 'Already part of a team for this hackathon' });
    }

    const team = new Team({
      name: req.body.name,
      hackathon: req.body.hackathonId,
      leader: user._id,
      members: [user._id],
      description: req.body.description,
      skills: req.body.skills,
      maxMembers: req.body.maxMembers || 4
    });

    await team.save();

    // Add team to hackathon
    hackathon.teams.push(team._id);
    await hackathon.save();

    const populatedTeam = await Team.findById(team._id)
      .populate('leader', 'displayName email')
      .populate('members', 'displayName email');

    res.status(201).json({ team: populatedTeam });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Join team
router.post('/:id/join', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const team = await Team.findById(req.params.id).populate('hackathon');

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Check if user is already in a team for this hackathon
    const existingTeam = await Team.findOne({
      hackathon: team.hackathon._id,
      $or: [
        { leader: user._id },
        { members: user._id }
      ]
    });

    if (existingTeam) {
      return res.status(400).json({ error: 'Already part of a team for this hackathon' });
    }

    if (team.members.length >= team.maxMembers) {
      return res.status(400).json({ error: 'Team is full' });
    }

    team.members.push(user._id);
    await team.save();

    const updatedTeam = await Team.findById(team._id)
      .populate('leader', 'displayName email')
      .populate('members', 'displayName email');

    res.json({ team: updatedTeam });
  } catch (error) {
    console.error('Join team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Leave team
router.post('/:id/leave', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.leader.toString() === user._id.toString()) {
      return res.status(400).json({ error: 'Team leader cannot leave the team' });
    }

    team.members = team.members.filter(member => member.toString() !== user._id.toString());
    await team.save();

    res.json({ message: 'Successfully left the team' });
  } catch (error) {
    console.error('Leave team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update team (leader only)
router.put('/:id', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.leader.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Only team leader can update the team' });
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    ).populate('leader', 'displayName email')
     .populate('members', 'displayName email');

    res.json({ team: updatedTeam });
  } catch (error) {
    console.error('Update team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
