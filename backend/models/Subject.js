const mongoose = require('mongoose');

const topicDetailSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  answer: { type: String, required: true },
  chemicalStructureNotes: { type: String },
  mechanismDetails: { type: String },
  pharmacokineticsData: { type: String },
  formulationAndQC: { type: String },
  gpatHighYield: { type: String },
  pdfUrl: { type: String },
  keyTakeaways: [{ type: String }],
  examTip: { type: String },
  videoUrl: { type: String }
});

const unitSchema = new mongoose.Schema({
  unitNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  topics: [{ type: String }],
  topicDetails: [topicDetailSchema]
});

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  semester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Semester',
    required: true,
  },
  description: {
    type: String,
  },
  code: {
    type: String,
  },
  units: [unitSchema]
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);
