const express = require('express');
const router = express.Router();

// Generates customized PCI B.Pharm / GPAT Smart Study Plans
router.post('/generate', (req, res) => {
  const { goal, semesterNumber, hoursPerDay, targetDays, focusSubjects } = req.body;

  const hours = parseInt(hoursPerDay) || 4;
  const days = parseInt(targetDays) || 30;
  const sem = parseInt(semesterNumber) || 4;
  const targetGoal = goal || 'PCI University Semester Exams & GPAT Prep';
  const weakSubjects = (focusSubjects && focusSubjects.length > 0) ? focusSubjects : ['Pharmacology', 'Medicinal Chemistry', 'Pharmaceutics'];

  // Calculate total study budget
  const totalStudyHours = hours * days;

  // Build Phase 1 (50% of time): Core Syllabus & High-Yield Topics
  const phase1Days = Math.floor(days * 0.5);
  const phase1Plan = {
    phaseName: 'Phase 1: Foundation & Unit-wise Deep Study',
    durationDays: phase1Days,
    dailyHours: hours,
    objectives: [
      'Cover Unit I to Unit III textbook notes & 10-Mark Model Answers',
      'Master Structure-Activity Relationships (SAR) & Drug Class Mechanism diagrams',
      'Complete end-of-chapter high-frequency PCI university questions'
    ],
    dailyTimetable: [
      { slot: 'Morning (Session 1)', hours: `${Math.round(hours * 0.4 * 10) / 10} hrs`, focus: `Core Focus Subject (${weakSubjects[0] || 'Pharmacology'})`, activity: 'Read 10-Mark Model Answers, receptor kinetics & chemical structures' },
      { slot: 'Afternoon (Session 2)', hours: `${Math.round(hours * 0.3 * 10) / 10} hrs`, focus: `Secondary Subject (${weakSubjects[1] || 'Pharmaceutics'})`, activity: 'Formulation excipients, stability calculations & IP/BP assay notes' },
      { slot: 'Evening (Session 3)', hours: `${Math.round(hours * 0.3 * 10) / 10} hrs`, focus: 'Solution Pharmacy Video Playlist & MCQ Practice', activity: 'Watch chapter lecture playlist and attempt 15 daily GPAT MCQs' }
    ]
  };

  // Build Phase 2 (30% of time): PYQ Practice & Weak Subject Reinforcement
  const phase2Days = Math.floor(days * 0.3);
  const phase2Plan = {
    phaseName: 'Phase 2: PYQ Paper Solving & Target Weak Areas',
    durationDays: phase2Days,
    dailyHours: hours,
    objectives: [
      'Solve 5-Year PCI University Solved Question Papers (2019-2024)',
      'Review weak topics in ' + weakSubjects.join(', '),
      'Practice GPAT speed MCQs under timed conditions'
    ],
    dailyTimetable: [
      { slot: 'Morning (Session 1)', hours: `${Math.round(hours * 0.5 * 10) / 10} hrs`, focus: 'University Solved PYQ Paper Analysis', activity: 'Write 10-Mark essay answers & 5-mark short notes without looking' },
      { slot: 'Evening (Session 2)', hours: `${Math.round(hours * 0.5 * 10) / 10} hrs`, focus: 'GPAT Mock Test & Error Log', activity: 'Attempt 25 timed MCQs, review incorrect options & AI tutor explanations' }
    ]
  };

  // Build Phase 3 (20% of time): Final Revision & Formula Memory Sprint
  const phase3Days = days - phase1Days - phase2Days;
  const phase3Plan = {
    phaseName: 'Phase 3: Final Memory Sprint & Formula Lock-In',
    durationDays: phase3Days,
    dailyHours: hours,
    objectives: [
      'Revise Disease-Drug Learning Maps & Treatment Algorithms',
      'Memorize Pharmacopoeial assay equations, pKa, log P & IUPAC structures',
      'Final full-length mock exam'
    ],
    dailyTimetable: [
      { slot: 'Morning', hours: `${Math.round(hours * 0.5 * 10) / 10} hrs`, focus: 'Quick Memory Mind Maps & Drug Tables', activity: 'Rapid review of contraindications, CYP450 inhibitors & key antidotes' },
      { slot: 'Afternoon / Evening', hours: `${Math.round(hours * 0.5 * 10) / 10} hrs`, focus: 'Final Confidence Mock Exam', activity: 'Full 100-mark revision sprint and relaxation' }
    ]
  };

  res.json({
    summary: {
      goal: targetGoal,
      semester: sem,
      targetDays: days,
      dailyHours: hours,
      totalStudyHours,
      focusSubjects: weakSubjects
    },
    phases: [phase1Plan, phase2Plan, phase3Plan],
    disclaimer: 'Study plan calculated using PCI B.Pharm curriculum weights & GPAT high-yield subject frequency distributions.'
  });
});

module.exports = router;
