import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../apiConfig';
import { 
  Brain, Send, Sparkles, RefreshCw, Bot, User, ChevronRight, 
  Volume2, VolumeX, Bookmark, Copy, Check, Calculator, 
  HelpCircle, Lightbulb, Award, CheckCircle2, XCircle, Trash2, AlertCircle
} from 'lucide-react';
import axios from 'axios';

// Formatted Text Helper Component for AI Answers
function FormattedMessage({ text }) {
  if (!text) return null;

  // Split into lines or paragraphs
  const lines = text.split('\n');

  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Header 3: ### Title
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-indigo-900 text-sm md:text-base mt-3 mb-1 border-b border-indigo-100 pb-1 flex items-center gap-1.5">
              <span>{trimmed.replace('### ', '')}</span>
            </h4>
          );
        }
        // Header 2: ## Title
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="font-extrabold text-indigo-900 text-base md:text-lg mt-4 mb-1.5 border-b border-indigo-200 pb-1">
              {trimmed.replace('## ', '')}
            </h3>
          );
        }
        // Header 1: # Title
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="font-black text-slate-800 text-lg md:text-xl mt-4 mb-2">
              {trimmed.replace('# ', '')}
            </h2>
          );
        }

        // Bullet point: - or *
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const content = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm pl-2">
              <span className="text-indigo-600 font-bold mt-1">•</span>
              <span dangerouslySetInnerHTML={{ __html: parseMarkdownFormatting(content) }} />
            </div>
          );
        }

        // Callout boxes: ⚠️ or 💡 or 📌
        if (trimmed.startsWith('⚠️') || trimmed.startsWith('💡') || trimmed.startsWith('📌')) {
          return (
            <div key={idx} className="p-3 bg-amber-50/90 border border-amber-200 text-amber-900 rounded-xl text-xs md:text-sm my-2 font-medium">
              <span dangerouslySetInnerHTML={{ __html: parseMarkdownFormatting(trimmed) }} />
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-xs md:text-sm text-slate-800" dangerouslySetInnerHTML={{ __html: parseMarkdownFormatting(trimmed) }} />
        );
      })}
    </div>
  );
}

// Inline Markdown Parser for **bold**, *italic*, `code`, math $$
function parseMarkdownFormatting(str) {
  if (!str) return '';
  let res = str;
  // Bold **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-indigo-950">$1</strong>');
  // Italic *text*
  res = res.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');
  // Inline Code `text`
  res = res.replace(/`(.*?)`/g, '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[11px] font-mono">$1</code>');
  return res;
}

export default function AiTutor() {
  // Mode selection: 'tutor' | 'quiz' | 'mnemonics' | 'calculator'
  const [activeTab, setActiveTab] = useState('tutor');

  // Tutor State
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello! I am your **PharmaVerse AI Mentor** 🧪. 

Ask me any question on:
- **Pharmacology** (Mechanisms, SAR, Drug Classifications, ADME profiles)
- **Pharmaceutics** (BCS System, Dosage Formulations, Dissolution, Rheology)
- **Medicinal Chemistry & Pharmacognosy** (Alkaloid tests, SAR, Biosynthesis)
- **GPAT & NIPER Strategy** (Weightage, cutoff, high-yield exam points)

Choose a mode above: **Concept Tutor**, **GPAT MCQ Quiz**, **Mnemonics**, or **Dosage Calculator**!`,
      topic: 'Welcome & Introduction',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficultyLevel, setDifficultyLevel] = useState('GPAT Focus');
  const [speakingId, setSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const chatEndRef = useRef(null);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  // Mnemonics State
  const [mnemonics, setMnemonics] = useState([]);
  const [mnemonicLoading, setMnemonicLoading] = useState(false);

  // Calculator State
  const [calcType, setCalcType] = useState('youngsRule');
  const [calcInputs, setCalcInputs] = useState({
    age: '6',
    adultDose: '500',
    weightLbs: '45',
    ageMonths: '8',
    highConc: '70',
    lowConc: '20',
    targetConc: '50',
    weightA: '60',
    hlbA: '4.7',
    weightB: '40',
    hlbB: '15.0',
    ethanolVv: '70'
  });
  const [calcResult, setCalcResult] = useState(null);
  const [calcError, setCalcError] = useState(null);

  const categories = ['All', 'Pharmacology', 'Pharmaceutics', 'Medicinal Chemistry', 'GPAT Tips'];

  const quickPrompts = [
    { label: 'Explain NSAIDs Mechanism', text: 'Explain the mechanism of action of NSAIDs, COX-1 vs COX-2 selectivity, and aspirin acetylation.' },
    { label: 'Digoxin Toxicity & MOA', text: 'Explain Digoxin mechanism of action, Na+/K+-ATPase pump inhibition, and toxicity symptoms.' },
    { label: 'Beta-Lactam Antibiotics', text: 'Detail Penicillins mechanism, beta-lactam ring SAR, and beta-lactamase inhibitors.' },
    { label: 'BCS System Breakdown', text: 'What is the Biopharmaceutics Classification System (BCS)? Explain Class 1, 2, 3, 4 with examples.' },
    { label: 'Alkaloid Identification Tests', text: 'Detail Mayers, Dragendorffs, Wagners, and Hagers test reagents and color precipitates.' },
    { label: 'Tablet Defect Troubleshooting', text: 'Explain tablet defects like capping, lamination, mottling, picking, and how to troubleshoot them.' },
    { label: 'GPAT Schedule Rules', text: 'Explain Drugs & Cosmetics Act Schedules M, H, X, C, Y, G with high yield GPAT tips.' }
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'tutor') {
      scrollToBottom();
    }
  }, [messages, loading, activeTab]);

  useEffect(() => {
    if (activeTab === 'quiz') {
      fetchQuiz();
    } else if (activeTab === 'mnemonics') {
      fetchMnemonics();
    }
  }, [activeTab, activeCategory]);

  const fetchQuiz = async () => {
    setQuizLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/ai-tutor/quiz?category=${activeCategory}`);
      setQuizQuestions(res.data.questions || []);
      setCurrentQuizIndex(0);
      setSelectedOption(null);
      setQuizSubmitted(false);
      setScore(0);
    } catch (err) {
      console.error(err);
    } finally {
      setQuizLoading(false);
    }
  };

  const fetchMnemonics = async () => {
    setMnemonicLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/ai-tutor/mnemonics');
      setMnemonics(res.data.mnemonics || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMnemonicLoading(false);
    }
  };

  // Text to Speech
  const speakText = (id, text) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanedText = text.replace(/[\*\_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Copy Message Text
  const copyMessageText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Bookmark / Save Note
  const toggleSaveNote = (msg) => {
    if (savedNotes.some(n => n.id === msg.id)) {
      setSavedNotes(prev => prev.filter(n => n.id !== msg.id));
    } else {
      setSavedNotes(prev => [...prev, msg]);
    }
  };

  // Handle Tutor Message Send
  const handleSend = async (customText) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/ai-tutor/ask`, {
        question: textToSend,
        category: activeCategory !== 'All' ? activeCategory : undefined,
        difficulty: difficultyLevel
      });

      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: res.data.answer,
        topic: res.data.topic,
        relatedTopics: res.data.relatedTopics,
        category: res.data.category,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: '⚠️ Unable to connect to PharmaVerse AI server. Please make sure backend server is running on port 5000.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: 'Session reset! What pharmacy topic or GPAT concept would you like to explore next?',
        topic: 'New Session',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Client-Side Calculation Engine
  const performCalculation = (type, inputs) => {
    let res = null;
    let err = null;

    if (type === 'youngsRule') {
      const a = parseFloat(inputs.age) || 0;
      const d = parseFloat(inputs.adultDose) || 0;
      if (a <= 0 || d <= 0) {
        err = "Please enter positive values for child age and adult dose.";
      } else {
        const childDose = (a / (a + 12)) * d;
        res = {
          title: "Young's Rule Pediatric Calculation",
          formula: "Child Dose = [Age (yrs) / (Age + 12)] * Adult Dose",
          calculation: `[${a} / (${a} + 12)] * ${d} mg`,
          resultValue: childDose.toFixed(2),
          unit: 'mg',
          summary: `For a ${a}-year-old child with an adult dose of ${d} mg, the calculated pediatric dose is ${childDose.toFixed(2)} mg.`
        };
      }
    } else if (type === 'clarksRule') {
      const w = parseFloat(inputs.weightLbs) || 0;
      const d = parseFloat(inputs.adultDose) || 0;
      if (w <= 0 || d <= 0) {
        err = "Please enter positive values for weight and adult dose.";
      } else {
        const childDose = (w / 150) * d;
        res = {
          title: "Clark's Rule Weight-Based Calculation",
          formula: "Child Dose = [Weight in lbs / 150] * Adult Dose",
          calculation: `[${w} lbs / 150] * ${d} mg`,
          resultValue: childDose.toFixed(2),
          unit: 'mg',
          summary: `For a child weighing ${w} lbs with an adult dose of ${d} mg, the calculated pediatric dose is ${childDose.toFixed(2)} mg.`
        };
      }
    } else if (type === 'friedsRule') {
      const m = parseFloat(inputs.ageMonths) || 0;
      const d = parseFloat(inputs.adultDose) || 0;
      if (m <= 0 || d <= 0) {
        err = "Please enter positive values for age in months and adult dose.";
      } else {
        const infantDose = (m / 150) * d;
        res = {
          title: "Fried's Rule Infant Calculation (< 1 year)",
          formula: "Infant Dose = [Age in Months / 150] * Adult Dose",
          calculation: `[${m} months / 150] * ${d} mg`,
          resultValue: infantDose.toFixed(2),
          unit: 'mg',
          summary: `For a ${m}-month-old infant with an adult dose of ${d} mg, the calculated infant dose is ${infantDose.toFixed(2)} mg.`
        };
      }
    } else if (type === 'dillingsRule') {
      const a = parseFloat(inputs.age) || 0;
      const d = parseFloat(inputs.adultDose) || 0;
      if (a <= 0 || d <= 0) {
        err = "Please enter positive values for age and adult dose.";
      } else {
        const childDose = (a / 20) * d;
        res = {
          title: "Dilling's Rule Calculation (4-20 years)",
          formula: "Child Dose = [Age (yrs) / 20] * Adult Dose",
          calculation: `[${a} / 20] * ${d} mg`,
          resultValue: childDose.toFixed(2),
          unit: 'mg',
          summary: `For a ${a}-year-old with an adult dose of ${d} mg, the calculated dose according to Dilling's Rule is ${childDose.toFixed(2)} mg.`
        };
      }
    } else if (type === 'alligation') {
      const H = parseFloat(inputs.highConc) || 0;
      const L = parseFloat(inputs.lowConc) || 0;
      const D = parseFloat(inputs.targetConc) || 0;

      if (D <= L || D >= H) {
        err = `Target concentration (${D}%) must be strictly between Low (${L}%) and High (${H}%) concentrations.`;
      } else {
        const partsHigh = D - L;
        const partsLow = H - D;
        const totalParts = partsHigh + partsLow;
        const highPercent = ((partsHigh / totalParts) * 100).toFixed(1);
        const lowPercent = ((partsLow / totalParts) * 100).toFixed(1);

        res = {
          title: "Alligation Alternate Solution Proportions",
          formula: "Parts High = Target - Low | Parts Low = High - Target",
          calculation: `High Parts: ${D} - ${L} = ${partsHigh} | Low Parts: ${H} - ${D} = ${partsLow}`,
          resultValue: `${partsHigh} : ${partsLow}`,
          unit: 'Ratio (High : Low Parts)',
          highParts: partsHigh,
          lowParts: partsLow,
          totalParts: totalParts,
          highPercent,
          lowPercent,
          summary: `Mix ${partsHigh} parts of ${H}% solution with ${partsLow} parts of ${L}% solution (Total: ${totalParts} parts) to obtain a ${D}% solution (${highPercent}% High, ${lowPercent}% Low).`
        };
      }
    } else if (type === 'hlbValue') {
      const wA = parseFloat(inputs.weightA) || 0;
      const hA = parseFloat(inputs.hlbA) || 0;
      const wB = parseFloat(inputs.weightB) || 0;
      const hB = parseFloat(inputs.hlbB) || 0;
      const totalW = wA + wB;

      if (totalW <= 0) {
        err = "Total weight of surfactant blend must be greater than zero.";
      } else {
        const hlbBlend = ((wA * hA) + (wB * hB)) / totalW;
        res = {
          title: "HLB Value of Surfactant Blend",
          formula: "HLB Blend = [(Weight A * HLB A) + (Weight B * HLB B)] / Total Weight",
          calculation: `[(${wA}g * ${hA}) + (${wB}g * ${hB})] / ${totalW}g`,
          resultValue: hlbBlend.toFixed(2),
          unit: 'HLB Units',
          summary: `The resulting HLB value of the surfactant blend is ${hlbBlend.toFixed(2)} (${hlbBlend < 9 ? 'W/O Emulsifier' : 'O/W Emulsifier'}).`
        };
      }
    } else if (type === 'proofSpirit') {
      const v = parseFloat(inputs.ethanolVv) || 0;
      const proof = (v * 1.753) - 100;
      const isOverProof = proof >= 0;

      res = {
        title: "Proof Spirit Conversion",
        formula: "Proof Strength = (% v/v Ethanol * 1.753) - 100",
        calculation: `(${v}% * 1.753) - 100`,
        resultValue: `${Math.abs(proof).toFixed(2)}° ${isOverProof ? 'Over Proof (O.P.)' : 'Under Proof (U.P.)'}`,
        unit: isOverProof ? 'O.P.' : 'U.P.',
        summary: `${v}% v/v ethanol corresponds to ${Math.abs(proof).toFixed(2)}° ${isOverProof ? 'Over Proof (O.P.)' : 'Under Proof (U.P.)'}.`
      };
    }

    return { res, err };
  };

  const handleCalculateSubmit = async (e) => {
    e.preventDefault();
    setCalcError(null);

    const { res: clientRes, err: clientErr } = performCalculation(calcType, calcInputs);
    if (clientErr) {
      setCalcError(clientErr);
      setCalcResult(null);
      return;
    }

    setCalcResult(clientRes);

    try {
      const apiRes = await axios.post('http://localhost:5000/api/ai-tutor/calculate', {
        type: calcType,
        ...calcInputs
      });
      if (apiRes.data.success && apiRes.data.result) {
        setCalcResult(apiRes.data.result);
      }
    } catch (err) {
      console.warn('Backend sync note:', err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        
        {/* Top Header & Mode Navigation Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-md shadow-indigo-200">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-xl md:text-2xl flex items-center gap-2">
                PharmaVerse AI Mentor Hub
                <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                  v2.0 Pro
                </span>
              </h1>
              <p className="text-xs text-slate-500">Interactive B.Pharm, Pharm.D & GPAT / NIPER Academic Intelligence</p>
            </div>
          </div>

          {/* Mode Tabs Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('tutor')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'tutor'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Concept Tutor</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>GPAT MCQ Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('mnemonics')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'mnemonics'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Mnemonics</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === 'calculator'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Calculations</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: CONCEPT TUTOR CHAT ================= */}
        {activeTab === 'tutor' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Sidebar - Options & Quick Prompts */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                
                {/* Saved Notes Modal Trigger */}
                <button
                  onClick={() => setShowSavedModal(true)}
                  className="w-full mb-5 py-2.5 px-3 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-xl font-semibold text-xs flex items-center justify-between hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-indigo-600 fill-indigo-200" />
                    <span>Saved Study Notes</span>
                  </div>
                  <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {savedNotes.length}
                  </span>
                </button>

                {/* Target Difficulty Pills */}
                <div className="mb-5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Study Focus Depth</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {['B.Pharm Exam', 'GPAT Focus', 'NIPER Ranker'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setDifficultyLevel(lvl)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                          difficultyLevel === lvl
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-1 mb-5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Subject Filter</label>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-primary text-white shadow-md shadow-primary/20 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Quick Prompts */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Recommended Prompts</label>
                  <div className="space-y-2">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(prompt.text)}
                        className="w-full text-left p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50/60 hover:border-indigo-200 text-xs text-slate-700 font-medium transition-all flex items-center justify-between group"
                      >
                        <span className="truncate pr-2">{prompt.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Main Chat Panel */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[750px] overflow-hidden">
              
              {/* Chat Header */}
              <div className="px-6 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute top-0 right-0"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-xs md:text-sm flex items-center gap-2">
                      PharmaVerse Academic Mentor
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">Online</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">Subject: <span className="font-semibold text-indigo-600">{activeCategory}</span> • Target: <span className="font-semibold text-purple-600">{difficultyLevel}</span></p>
                  </div>
                </div>
                
                <button
                  onClick={handleClearChat}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-red-600 bg-white border border-slate-200 rounded-lg hover:border-red-200 transition-colors flex items-center gap-1.5 font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Session
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg) => {
                  const isSaved = savedNotes.some(n => n.id === msg.id);
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-primary'
                            : 'bg-gradient-to-tr from-indigo-600 to-purple-600'
                        }`}
                      >
                        {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>

                      {/* Message Content Bubble */}
                      <div className="max-w-[85%] space-y-1.5">
                        <div
                          className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-primary text-white rounded-tr-none'
                              : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200/80'
                          }`}
                        >
                          {msg.topic && (
                            <div className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-3 inline-flex items-center gap-1.5 border border-indigo-100">
                              <span>📍 Topic:</span>
                              <span>{msg.topic}</span>
                            </div>
                          )}

                          {/* Formatted Message Output */}
                          {msg.sender === 'ai' ? (
                            <FormattedMessage text={msg.text} />
                          ) : (
                            <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                          )}

                          {/* Suggested Deep Dives */}
                          {msg.relatedTopics && (
                            <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-1.5">
                              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Suggested Deep Dives:</span>
                              {msg.relatedTopics.map((rel, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSend(rel)}
                                  className="block text-left text-xs text-indigo-600 font-medium hover:underline hover:text-indigo-800 transition-colors"
                                >
                                  • {rel}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Action Toolbar for AI Messages */}
                          {msg.sender === 'ai' && (
                            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-slate-400 text-xs">
                              <div className="flex items-center gap-3">
                                {/* Speech Synth Button */}
                                <button
                                  onClick={() => speakText(msg.id, msg.text)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                    speakingId === msg.id
                                      ? 'bg-indigo-100 text-indigo-700 animate-pulse'
                                      : 'hover:bg-slate-200/60 text-slate-600'
                                  }`}
                                  title="Read Aloud"
                                >
                                  {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                                  <span>{speakingId === msg.id ? 'Stop' : 'Listen'}</span>
                                </button>

                                {/* Copy Button */}
                                <button
                                  onClick={() => copyMessageText(msg.id, msg.text)}
                                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium hover:bg-slate-200/60 text-slate-600 transition-colors"
                                  title="Copy response"
                                >
                                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                                </button>

                                {/* Bookmark Note */}
                                <button
                                  onClick={() => toggleSaveNote(msg)}
                                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                    isSaved
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'hover:bg-slate-200/60 text-slate-600'
                                  }`}
                                  title="Save to study notes"
                                >
                                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                                  <span>{isSaved ? 'Saved' : 'Save Note'}</span>
                                </button>
                              </div>

                              <span className="text-[10px] text-slate-400">{msg.time}</span>
                            </div>
                          )}
                        </div>

                        {msg.sender === 'user' && (
                          <span className="text-[10px] text-slate-400 block text-right px-1">{msg.time}</span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {loading && (
                  <div className="flex gap-4 items-center animate-fade-in">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <Bot className="w-5 h-5 animate-spin" />
                    </div>
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-600 text-xs md:text-sm flex items-center gap-2 border border-slate-200/60">
                      <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                      Analyzing pharmacy literature & generating structured GPAT response...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-3 items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask any question on Pharmacology, Pharmaceutics, SAR, or GPAT strategy..."
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-medium text-xs md:text-sm hover:bg-indigo-700 shadow-md shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0"
                  >
                    <span>Ask AI</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: GPAT MCQ QUIZ PRACTICE ================= */}
        {activeTab === 'quiz' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  GPAT High-Yield MCQ Practice Drill
                </h2>
                <p className="text-xs text-slate-500">Test your concepts with instant answer validation & GPAT explanations</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 px-3.5 py-1.5 rounded-xl border border-indigo-100 text-xs font-bold text-indigo-700">
                  Score: {score} / {quizQuestions.length}
                </div>
                <button
                  onClick={fetchQuiz}
                  className="px-3 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reload Questions
                </button>
              </div>
            </div>

            {quizLoading ? (
              <div className="py-20 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-3">
                <Bot className="w-8 h-8 text-indigo-600 animate-bounce" />
                <span>Loading GPAT questions database...</span>
              </div>
            ) : quizQuestions.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span>Question {currentQuizIndex + 1} of {quizQuestions.length}</span>
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                    Subject: {quizQuestions[currentQuizIndex].category}
                  </span>
                </div>

                {/* Question Card */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
                  <h3 className="font-bold text-slate-800 text-base md:text-lg">
                    {quizQuestions[currentQuizIndex].question}
                  </h3>

                  {/* Options List */}
                  <div className="space-y-2.5 pt-2">
                    {quizQuestions[currentQuizIndex].options.map((opt, idx) => {
                      const isCorrect = idx === quizQuestions[currentQuizIndex].correctIndex;
                      const isSelected = selectedOption === idx;

                      let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-indigo-50/50 hover:border-indigo-200";
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-50 border-rose-400 text-rose-900 font-semibold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold shadow-sm";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizSubmitted}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit / Explanation Section */}
                {!quizSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedOption === quizQuestions[currentQuizIndex].correctIndex) {
                        setScore(prev => prev + 1);
                      }
                    }}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md shadow-indigo-200"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* Explanation Box */}
                    <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl text-xs md:text-sm text-indigo-900 space-y-1">
                      <span className="font-bold block text-indigo-700">💡 GPAT Explanation:</span>
                      <p>{quizQuestions[currentQuizIndex].explanation}</p>
                    </div>

                    {/* Next Question Navigation */}
                    {currentQuizIndex < quizQuestions.length - 1 ? (
                      <button
                        onClick={() => {
                          setCurrentQuizIndex(prev => prev + 1);
                          setSelectedOption(null);
                          setQuizSubmitted(false);
                        }}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                        <h4 className="font-bold text-emerald-800 text-base">Drill Complete! 🎉</h4>
                        <p className="text-xs text-emerald-700 mt-1">Final Score: {score} / {quizQuestions.length}</p>
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : null}
          </div>
        )}

        {/* ================= TAB 3: PHARMACY MNEMONICS ================= */}
        {activeTab === 'mnemonics' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
            <div className="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  High-Yield Pharmacy Mnemonics & Memory Tricks
                </h2>
                <p className="text-xs text-slate-500">Unforgettable mnemonics for drug tables, schedules, amino acids, and reagents</p>
              </div>
            </div>

            {mnemonicLoading ? (
              <div className="py-20 text-center text-slate-500 text-sm">Loading Mnemonics...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mnemonics.map((item, idx) => (
                  <div key={idx} className="p-5 bg-gradient-to-br from-slate-50 to-amber-50/40 rounded-2xl border border-slate-200/80 space-y-3 hover:border-amber-300 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>

                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900">
                      ✨ Mnemonic: "{item.mnemonic}"
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: DOSAGE CALCULATOR ================= */}
        {activeTab === 'calculator' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[500px]">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                Pharmaceutical Calculations & Dosage Solver
              </h2>
              <p className="text-xs text-slate-500">Calculate pediatric doses, Alligation proportions, HLB blend values, and Proof spirits instantly</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Formula Form */}
              <form onSubmit={handleCalculateSubmit} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1.5">Select Calculation Type</label>
                  <select
                    value={calcType}
                    onChange={(e) => {
                      setCalcType(e.target.value);
                      setCalcResult(null);
                      setCalcError(null);
                    }}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-indigo-600"
                  >
                    <option value="youngsRule">Young's Rule (Age 1–12 years)</option>
                    <option value="clarksRule">Clark's Rule (Body Weight in lbs)</option>
                    <option value="friedsRule">Fried's Rule (Infants under 1 year in months)</option>
                    <option value="dillingsRule">Dilling's Rule (Age 4–20 years)</option>
                    <option value="alligation">Alligation Alternate (Mixing Concentrates)</option>
                    <option value="hlbValue">HLB Value (Surfactant Blend)</option>
                    <option value="proofSpirit">Proof Spirit Conversion (% v/v Ethanol)</option>
                  </select>
                </div>

                {/* Inputs */}
                {(calcType === 'youngsRule' || calcType === 'dillingsRule') && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Child Age (Years)</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={calcInputs.age}
                        onChange={(e) => setCalcInputs({...calcInputs, age: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Adult Dose (mg)</label>
                      <input
                        type="number"
                        min="1"
                        value={calcInputs.adultDose}
                        onChange={(e) => setCalcInputs({...calcInputs, adultDose: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </>
                )}

                {calcType === 'clarksRule' && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Child Weight (lbs)</label>
                      <input
                        type="number"
                        min="1"
                        value={calcInputs.weightLbs}
                        onChange={(e) => setCalcInputs({...calcInputs, weightLbs: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Adult Dose (mg)</label>
                      <input
                        type="number"
                        min="1"
                        value={calcInputs.adultDose}
                        onChange={(e) => setCalcInputs({...calcInputs, adultDose: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </>
                )}

                {calcType === 'friedsRule' && (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Infant Age (Months, 1–24)</label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={calcInputs.ageMonths}
                        onChange={(e) => setCalcInputs({...calcInputs, ageMonths: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Adult Dose (mg)</label>
                      <input
                        type="number"
                        min="1"
                        value={calcInputs.adultDose}
                        onChange={(e) => setCalcInputs({...calcInputs, adultDose: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </>
                )}

                {calcType === 'alligation' && (
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">High Conc %</label>
                      <input
                        type="number"
                        value={calcInputs.highConc}
                        onChange={(e) => setCalcInputs({...calcInputs, highConc: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Low Conc %</label>
                      <input
                        type="number"
                        value={calcInputs.lowConc}
                        onChange={(e) => setCalcInputs({...calcInputs, lowConc: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Target %</label>
                      <input
                        type="number"
                        value={calcInputs.targetConc}
                        onChange={(e) => setCalcInputs({...calcInputs, targetConc: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </div>
                )}

                {calcType === 'hlbValue' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Surfactant A Weight (g)</label>
                      <input
                        type="number"
                        value={calcInputs.weightA}
                        onChange={(e) => setCalcInputs({...calcInputs, weightA: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Surfactant A HLB</label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcInputs.hlbA}
                        onChange={(e) => setCalcInputs({...calcInputs, hlbA: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Surfactant B Weight (g)</label>
                      <input
                        type="number"
                        value={calcInputs.weightB}
                        onChange={(e) => setCalcInputs({...calcInputs, weightB: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Surfactant B HLB</label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcInputs.hlbB}
                        onChange={(e) => setCalcInputs({...calcInputs, hlbB: e.target.value})}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                        required
                      />
                    </div>
                  </div>
                )}

                {calcType === 'proofSpirit' && (
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Ethanol Concentration (% v/v)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={calcInputs.ethanolVv}
                      onChange={(e) => setCalcInputs({...calcInputs, ethanolVv: e.target.value})}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                      required
                    />
                  </div>
                )}

                {calcError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{calcError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-xs md:text-sm hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
                >
                  Calculate Now
                </button>
              </form>

              {/* Calculation Output Card */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200 flex flex-col justify-between min-h-[350px]">
                {calcResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                      <h3 className="font-bold text-indigo-900 text-base">{calcResult.title}</h3>
                      <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full uppercase">Computed</span>
                    </div>
                    
                    {calcResult.formula && (
                      <div className="p-3 bg-white rounded-xl text-xs font-mono text-indigo-800 border border-indigo-100 shadow-2xs">
                        <span className="font-bold text-indigo-600 block mb-0.5">Formula:</span>
                        {calcResult.formula}
                      </div>
                    )}

                    {calcResult.calculation && (
                      <div className="p-3 bg-white rounded-xl text-xs font-mono text-slate-700 border border-indigo-100 shadow-2xs">
                        <span className="font-bold text-indigo-600 block mb-0.5">Step-by-Step Calculation:</span>
                        {calcResult.calculation}
                      </div>
                    )}

                    {calcResult.resultValue && (
                      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl text-center space-y-1 shadow-md">
                        <span className="text-[11px] opacity-80 block uppercase tracking-wider font-semibold">Calculated Result</span>
                        <span className="text-3xl font-black">{calcResult.resultValue} {calcResult.unit}</span>
                      </div>
                    )}

                    {calcResult.summary && (
                      <div className="p-3.5 bg-white rounded-xl text-xs font-semibold text-slate-700 border border-indigo-100 leading-relaxed shadow-2xs">
                        📌 {calcResult.summary}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
                    <Calculator className="w-10 h-10 text-indigo-400" />
                    <span className="font-medium text-slate-500">Select formula type, enter input parameters and click "Calculate Now"</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* SAVED NOTES MODAL */}
      {showSavedModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                Bookmarked Study Notes ({savedNotes.length})
              </h3>
              <button
                onClick={() => setShowSavedModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {savedNotes.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No saved notes yet. Click the "Save Note" bookmark icon on any AI tutor message to save it here!
                </div>
              ) : (
                savedNotes.map((note) => (
                  <div key={note.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 relative group">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-600">
                      <span>📍 {note.topic || 'General Note'}</span>
                      <button
                        onClick={() => toggleSaveNote(note)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{note.text}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
