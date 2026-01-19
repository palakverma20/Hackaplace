const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  hackathon: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  title: { type: String, required: true },
  description: String,
  githubUrl: String,
  demoUrl: String,
  files: [{
    name: String,
    url: String,
    type: String
  }],
  status: { type: String, enum: ['submitted', 'under_review', 'approved', 'rejected'], default: 'submitted' },
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
