const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Disable Mongoose command buffering in serverless/offline environments
mongoose.set('bufferCommands', false);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const authRoutes = require('./routes/auth');
const semesterRoutes = require('./routes/semester');
const subjectRoutes = require('./routes/subject');
const contentRoutes = require('./routes/content');
const aiTutorRoutes = require('./routes/aiTutor');
const gpatRoutes = require('./routes/gpat');
const drugInteractionRoutes = require('./routes/drugInteraction');
const challengesRoutes = require('./routes/challenges');
const diseaseMapsRoutes = require('./routes/diseaseMaps');
const medicineScannerRoutes = require('./routes/medicineScanner');
const studyPlannerRoutes = require('./routes/studyPlanner');

app.use('/api/auth', authRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ai-tutor', aiTutorRoutes);
app.use('/api/gpat', gpatRoutes);
app.use('/api/drug-interaction', drugInteractionRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/disease-maps', diseaseMapsRoutes);
app.use('/api/medicine-scanner', medicineScannerRoutes);
app.use('/api/pill-scanner', medicineScannerRoutes);
app.use('/api/study-planner', studyPlannerRoutes);

// Basic Route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PharmaVerse API is running' });
});

const Semester = require('./models/Semester');

// Database connection & Server initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Only listen if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function connectDB() {
  if (!MONGO_URI) {
    console.log('No MONGO_URI provided. Server operating in standalone mode.');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
}

connectDB();

module.exports = app;
