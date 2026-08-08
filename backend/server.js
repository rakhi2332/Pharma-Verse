const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

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
app.use('/api/study-planner', studyPlannerRoutes);

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'PharmaVerse API is running' });
});

const Semester = require('./models/Semester');
const { seedPciSyllabus } = require('./seed');

// Database connection & Server initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pharmaverse';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to local MongoDB. Initializing In-Memory MongoDB...', err.message);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const inMemoryUri = mongoServer.getUri();
      await mongoose.connect(inMemoryUri);
      console.log('Connected to In-Memory MongoDB successfully!');
    } catch (memErr) {
      console.error('Failed to start In-Memory MongoDB:', memErr.message);
      return;
    }
  }

  try {
    const count = await Semester.countDocuments();
    if (count === 0) {
      console.log('Database empty. Seeding official PCI syllabus automatically...');
      await seedPciSyllabus(true);
    }
  } catch (seedErr) {
    console.error('Auto-seed check failed:', seedErr.message);
  }
}

connectDB();

