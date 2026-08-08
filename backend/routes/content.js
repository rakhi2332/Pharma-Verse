const express = require('express');
const router = express.Router();
const Content = require('../models/Content');

// Get content by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const content = await Content.find({ subject: req.params.subjectId });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create content
router.post('/', async (req, res) => {
  const content = new Content({
    title: req.body.title,
    type: req.body.type,
    subject: req.body.subjectId,
    url: req.body.url,
    description: req.body.description,
    uploadedBy: req.body.userId // Usually from auth middleware
  });
  try {
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
