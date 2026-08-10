const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Content = require('../models/Content');

// Get content by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const content = await Content.find({ subject: req.params.subjectId });
      return res.json(content);
    }
    return res.json([]);
  } catch (err) {
    return res.json([]);
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
