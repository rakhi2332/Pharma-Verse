const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  college: { type: String, default: 'PCI Pharmacy College' },
  semester: { type: Number, default: 4 },
  xpPoints: { type: Number, default: 0 },
  streakDays: { type: Number, default: 1 },
  challengesCompleted: { type: Number, default: 0 },
  badge: { type: String, default: 'Pharma Scholar' },
  avatarUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
