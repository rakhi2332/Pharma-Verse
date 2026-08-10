import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill, Search, X, BookOpen, Brain, Scan, Activity, Award, Calendar, Layers, Sun, Moon } from 'lucide-react';
import RelaxationMusicPlayer from './RelaxationMusicPlayer';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

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
    <nav className="flex justify-between items-center px-6 lg:px-12 py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800 shadow-sm gap-4 transition-colors">
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
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search subjects, notes, tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="w-full pl-10 pr-10 py-2 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 rounded-full border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-all shadow-inner"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown Results */}
        {isOpen && filteredResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
            <div className="p-2">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Quick Search Results ({filteredResults.length})
              </div>
              {filteredResults.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(item.url)}
                    className="w-full text-left p-3 hover:bg-blue-50/70 dark:hover:bg-slate-700/70 rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs sm:text-sm">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                          {item.type}
                        </div>
                      </div>
                    </div>
                    <span className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all text-xs font-bold">
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-5 text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm">
        <Link to="/semesters" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold">Semesters</Link>
        <Link to="/study-planner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Planner</Link>
        <Link to="/medicine-scanner" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Scanner</Link>
        <Link to="/ai-tutor" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold flex items-center gap-1">
          <Brain className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> AI Tutor
        </Link>
      </div>

      {/* Theme Toggle & Auth Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
        <Link to="/login" className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm rounded-full hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
