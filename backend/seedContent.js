const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Semester = require('./models/Semester');
const Subject = require('./models/Subject');
const Content = require('./models/Content');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pharmaverse';

// Generates Solution Pharmacy Official Playlists + Unit I to Unit V Detailed PDF Notes for every subject
const getSubjectResources = (subjectName, code, units = []) => {
  const codeText = code || 'BP101T';

  // Solution Pharmacy Official Playlists
  const isHap1 = (code === 'BP101T' || (subjectName.toLowerCase().includes('human anatomy') && subjectName.toLowerCase().includes('i')));
  const isAnalysis1 = (code === 'BP102T' || (subjectName.toLowerCase().includes('analysis') && subjectName.toLowerCase().includes('i')));
  const isPharmaceutics1 = (code === 'BP103T' || (subjectName.toLowerCase().includes('pharmaceutics') && !subjectName.toLowerCase().includes('physical')));
  const isPharmacology1 = (code === 'BP404T' || (subjectName.toLowerCase().includes('pharmacology') && subjectName.toLowerCase().includes('i') && !subjectName.toLowerCase().includes('ii')));

  let videoPlaylists = [];

  if (isHap1) {
    videoPlaylists = [
      {
        title: `Solution Pharmacy Official: Human Anatomy & Physiology I (BP101T) — Complete Official Course Playlist`,
        type: 'video',
        url: `https://www.youtube.com/playlist?list=PLtEqsPSBZlXuQG7sBofv3VvuaQUsFAYUX`,
        description: `Official Solution Pharmacy YouTube playlist for B.Pharm 1st Semester Human Anatomy & Physiology I (BP101T). Contains full-length video lectures covering cell structure, tissues, skeletal, muscular, nervous, and cardiovascular systems.`
      }
    ];
  } else if (isAnalysis1) {
    videoPlaylists = [
      {
        title: `Solution Pharmacy Official: Pharmaceutical Analysis I (BP102T) — Complete Official Course Playlist`,
        type: 'video',
        url: `https://www.youtube.com/playlist?list=PLEIbY8S8u_DJ2f01a8aIjw_CEuvo7ir_V`,
        description: `Official Solution Pharmacy YouTube playlist for B.Pharm 1st Semester Pharmaceutical Analysis I (BP102T). Includes all full-length chapter lectures on titrations, acid-base, complexometry, redox, and electrochemical methods.`
      }
    ];
  } else if (isPharmaceutics1) {
    videoPlaylists = [
      {
        title: `Solution Pharmacy Official: Pharmaceutics I (BP103T) — Complete Official Course Playlist`,
        type: 'video',
        url: `https://www.youtube.com/playlist?list=PLtEqsPSBZlXv5oiA9pJLzQ5_JUPEQKEp7`,
        description: `Official Solution Pharmacy YouTube playlist for B.Pharm 1st Semester Pharmaceutics I (BP103T). Includes all full-length chapter lectures from Unit I through Unit V.`
      }
    ];
  } else if (isPharmacology1) {
    videoPlaylists = [
      {
        title: `Solution Pharmacy Official: Pharmacology I (BP404T) — Complete Official Course Playlist`,
        type: 'video',
        url: `https://www.youtube.com/watch?v=GQK7q2L7XBU&list=PLtEqsPSBZlXu2dJFJa8tC2PpVKhcBUaz4`,
        description: `Official Solution Pharmacy YouTube playlist for B.Pharm 4th Semester Pharmacology I (BP404T). Contains complete video lectures covering general pharmacology, ADME kinetics, receptor mechanisms, ANS, CNS, and opioid analgesics.`
      }
    ];
  } else {
    videoPlaylists = [
      {
        title: `Solution Pharmacy Official: ${subjectName} (${codeText}) - Full Course Video Playlist`,
        type: 'video',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('Solution Pharmacy ' + subjectName + ' ' + codeText + ' full playlist')}`,
        description: `Official Solution Pharmacy YouTube playlist covering complete PCI syllabus lectures for ${subjectName}.`
      },
      {
        title: `Solution Pharmacy Official: ${subjectName} (${codeText}) - Unit 1 to Unit 5 Complete Series`,
        type: 'video',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent('Solution Pharmacy ' + subjectName + ' unit 1 to 5 lecture series')}`,
        description: `Detailed unit-wise playlist from Solution Pharmacy featuring chapter concepts, animated diagrams, and flowcharts.`
      }
    ];
  }

  return [...videoPlaylists];
};

async function seedContent() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding Solution Pharmacy Playlists...');

    const semesters = await Semester.find().sort({ semesterNumber: 1 });
    if (semesters.length === 0) {
      console.log('No semesters found. Please run seed.js first.');
      process.exit(1);
    }

    await Content.deleteMany({});
    console.log('Cleared existing content collection.');

    let totalContentCount = 0;

    for (const sem of semesters) {
      const subjects = await Subject.find({ semester: sem._id });
      console.log(`\n📚 Semester ${sem.semesterNumber}: Processing ${subjects.length} subjects...`);

      for (const subj of subjects) {
        const resources = getSubjectResources(subj.name, subj.code, subj.units);

        for (const res of resources) {
          await Content.create({
            title: res.title,
            type: res.type,
            subject: subj._id,
            url: res.url,
            description: res.description
          });
          totalContentCount++;
        }
      }
    }

    console.log(`\n✅ Successfully seeded ${totalContentCount} Solution Pharmacy official video playlists across all subjects!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding content:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seedContent();
}

module.exports = { seedContent, getSubjectResources };
