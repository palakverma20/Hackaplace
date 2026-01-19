const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  mode: { type: String, enum: ['online', 'offline', 'hybrid'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  teamType: { type: String, required: true },
  description: { type: String, required: true },
  problemDomains: [String],
  prizes: [String],
  rules: String,
  eligibility: String,
  evaluationCriteria: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
