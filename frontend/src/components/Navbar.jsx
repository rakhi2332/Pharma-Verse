import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, Search, X, BookOpen, Brain, Scan, Activity, Award, Calendar, Layers } from 'lucide-react';
import RelaxationMusicPlayer from './RelaxationMusicPlayer';

const SEARCH_DATABASE = [
  { title: 'Pharmaceutics I (BP103T)', type: 'Subject & PDF Notes', url: '/subjects/bp103t/content', icon: BookOpen, tags: ['pharmaceutics', 'dosage forms', 'posology', 'monophasic', 'biphasic', 'suppositories', 'bp103t'] },
  { title: 'Human Anatomy & Physiology I (BP101T)', type: 'Subject & PDF Notes', url: '/subjects/bp101t/content', icon: BookOpen, tags: ['hap', 'anatomy', 'physiology', 'cell', 'tissue', 'skeleton', 'joints', 'blood', 'bp101t'] },
  { title: 'Pharmaceutical Analysis I (BP102T)', type: 'Subject & PDF Notes', url: '/subjects/bp102t/content', icon: BookOpen, tags: ['analysis', 'titration', 'acid base', 'non aqueous', 'precipitation', 'gravimetry', 'bp102t'] },
  { title: 'Pharmaceutical Inorganic Chemistry (BP104T)', type: 'Subject & PDF Notes', url: '/subjects/bp104t/content', icon: BookOpen, tags: ['inorganic', 'chemistry', 'impurities', 'gastrointestinal', 'radiopharmaceuticals', 'bp104t'] },
  { title: '24/7 AI Tutor & Learning Assistant', type: 'AI Tool', url: '/ai-tutor', icon: Brain, tags: ['ai', 'tutor', 'mentor', 'chat', 'doubt', 'questions', 'solver'] },
  { title: 'AI Pill & Medicine Scanner', type: 'Clinical Tool', url: '/medicine-scanner', icon: Scan, tags: ['pill', 'scanner', 'medicine', 'ocr', 'image', 'identification'] },
  { title: 'Interactive Disease Maps', type: 'Medical Tool', url: '/disease-maps', icon: Activity, tags: ['disease', 'pathology', 'maps', 'symptoms', 'treatment'] },
  { title: 'GPAT Exam Preparation Engine', type: 'Exam Prep', url: '/gpat', icon: Award, tags: ['gpat', 'mcq', 'exam', 'quiz', 'test', 'practice'] },
  { title: 'Smart PCI Study Planner', type: 'Productivity', url: '/study-planner', icon: Calendar, tags: ['study', 'planner', 'schedule', 'timetable', 'calendar'] },
  { title: 'Semester-wise B.Pharm Curriculum', type: 'Curriculum', url: '/semesters', icon: Layers, tags: ['semesters', 'semester 1', 'semester 2', 'pci', 'syllabus'] },
];

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const filteredResults = query.trim() === '' ? [] : SEARCH_DATABASE.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (url) => {
    setQuery('');
    setIsOpen(false);
    navigate(url);
  };

  return (
    <nav className="flex justify-between items-center px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 shadow-sm gap-4">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <Pill className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
          PharmaVerse
        </span>
      </Link>

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-md mx-2 md:mx-6" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search subjects, PDF notes, AI tools, GPAT..."
            className="w-full pl-10 pr-9 py-2 bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm font-medium rounded-full border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isOpen && query.trim() !== '' && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-semibold px-3">
              <span>Matching Search Results ({filteredResults.length})</span>
              <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">Press Esc to close</span>
            </div>

            {filteredResults.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No matching subjects or notes found for "<span className="font-semibold text-slate-600">{query}</span>"
              </div>
            ) : (
              <div className="p-1.5 space-y-1">
                {filteredResults.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectResult(item.url)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors flex items-center gap-3 group border border-transparent hover:border-blue-100 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ItemIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 truncate transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {item.type}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-5 text-slate-600 font-medium text-xs sm:text-sm">
        <Link to="/semesters" className="hover:text-blue-600 transition-colors font-semibold">Semesters</Link>
        <Link to="/study-planner" className="hover:text-blue-600 transition-colors">Planner</Link>
        <Link to="/medicine-scanner" className="hover:text-blue-600 transition-colors">Scanner</Link>
        <Link to="/ai-tutor" className="hover:text-blue-600 transition-colors font-semibold flex items-center gap-1">
          <Brain className="w-3.5 h-3.5 text-indigo-600" /> AI Tutor
        </Link>
      </div>

      {/* Global Relaxation Music Player & Auth Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <RelaxationMusicPlayer />
        <Link to="/login" className="px-3 sm:px-4 py-2 font-semibold text-slate-700 hover:text-blue-600 text-xs sm:text-sm transition-colors">Log In</Link>
        <Link to="/register" className="px-4 sm:px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-full hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95">Get Started</Link>
      </div>
    </nav>
  );
}
