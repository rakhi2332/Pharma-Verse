const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subject = require('./models/Subject');
const Content = require('./models/Content');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pharmaverse';

async function clearAllSubjects() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    const deletedSubjects = await Subject.deleteMany({});
    console.log(`✓ Removed ${deletedSubjects.deletedCount} subjects across all semesters.`);

    const deletedContent = await Content.deleteMany({});
    console.log(`✓ Removed ${deletedContent.deletedCount} content items and PDFs.`);

    console.log('\n✅ Successfully removed all subjects and content from all semesters!');
    process.exit(0);
  } catch (err) {
    console.error('Error clearing subjects:', err);
    process.exit(1);
  }
}

clearAllSubjects();
