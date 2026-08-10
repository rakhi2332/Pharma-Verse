import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Activity, CheckCircle2, XCircle, HelpCircle, Award, BookOpen, 
  Clock, RotateCcw, ArrowRight, Sparkles, Filter, Copy, Check, Search, Loader2, Play, Flame, ShieldAlert, HeartPulse, Pill, TestTube, Atom, Leaf, Dna, FileText
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../apiConfig';

const FALLBACK_SUBJECTS = [
  { id: 'all', name: 'All Subjects', count: 45 },
  { id: 'pharmacology', name: 'Pharmacology', count: 6 },
  { id: 'pharmaceutics', name: 'Pharmaceutics', count: 6 },
  { id: 'medchem', name: 'Medicinal Chemistry', count: 6 },
  { id: 'pharmacognosy', name: 'Pharmacognosy', count: 5 },
  { id: 'analysis', name: 'Pharmaceutical Analysis', count: 4 },
  { id: 'biochem', name: 'Biochemistry & Biotech', count: 4 },
  { id: 'jurisprudence', name: 'Pharma Jurisprudence', count: 4 },
  { id: 'microbiology', name: 'Microbiology', count: 4 },
  { id: 'physical_pharmacy', name: 'Physical Pharmacy', count: 3 },
  { id: 'pathophysiology', name: 'Pathophysiology & Clinical', count: 3 }
];

const FALLBACK_MCQS = [
  {
    id: 1,
    subject: 'pharmacology',
    question: 'Which of the following NSAIDs causes IRREVERSIBLE inhibition of the Cyclooxygenase (COX) enzyme?',
    options: ['Ibuprofen', 'Aspirin', 'Diclofenac', 'Indomethacin'],
    correctAnswer: 1,
    explanation: 'Aspirin (Acetylsalicylic acid) acetylates the serine-530 residue of COX-1 and serine-516 of COX-2 irreversibly. Other NSAIDs are reversible competitive inhibitors.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 2,
    subject: 'pharmacology',
    question: 'Enalapril is an ACE inhibitor prodrug. What is its active metabolite form?',
    options: ['Enalaprilat', 'Enalapril Acid', 'Enalapril Lactone', 'Enalapril Glucuronide'],
    correctAnswer: 0,
    explanation: 'Enalapril is an ethyl ester prodrug which undergoes hepatic esterase hydrolysis to form Enalaprilat, the active ACE inhibitor.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  },
  {
    id: 3,
    subject: 'pharmaceutics',
    question: 'According to the BCS Classification, drugs belonging to Class II exhibit:',
    options: [
      'High Solubility, High Permeability',
      'Low Solubility, High Permeability',
      'High Solubility, Low Permeability',
      'Low Solubility, Low Permeability'
    ],
    correctAnswer: 1,
    explanation: 'BCS Class II drugs (e.g., Nifedipine, Carbamazepine) have low aqueous solubility but high intestinal permeability. Their absorption is limited by dissolution rate.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 4,
    subject: 'pharmaceutics',
    question: 'Which superdisintegrant is chemically known as Cross-linked Sodium Carboxymethyl Cellulose?',
    options: ['Crospovidone', 'Sodium Starch Glycolate', 'Croscarmellose Sodium', 'Avicel PH 102'],
    correctAnswer: 2,
    explanation: 'Croscarmellose Sodium (Ac-Di-Sol) is cross-linked sodium CMC, widely used as a superdisintegrant in solid oral dosage forms.',
    difficulty: 'Easy',
    year: 'GPAT 2020'
  },
  {
    id: 5,
    subject: 'medchem',
    question: 'Morphine belongs to which class of alkaloids based on its chemical skeleton?',
    options: ['Indole alkaloid', 'Phenanthrene alkaloid', 'Isoquinoline alkaloid', 'Tropane alkaloid'],
    correctAnswer: 1,
    explanation: 'Morphine, Codeine, and Thebaine contain a phenanthrene ring nucleus, classifying them as phenanthrene morphinan alkaloids.',
    difficulty: 'Medium',
    year: 'GPAT 2021'
  },
  {
    id: 6,
    subject: 'pharmacognosy',
    question: 'Keller-Kiliani test is a specific color reaction test for identifying:',
    options: ['Anthraquinone glycosides', 'Digitoxose sugar in Cardiac glycosides', 'Tropane alkaloids', 'Flavonoids'],
    correctAnswer: 1,
    explanation: 'Keller-Kiliani test produces a reddish-brown ring turning blue-green at the junction, specific for 2-deoxy sugars like Digitoxose present in Digitalis cardiac glycosides.',
    difficulty: 'Hard',
    year: 'GPAT 2019'
  },
  {
    id: 7,
    subject: 'pharmacology',
    question: 'Which of the following beta-blockers has intrinsic sympathomimetic activity (ISA)?',
    options: ['Propranolol', 'Pindolol', 'Atenolol', 'Timolol'],
    correctAnswer: 1,
    explanation: 'Pindolol and Acebutolol possess partial agonist activity (ISA), producing less resting bradycardia compared to pure beta-blockers.',
    difficulty: 'Hard',
    year: 'GPAT 2023'
  },
  {
    id: 8,
    subject: 'medchem',
    question: 'Omeprazole undergoes acid-catalyzed conversion in parietal cells to form active:',
    options: ['Sulfenamide intermediate', 'Sulfone derivative', 'Sulfide metabolite', 'Thiol conjugate'],
    correctAnswer: 0,
    explanation: 'Omeprazole is a prodrug activated at acidic pH (<4) into a reactive tetracyclic sulfenamide, which covalently binds to H+/K+ ATPase.',
    difficulty: 'Hard',
    year: 'GPAT 2022'
  },
  {
    id: 9,
    subject: 'pharmacology',
    question: 'In organophosphate insecticide poisoning, which specific reactivator is administered to regenerate acetylcholinesterase?',
    options: ['Atropine Sulfate', 'Pralidoxime (2-PAM)', 'Physostigmine', 'Neostigmine'],
    correctAnswer: 1,
    explanation: 'Pralidoxime (2-PAM) nucleophilically attacks organophosphate-inhibited acetylcholinesterase to regenerate the active enzyme before aging occurs.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 10,
    subject: 'pharmaceutics',
    question: 'According to USP, Apparatus 1 and Apparatus 2 for dissolution testing correspond to:',
    options: [
      'Basket Apparatus and Paddle Apparatus',
      'Paddle Apparatus and Basket Apparatus',
      'Reciprocating Cylinder and Flow-through Cell',
      'Paddle over Disk and Rotating Cylinder'
    ],
    correctAnswer: 0,
    explanation: 'USP Dissolution Apparatus 1 is the Rotating Basket, while USP Apparatus 2 is the Paddle Apparatus.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  }
];

const FALLBACK_NOTES = [
  {
    title: 'Noyes-Whitney Dissolution Rate Equation',
    subject: 'Pharmaceutics',
    formula: 'dC/dt = (D * A * (Cs - C)) / h',
    summary: 'Governs the rate of solid drug dissolution in biological fluids. D = Diffusion coefficient, A = Surface area of drug particles, Cs = Saturation solubility, C = Bulk concentration, h = Diffusion layer thickness.'
  },
  {
    title: 'Henderson-Hasselbalch Ionization Equation',
    subject: 'Biopharmaceutics & Physical Pharmacy',
    formula: 'pH = pKa + log([Ionized] / [Unionized]) (Weak Acids)',
    summary: 'Calculates the degree of ionization at physiological pH. Unionized drug lipid-soluble and absorbed across membranes. Weak acids ionize in basic media (pH > pKa); weak bases ionize in acidic media (pH < pKa).'
  },
  {
    title: 'Pharmacokinetic Clearance & Half-Life Formulas',
    subject: 'Pharmacology & Biopharmaceutics',
    formula: 'Cl = Vd * Kel  |  t1/2 = 0.693 / Kel = (0.693 * Vd) / Cl',
    summary: 'Clearance (Cl) measures volume of plasma cleared of drug per unit time. Elimination half-life (t1/2) is directly proportional to Volume of Distribution (Vd) and inversely proportional to Clearance (Cl).'
  },
  {
    title: 'Beer-Lambert Absorbance Spectrophotometry Law',
    subject: 'Pharmaceutical Analysis',
    formula: 'A = ε * b * c = A(1%, 1cm) * b * c',
    summary: 'Absorbance (A) is directly proportional to molar absorptivity (ε), cuvette path length (b in cm), and sample concentration (c). Used for UV-Vis assay calculations of active raw materials and finished tablets.'
  },
  {
    title: 'Young’s, Dilling’s & Fried’s Pediatric Dose Calculations',
    subject: 'Posology & Dispensing',
    formula: 'Young: Dose = (Age / (Age + 12)) * Adult Dose  |  Dilling: Dose = (Age / 20) * Adult Dose',
    summary: 'Classical mathematical formulas for adjusting adult dosages for pediatric patients based on age. Fried’s rule (Age in months / 150) applies specifically for infants under 1 year.'
  },
  {
    title: 'Griffin’s HLB Scale & Surfactant Emulsion Formula',
    subject: 'Physical Pharmaceutics',
    formula: 'Required HLB = (HLBa * Wta + HLBb * Wtb) / (Wta + Wtb)',
    summary: 'Hydrophile-Lipophile Balance scale (1-20). HLB 3-6 = W/O emulsifier, HLB 8-16 = O/W emulsifier, HLB 13-15 = Detergent, HLB 16-18 = Solubilizing agent.'
  }
];

export default function GpatPrep() {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' | 'mock' | 'notes'
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState(FALLBACK_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [mcqs, setMcqs] = useState(FALLBACK_MCQS);

  // Practice state
  const [userAnswers, setUserAnswers] = useState({});

  // Mock test state
  const [mockAnswers, setMockAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [timer, setTimer] = useState(600);
  const [timerActive, setTimerActive] = useState(false);

  // High-Yield Notes & Formula State
  const [notes, setNotes] = useState(FALLBACK_NOTES);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [notesFilter, setNotesFilter] = useState('all');
  const [notesSearch, setNotesSearch] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchMcqs(selectedSubject);
  }, [selectedSubject]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timer > 0 && !testSubmitted) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive && !testSubmitted) {
      handleTestSubmit();
    }
    return () => clearInterval(interval);
  }, [timerActive, timer, testSubmitted]);

  const fetchInitialData = async () => {
    try {
      const [subRes, notesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/gpat/subjects`, { timeout: 2000 }).catch(() => null),
        axios.get(`${API_BASE_URL}/gpat/notes`, { timeout: 2000 }).catch(() => null)
      ]);
      if (subRes?.data?.subjects) setSubjects(subRes.data.subjects);
      if (notesRes?.data?.notes) setNotes(notesRes.data.notes);
    } catch (err) {
      console.warn('Backend API disconnected. Using offline GPAT fallback data.');
    }
  };

  const fetchMcqs = async (subject) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/gpat/mcqs?subject=${subject}`, { timeout: 2000 });
      if (res.data?.mcqs && res.data.mcqs.length > 0) {
        setMcqs(res.data.mcqs);
        return;
      }
    } catch (err) {
      console.warn('Failed to fetch API MCQs, filtering client fallback MCQs...');
    }

    if (subject === 'all') {
      setMcqs(FALLBACK_MCQS);
    } else {
      const filtered = FALLBACK_MCQS.filter(m => m.subject === subject);
      setMcqs(filtered.length > 0 ? filtered : FALLBACK_MCQS);
    }
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (userAnswers[qId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleMockSelect = (qId, optionIdx) => {
    if (testSubmitted) return;
    setMockAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const startMockTest = () => {
    setMockAnswers({});
    setTestSubmitted(false);
    setTestResult(null);
    setTimer(600);
    setTimerActive(true);
    setActiveTab('mock');
  };

  const handleTestSubmit = async () => {
    setTimerActive(false);
    const answersPayload = mcqs.map(q => ({
      questionId: q.id,
      selectedOption: mockAnswers[q.id] !== undefined ? mockAnswers[q.id] : null
    }));

    try {
      const res = await axios.post(`${API_BASE_URL}/gpat/submit`, { answers: answersPayload }, { timeout: 2000 });
      if (res.data && res.data.success) {
        setTestResult(res.data);
        setTestSubmitted(true);
        return;
      }
    } catch (err) {
      console.warn('Evaluating GPAT test locally...');
    }

    // Local GPAT Scoring Engine (+4 for correct, -1 for wrong)
    let score = 0;
    const totalQuestions = mcqs.length;
    const results = mcqs.map(q => {
      const userOpt = mockAnswers[q.id] !== undefined ? mockAnswers[q.id] : null;
      const isCorrect = userOpt === q.correctAnswer;
      if (isCorrect) score += 4;
      else if (userOpt !== null && userOpt !== undefined) score -= 1;

      return {
        questionId: q.id,
        question: q.question,
        userOption: userOpt,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const maxScore = totalQuestions * 4;
    const percentage = Math.max(0, Math.round((score / maxScore) * 100));

    setTestResult({
      success: true,
      score,
      maxScore,
      percentage,
      totalQuestions,
      results
    });
    setTestSubmitted(true);
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyFormula = (formulaStr, index) => {
    navigator.clipboard.writeText(formulaStr);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredNotes = notes.filter(n => {
    const matchesFilter = notesFilter === 'all' || n.subject.toLowerCase().includes(notesFilter.toLowerCase());
    const matchesSearch = notesSearch === '' || 
      n.title.toLowerCase().includes(notesSearch.toLowerCase()) || 
      n.summary.toLowerCase().includes(notesSearch.toLowerCase()) ||
      n.formula.toLowerCase().includes(notesSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <Navbar />

      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-background text-white pt-16 pb-16 px-6 lg:px-12 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1.5 inline-flex">
              <Sparkles className="w-4 h-4 text-amber-300" /> NTA GPAT 2025 Comprehensive Preparation Hub
            </span>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              GPAT Exam Masterclass & PYQ Bank
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Subject-wise NTA standard MCQs, timed full-length mock tests with standard +4/-1 negative marking, detailed explanations, and high-yield formula cheat sheets.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" /> Practice MCQs
            </button>
            <button
              onClick={startMockTest}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'mock'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" /> Timed Mock Test
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Formula Cheat Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">

        {/* TAB 1: PRACTICE MODE */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            
            {/* Subject Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedSubject === s.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s.name} ({s.count})
                </button>
              ))}
            </div>

            {/* MCQ List */}
            <div className="space-y-6">
              {mcqs.map((q, qIdx) => {
                const selectedOpt = userAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                          {qIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {q.subject} • {q.year}
                        </span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' : q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {q.question}
                    </h3>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedOpt === oIdx;
                        const isThisCorrect = q.correctAnswer === oIdx;

                        let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-200';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isThisSelected && !isThisCorrect) {
                            btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          } else {
                            btnStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isAnswered}
                            onClick={() => handleSelectAnswer(q.id, oIdx)}
                            className={`p-3.5 rounded-2xl border transition-all text-xs text-left font-semibold flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-white/80 border text-[11px] font-black flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isAnswered && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isAnswered && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {isAnswered && (
                      <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs space-y-1 mt-3">
                        <span className="font-extrabold text-indigo-900 block flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Explanation & Rationale:
                        </span>
                        <p className="text-indigo-950 leading-relaxed font-medium">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: MOCK TEST MODE */}
        {activeTab === 'mock' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Timer & Test Header */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                  GPAT 2025 Full-Length Test Simulation
                </span>
                <h2 className="text-2xl font-black text-white">Timed Practice Exam ({mcqs.length} MCQs)</h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span className="text-lg font-mono font-black text-white">{formatTimer(timer)}</span>
                </div>

                {!testSubmitted && (
                  <button
                    onClick={handleTestSubmit}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Submit Test
                  </button>
                )}
              </div>
            </div>

            {/* Test Result Summary */}
            {testResult && (
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Exam Score Summary</span>
                    <h3 className="text-2xl font-black text-slate-900">Your Score: {testResult.score} / {testResult.maxScore}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-indigo-600 block">{testResult.percentage}%</span>
                    <span className="text-xs font-bold text-slate-500">Accuracy Rate</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                    <span className="text-emerald-800 font-extrabold text-lg block">
                      {testResult.results.filter(r => r.isCorrect).length}
                    </span>
                    <span className="text-emerald-700 font-bold">Correct (+4)</span>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
                    <span className="text-rose-800 font-extrabold text-lg block">
                      {testResult.results.filter(r => !r.isCorrect && r.userOption !== null).length}
                    </span>
                    <span className="text-rose-700 font-bold">Incorrect (-1)</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <span className="text-slate-800 font-extrabold text-lg block">
                      {testResult.results.filter(r => r.userOption === null).length}
                    </span>
                    <span className="text-slate-600 font-bold">Unattempted (0)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mock Test Questions List */}
            <div className="space-y-6">
              {mcqs.map((q, qIdx) => {
                const selectedOpt = mockAnswers[q.id];

                return (
                  <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                        Q{qIdx + 1}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm md:text-base">{q.question}</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedOpt === oIdx;

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={testSubmitted}
                            onClick={() => handleMockSelect(q.id, oIdx)}
                            className={`p-3.5 rounded-2xl border transition-all text-xs text-left font-semibold flex items-center gap-3 cursor-pointer ${
                              isThisSelected
                                ? 'bg-amber-100 border-amber-400 text-amber-950 font-black'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-lg bg-white border text-[11px] font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 3: HIGH-YIELD FORMULA CHEAT SHEET */}
        {activeTab === 'notes' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  placeholder="Search formula, equation, or topic..."
                  className="bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                {['all', 'Pharmaceutics', 'Analysis', 'Pharmacology'].map(f => (
                  <button
                    key={f}
                    onClick={() => setNotesFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      notesFilter === f
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                      {note.subject}
                    </span>
                    <button
                      onClick={() => handleCopyFormula(note.formula, idx)}
                      className="text-slate-400 hover:text-purple-600 flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedIndex === idx ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base">{note.title}</h3>

                  <div className="p-3 bg-slate-900 text-amber-300 font-mono text-xs rounded-xl border border-slate-800">
                    {note.formula}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {note.summary}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
