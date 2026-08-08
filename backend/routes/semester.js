const express = require('express');
const router = express.Router();
const Semester = require('../models/Semester');

// Get all semesters
router.get('/', async (req, res) => {
  try {
    const semesters = await Semester.find().sort('semesterNumber');
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single semester by ID
router.get('/:id', async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) return res.status(404).json({ message: 'Semester not found' });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create semester
router.post('/', async (req, res) => {
  const semester = new Semester({
    semesterNumber: req.body.semesterNumber,
    description: req.body.description
  });
  try {
    const newSemester = await semester.save();
    res.status(201).json(newSemester);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
