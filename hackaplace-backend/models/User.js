const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  role: { type: String, enum: ['participant', 'organizer', 'judge', 'admin'], default: 'participant' },
  profile: {
    avatar: String,
    bio: String,
    skills: [String],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
