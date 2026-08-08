const express = require('express');
const router = express.Router();
const DailyChallenge = require('../models/DailyChallenge');
const Leaderboard = require('../models/Leaderboard');

// Curated pool of high-yield B.Pharm & GPAT daily challenge questions
const CHALLENGE_QUESTION_POOL = [
  {
    question: 'Which enzyme is inhibited by Clarithromycin, causing severe statin toxicity when co-administered with Simvastatin?',
    options: ['CYP2D6', 'CYP3A4', 'CYP2C9', 'CYP1A2'],
    correctAnswer: 1,
    explanation: 'Clarithromycin is a potent inhibitor of hepatic CYP3A4, causing up to a 10-fold increase in plasma concentrations of CYP3A4-metabolized statins like Simvastatin.',
    subject: 'Medicinal Chemistry'
  },
  {
    question: 'According to PCI B.Pharm Pharmacopoeia, which indicator is used in the complexometric titration of Calcium Gluconate?',
    options: ['Mordant Black II (Eriochrome Black T)', 'Calcon carboxylic acid (NN Indicator)', 'Phenolphthalein', 'Methyl Orange'],
    correctAnswer: 1,
    explanation: 'Calcon carboxylic acid (NN indicator) is specified by IP/BP for calcium determination with disodium edetate at pH 12 - 13.',
    subject: 'Pharmaceutical Analysis'
  },
  {
    question: 'Which receptor subtype mediates cardiac acceleration and increased myocardial contractility when stimulated by Isoproterenol?',
    options: ['Alpha-1 Adrenoceptor', 'Beta-1 Adrenoceptor', 'Beta-2 Adrenoceptor', 'Muscarinic M2 Receptor'],
    correctAnswer: 1,
    explanation: 'Beta-1 adrenoceptors are predominantly located in cardiac tissue. Activation leads to Gs protein coupling, adenylyl cyclase stimulation, cAMP elevation, and increased heart rate/contractility.',
    subject: 'Pharmacology'
  },
  {
    question: 'In physical pharmaceutics, which equation describes the rate of drug dissolution from solid dosage forms under sink conditions?',
    options: ['Noyes-Whitney Equation', 'Fick\'s First Law of Diffusion', 'Henderson-Hasselbalch Equation', 'Arrhenius Accelerated Stability Equation'],
    correctAnswer: 0,
    explanation: 'The Noyes-Whitney equation dC/dt = (D * S / h) * (Cs - C) defines the rate of dissolution of solid drug particles under sink conditions.',
    subject: 'Pharmaceutics'
  },
  {
    question: 'What is the characteristic heterocyclic ring present in the structure of Metronidazole?',
    options: ['1,3-Thiazole', '5-Nitroimidazole', 'Indole', 'Benzimidazole'],
    correctAnswer: 1,
    explanation: 'Metronidazole contains a 5-nitroimidazole core ring responsible for producing nitro anion free radicals under anaerobic reduction.',
    subject: 'Medicinal Chemistry'
  },
  {
    question: 'Which antidote is administered in acute Digoxin cardiac glycoside toxicity to bind free serum digoxin?',
    options: ['N-acetylcysteine', 'Pralidoxime (2-PAM)', 'Digoxin Immune Fab (Digibind)', 'Flumazenil'],
    correctAnswer: 2,
    explanation: 'Digoxin Immune Fab (Digibind) contains antigen-binding fragments that rapidly sequester free serum digoxin molecules, reversing digitalis toxicity.',
    subject: 'Pharmacology & Clinical Pharmacy'
  },
  {
    question: 'In tablet manufacturing, which phenomenon refers to the partial or complete separation of the top or bottom crown of a tablet from the main body?',
    options: ['Lamination', 'Capping', 'Mottling', 'Picking'],
    correctAnswer: 1,
    explanation: 'Capping is the partial or complete separation of the top or bottom crown of a tablet from the main body during compression or ejection.',
    subject: 'Pharmaceutics & Industrial Pharmacy'
  }
];

// Helper to get today's date formatted as YYYY-MM-DD
const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

// Seed initial leaderboard if empty
const seedInitialLeaderboard = async () => {
  const count = await Leaderboard.countDocuments();
  if (count === 0) {
    const dummyRankers = [
      { studentName: 'Aarav Sharma', college: 'NIPER Mohali', semester: 6, xpPoints: 850, streakDays: 14, challengesCompleted: 17, badge: 'GPAT Grandmaster' },
      { studentName: 'Priya Patel', college: 'Bombay College of Pharmacy', semester: 4, xpPoints: 720, streakDays: 11, challengesCompleted: 14, badge: 'Pharmacology Master' },
      { studentName: 'Rahul Verma', college: 'Delhi Pharmaceutical Sciences University', semester: 8, xpPoints: 640, streakDays: 9, challengesCompleted: 12, badge: 'Pharmaceutics Wizard' },
      { studentName: 'Ananya Reddy', college: 'Kakatiya University College of Pharmaceutical Sciences', semester: 6, xpPoints: 590, streakDays: 8, challengesCompleted: 10, badge: 'Med Chem Scholar' },
      { studentName: 'Vikram Singh', college: 'JSS College of Pharmacy Ooty', semester: 4, xpPoints: 510, streakDays: 6, challengesCompleted: 9, badge: 'Streak Warrior' }
    ];
    await Leaderboard.insertMany(dummyRankers);
    console.log('Seeded initial student leaderboard.');
  }
};

// GET /api/challenges/today - Get today's daily challenge
router.get('/today', async (req, res) => {
  try {
    const todayStr = getTodayString();
    let challenge = await DailyChallenge.findOne({ date: todayStr });

    if (!challenge) {
      // Pick 5 questions from pool
      const shuffled = [...CHALLENGE_QUESTION_POOL].sort(() => 0.5 - Math.random());
      const selectedQs = shuffled.slice(0, 5);

      challenge = await DailyChallenge.create({
        date: todayStr,
        title: `Daily B.Pharm & GPAT Challenge (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`,
        subject: 'Pharmacology, Pharmaceutics & Med Chem',
        xpReward: 50,
        questions: selectedQs
      });
    }

    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch today\'s daily challenge.' });
  }
});

// POST /api/challenges/submit - Submit answers and update student XP/Leaderboard
router.post('/submit', async (req, res) => {
  try {
    const { challengeId, answers, studentName, college, semester } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ error: 'Answers payload is required.' });
    }

    const challenge = await DailyChallenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found.' });
    }

    let correctCount = 0;
    const questionResults = challenge.questions.map((q, idx) => {
      const userAns = answers[idx];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionIndex: idx,
        question: q.question,
        userAnswer: userAns,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const earnedXp = correctCount * 10 + (correctCount === challenge.questions.length ? 20 : 0); // Bonus 20 XP for 100%
    const name = studentName && studentName.trim() ? studentName.trim() : 'Anonymous Scholar';

    await seedInitialLeaderboard();

    // Update or create Leaderboard entry for student
    let leaderEntry = await Leaderboard.findOne({ studentName: name });
    if (leaderEntry) {
      leaderEntry.xpPoints += earnedXp;
      leaderEntry.streakDays += 1;
      leaderEntry.challengesCompleted += 1;
      if (leaderEntry.xpPoints > 700) leaderEntry.badge = 'GPAT Grandmaster';
      else if (leaderEntry.xpPoints > 500) leaderEntry.badge = 'Pharmacology Master';
      else if (leaderEntry.xpPoints > 300) leaderEntry.badge = 'Streak Warrior';
      await leaderEntry.save();
    } else {
      leaderEntry = await Leaderboard.create({
        studentName: name,
        college: college || 'PCI Pharmacy College',
        semester: semester || 4,
        xpPoints: earnedXp,
        streakDays: 1,
        challengesCompleted: 1,
        badge: earnedXp >= 50 ? 'Streak Warrior' : 'Pharma Scholar'
      });
    }

    res.json({
      score: correctCount,
      totalQuestions: challenge.questions.length,
      earnedXp,
      bonusAwarded: correctCount === challenge.questions.length,
      questionResults,
      studentRankData: leaderEntry
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit challenge.' });
  }
});

// GET /api/challenges/leaderboard - Get top leaderboard rankers
router.get('/leaderboard', async (req, res) => {
  try {
    await seedInitialLeaderboard();
    const rankers = await Leaderboard.find().sort({ xpPoints: -1 }).limit(20);
    res.json(rankers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch leaderboard.' });
  }
});

module.exports = router;
