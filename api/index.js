const express = require('express');

let app;
try {
  app = require('../backend/server.js');
} catch (err) {
  console.error('Error importing backend server module:', err.message);
  app = express();
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Fallback Vercel API operational' });
  });
}

module.exports = app;
