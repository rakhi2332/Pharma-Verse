const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Semester = require('../models/Semester');

const FALLBACK_SEMESTERS = [
  { _id: 'sem-1', semesterNumber: 1, title: 'Semester I', description: 'Human Anatomy & Physiology I, Pharmaceutical Analysis I, Pharmaceutics I, Inorganic Chemistry', year: 'Year 1' },
  { _id: 'sem-2', semesterNumber: 2, title: 'Semester II', description: 'Human Anatomy & Physiology II, Organic Chemistry I, Biochemistry, Pathophysiology', year: 'Year 1' },
  { _id: 'sem-3', semesterNumber: 3, title: 'Semester III', description: 'Organic Chemistry II, Physical Pharmaceutics I, Microbiology, Pharmaceutical Engineering', year: 'Year 2' },
  { _id: 'sem-4', semesterNumber: 4, title: 'Semester IV', description: 'Organic Chemistry III, Medicinal Chemistry I, Physical Pharmaceutics II, Pharmacology I, Pharmacognosy I', year: 'Year 2' },
  { _id: 'sem-5', semesterNumber: 5, title: 'Semester V', description: 'Medicinal Chemistry II, Industrial Pharmacy I, Pharmacology II, Pharmacognosy II, Jurisprudence', year: 'Third Year' },
  { _id: 'sem-6', semesterNumber: 6, title: 'Semester VI', description: 'Medicinal Chemistry III, Pharmacology III, Herbal Tech, Biopharmaceutics, Biotech, QA', year: 'Third Year' },
  { _id: 'sem-7', semesterNumber: 7, title: 'Semester VII', description: 'Instrumental Analysis, Industrial Pharmacy II, Pharmacy Practice, Novel Drug Delivery Systems', year: 'Final Year' },
  { _id: 'sem-8', semesterNumber: 8, title: 'Semester VIII', description: 'Biostatistics, Social & Preventive Pharmacy, Pharma Marketing & Management', year: 'Final Year' }
];

// Get all semesters
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbSemesters = await Semester.find().sort('semesterNumber');
      if (dbSemesters && dbSemesters.length > 0) {
        return res.json(dbSemesters);
      }
    }
    return res.json(FALLBACK_SEMESTERS);
  } catch (err) {
    return res.json(FALLBACK_SEMESTERS);
  }
});

// Get single semester by ID
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbSemester = await Semester.findById(req.params.id);
      if (dbSemester) return res.json(dbSemester);
    }
    const cleanNum = parseInt(String(req.params.id).replace(/\D/g, '')) || 1;
    const matched = FALLBACK_SEMESTERS.find(s => s.semesterNumber === cleanNum) || FALLBACK_SEMESTERS[0];
    return res.json(matched);
  } catch (err) {
    const cleanNum = parseInt(String(req.params.id).replace(/\D/g, '')) || 1;
    const matched = FALLBACK_SEMESTERS.find(s => s.semesterNumber === cleanNum) || FALLBACK_SEMESTERS[0];
    return res.json(matched);
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
