const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // 0-indexed
  explanation: { type: String, required: true },
  subject: { type: String, default: 'Pharmacology' }
});

const dailyChallengeSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  title: { type: String, required: true },
  subject: { type: String, default: 'B.Pharm High-Yield Challenge' },
  xpReward: { type: Number, default: 50 },
  questions: [questionSchema]
}, { timestamps: true });

module.exports = mongoose.model('DailyChallenge', dailyChallengeSchema);
