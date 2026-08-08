const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Semester', semesterSchema);
