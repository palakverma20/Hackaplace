const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxMembers: { type: Number, default: 4 },
  description: String,
  skills: [String],
  status: { type: String, enum: ['forming', 'complete', 'disbanded'], default: 'forming' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', teamSchema);
