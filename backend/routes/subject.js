const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Get single subject by ID
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get subjects by semester
router.get('/semester/:semesterId', async (req, res) => {
  try {
    const subjects = await Subject.find({ semester: req.params.semesterId });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create subject
router.post('/', async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    semester: req.body.semesterId,
    description: req.body.description,
    code: req.body.code
  });
  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
