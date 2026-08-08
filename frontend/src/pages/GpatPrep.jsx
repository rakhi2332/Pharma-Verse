import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  Activity, CheckCircle2, XCircle, HelpCircle, Award, BookOpen, 
  Clock, RotateCcw, ArrowRight, Sparkles, Filter, Copy, Check, Search, Loader2 
} from 'lucide-react';
import axios from 'axios';

export default function GpatPrep() {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' | 'mock' | 'notes'
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [mcqs, setMcqs] = useState([]);

  // Practice state
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: selectedOptionIndex }

  // Mock test state
  const [mockAnswers, setMockAnswers] = useState({});
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [timer, setTimer] = useState(600); // 10 min countdown
  const [timerActive, setTimerActive] = useState(false);

  // High-Yield Notes & Formula State
  const [notes, setNotes] = useState([]);
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
    setLoading(true);
    try {
      const [subRes, notesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/gpat/subjects'),
        axios.get('http://localhost:5000/api/gpat/notes')
      ]);
      setSubjects(subRes.data.subjects || []);
      setNotes(notesRes.data.notes || []);
    } catch (err) {
      console.error('Failed to load GPAT metadata:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMcqs = async (subject) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/gpat/mcqs?subject=${subject}`);
      setMcqs(res.data.mcqs || []);
    } catch (err) {
      console.error('Failed to fetch MCQs:', err);
    }
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (userAnswers[qId] !== undefined) return; // Prevent changing in practice mode
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
      const res = await axios.post('http://localhost:5000/api/gpat/submit', {
        answers: answersPayload
      });
      setTestResult(res.data);
      setTestSubmitted(true);
    } catch (err) {
      console.error('Failed to submit test:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyFormula = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredNotes = notes.filter(n => {
    const matchesSubject = notesFilter === 'all' || n.subject.toLowerCase().includes(notesFilter.toLowerCase());
    const matchesQuery = n.title.toLowerCase().includes(notesSearch.toLowerCase()) || 
                         n.summary.toLowerCase().includes(notesSearch.toLowerCase()) ||
                         (n.formula && n.formula.toLowerCase().includes(notesSearch.toLowerCase()));
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/30 backdrop-blur-md rounded-full text-xs font-semibold mb-3 border border-emerald-400/30">
              <Activity className="w-3.5 h-3.5" />
              NTA GPAT Exam Prep Module
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">GPAT Preparation Hub</h1>
            <p className="mt-2 text-emerald-100 text-sm md:text-base max-w-xl">
              Master Graduate Pharmacy Aptitude Test with high-yield MCQs, real-time mock tests, instant explanations, and high-yield formula revision notes.
            </p>
          </div>

          <button
            onClick={startMockTest}
            className="px-6 py-3 bg-white text-emerald-800 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Start Full Mock Test
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl w-full mx-auto p-6 flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex border border-slate-200 mb-8 bg-white p-2 rounded-2xl shadow-sm flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 min-w-[160px] ${
              activeTab === 'practice'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Subject Practice MCQs
          </button>
          
          <button
            onClick={() => setActiveTab('mock')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 min-w-[160px] ${
              activeTab === 'mock'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            Live Mock Test Mode
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 min-w-[160px] ${
              activeTab === 'notes'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Award className="w-4 h-4 text-yellow-300" />
            High-Yield Formula Notes ({notes.length})
          </button>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
            <p className="text-slate-500 font-medium text-sm">Loading GPAT prep module & formula notes...</p>
          </div>
        )}

        {/* TAB 1: PRACTICE MODE */}
        {!loading && activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Subject Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Filter className="w-3.5 h-3.5" /> Subject:
              </span>
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    selectedSubject === s.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* MCQ List */}
            <div className="space-y-6">
              {mcqs.map((q, qIndex) => {
                const selectedOpt = userAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                            Q{qIndex + 1} • {q.subject.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                            {q.year}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-800 text-base leading-relaxed pt-1">
                          {q.question}
                        </h3>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIndex) => {
                        let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300';
                        
                        if (isAnswered) {
                          if (optIndex === q.correctAnswer) {
                            btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold';
                          } else if (selectedOpt === optIndex) {
                            btnStyle = 'bg-red-50 border-red-400 text-red-700 font-semibold';
                          } else {
                            btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectAnswer(q.id, optIndex)}
                            disabled={isAnswered}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-xs font-bold flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              {opt}
                            </span>
                            {isAnswered && optIndex === q.correctAnswer && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            )}
                            {isAnswered && selectedOpt === optIndex && optIndex !== q.correctAnswer && (
                              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {isAnswered && (
                      <div className="mt-4 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed space-y-1">
                        <div className="font-bold text-emerald-700 flex items-center gap-1.5 text-sm">
                          <HelpCircle className="w-4 h-4" /> Explanation Rationale:
                        </div>
                        <p className="pt-1">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE MOCK TEST MODE */}
        {!loading && activeTab === 'mock' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            {!testSubmitted ? (
              <>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-800 text-xl">GPAT Full Mock Test</h2>
                    <p className="text-xs text-slate-500">Standard GPAT Scoring: +4 for correct answer, -1 for incorrect attempt.</p>
                  </div>

                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-2 rounded-xl text-red-600 font-mono font-bold text-lg">
                    <Clock className="w-5 h-5 animate-pulse" />
                    {formatTime(timer)}
                  </div>
                </div>

                <div className="space-y-8">
                  {mcqs.map((q, qIndex) => (
                    <div key={q.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="font-semibold text-slate-800 text-base">
                        Q{qIndex + 1}. {q.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((opt, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleMockSelect(q.id, optIndex)}
                            className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center gap-3 ${
                              mockAnswers[q.id] === optIndex
                                ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-md'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                              mockAnswers[q.id] === optIndex ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleTestSubmit}
                    className="px-8 py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
                  >
                    Submit Test & View Detailed Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              /* Test Results Dashboard */
              <div className="space-y-8 text-center py-6">
                <div className="inline-flex p-4 bg-emerald-100 text-emerald-700 rounded-full mb-2">
                  <Award className="w-12 h-12" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-800">Mock Test Completed!</h2>
                  <p className="text-slate-500 text-sm mt-1">Here is your GPAT score breakdown.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Your Total Score</span>
                    <p className="text-4xl font-extrabold text-emerald-600 mt-2">
                      {testResult.score} <span className="text-slate-400 text-lg">/ {testResult.maxScore}</span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Accuracy Rate</span>
                    <p className="text-4xl font-extrabold text-indigo-600 mt-2">
                      {testResult.percentage}%
                    </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <span className="text-xs font-semibold text-slate-400 uppercase">Questions Attempted</span>
                    <p className="text-4xl font-extrabold text-slate-800 mt-2">
                      {Object.keys(mockAnswers).length} / {testResult.totalQuestions}
                    </p>
                  </div>
                </div>

                {/* Question Breakdown */}
                <div className="text-left space-y-4 pt-6">
                  <h3 className="font-bold text-slate-800 text-lg">Detailed Question Review</h3>
                  {testResult.results.map((r, i) => (
                    <div key={i} className={`p-5 rounded-2xl border ${r.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800 text-sm">Q{i+1}. {r.question}</span>
                        {r.isCorrect ? (
                          <span className="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded-full font-bold">+4 Correct</span>
                        ) : (
                          <span className="text-xs bg-red-500 text-white px-2.5 py-1 rounded-full font-bold">-1 Incorrect</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-2"><strong className="text-slate-800">Explanation:</strong> {r.explanation}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startMockTest}
                  className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Test
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: HIGH YIELD FORMULA NOTES */}
        {!loading && activeTab === 'notes' && (
          <div className="space-y-6">
            {/* Formula Controls Bar */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Category:
                </span>
                {['all', 'Pharmaceutics', 'Pharmacology', 'Biopharmaceutics', 'Analysis', 'Quality Assurance'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNotesFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                      notesFilter === cat
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Formulas' : cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search formula or law..."
                  value={notesSearch}
                  onChange={(e) => setNotesSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Formula Cards Grid */}
            {filteredNotes.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 shadow-sm">
                <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">No formula notes found</h3>
                <p className="text-slate-500 text-xs mt-1">Try adjusting your search query or subject category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNotes.map((note, index) => (
                  <div key={index} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
                          {note.subject}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                          GPAT High-Yield
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{note.title}</h3>

                      {/* Formula Expression Box */}
                      {note.formula && (
                        <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-xs sm:text-sm font-bold border border-slate-800 shadow-inner flex items-center justify-between gap-3">
                          <code className="break-all">{note.formula}</code>
                          <button
                            onClick={() => handleCopyFormula(note.formula, index)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                            title="Copy formula text"
                          >
                            {copiedIndex === index ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {note.summary}
                      </p>
                    </div>

                    <div className="px-6 pb-6 pt-0 mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                      <Link
                        to={`/ai-tutor?prompt=${encodeURIComponent(`Explain formula and calculation for: ${note.title} (${note.formula || ''})`)}`}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                        <span>Explain with AI Tutor</span>
                      </Link>

                      <span className="text-[11px] font-semibold text-slate-400">
                        PCI & NTA Standard
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
