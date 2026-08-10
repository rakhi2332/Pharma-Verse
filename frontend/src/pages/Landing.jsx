import { Link } from 'react-router-dom';
import { 
  Pill, 
  BookOpen, 
  Brain, 
  Activity, 
  Calendar, 
  GitFork, 
  Scan, 
  Flame, 
  ShieldAlert, 
  Sparkles,
  ArrowRight,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-text-main flex flex-col transition-colors">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 md:p-6 lg:px-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <Pill className="text-primary w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">PharmaVerse</span>
        </Link>

        {/* Quick Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-text-muted text-sm font-medium">
          <Link to="/semesters" className="hover:text-primary transition-colors">Semesters</Link>
          <Link to="/study-planner" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> Study Planner
          </Link>
          <Link to="/disease-maps" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Disease Maps
          </Link>
          <Link to="/medicine-scanner" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> Pill Scanner
          </Link>
          <Link to="/daily-challenges" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Daily Challenges
          </Link>
          <Link to="/ai-tutor" className="hover:text-primary transition-colors">AI Tutor</Link>
          <Link to="/gpat" className="hover:text-primary transition-colors">GPAT Prep</Link>
        </div>

        {/* Theme Toggle Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:py-28 lg:px-12 flex flex-col items-center text-center overflow-hidden">
          {/* Background Blur Orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full -z-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute top-30 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            India's #1 B.Pharmacy Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text-main tracking-tight max-w-5xl leading-tight">
            Master Pharmacy <span className="bg-gradient-to-r from-primary via-indigo-600 to-purple-600 bg-clip-text text-transparent">Smarter with AI</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-text-muted max-w-3xl leading-relaxed">
            The all-in-one platform for B.Pharmacy students. Access semester notes, AI study planners, disease maps, optical pill scanning, daily quiz challenges, and 24/7 AI tutoring.
          </p>

          {/* Quick Action Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl">
            <Link to="/study-planner" className="px-5 py-3 bg-purple-600 text-white font-semibold rounded-2xl hover:bg-purple-700 shadow-md transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Study Planner
            </Link>
            <Link to="/disease-maps" className="px-5 py-3 bg-teal-600 text-white font-semibold rounded-2xl hover:bg-teal-700 shadow-md transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <GitFork className="w-4 h-4" /> Disease Maps
            </Link>
            <Link to="/medicine-scanner" className="px-5 py-3 bg-pink-600 text-white font-semibold rounded-2xl hover:bg-pink-700 shadow-md transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <Scan className="w-4 h-4" /> Pill Scanner
            </Link>
            <Link to="/daily-challenges" className="px-5 py-3 bg-amber-500 text-slate-950 font-bold rounded-2xl hover:bg-amber-400 shadow-md transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-slate-950" /> Daily Challenges
            </Link>
            <Link to="/ai-tutor" className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 shadow-md transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <Brain className="w-4 h-4" /> Ask AI Tutor
            </Link>
            <Link to="/semesters" className="px-5 py-3 bg-white text-text-main border border-slate-200 font-semibold rounded-2xl hover:bg-slate-50 shadow-sm transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> B.Pharm Notes
            </Link>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="features" className="py-20 bg-slate-50 border-t border-slate-100 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-3 py-1 rounded-full">Explore Features</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">Everything You Need to Excel</h2>
              <p className="text-lg text-slate-600">From PCI syllabus notes and AI tutoring to interactive disease maps and daily quiz streaks.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Study Planner */}
              <Link to="/study-planner" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">Smart Planner</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-purple-600 transition-colors">Study Planner</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Automated study schedules, topic revision milestones, and exam readiness trackers tailored for pharmacy exams.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-purple-600 flex items-center gap-1">Open Planner <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* Disease Maps */}
              <Link to="/disease-maps" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                    <GitFork className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">Interactive Visualizer</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-teal-600 transition-colors">Disease Maps</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Visual pathophysiology pathways, drug target receptors, and step-by-step mechanism flowcharts.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-teal-600 flex items-center gap-1">Explore Maps <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* Pill Scanner */}
              <Link to="/medicine-scanner" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-pink-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                    <Scan className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md">AI OCR Vision</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-pink-600 transition-colors">Pill Scanner</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Upload or scan prescription labels to identify active drug ingredients, dosages, and therapeutic uses.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-pink-600 flex items-center gap-1">Scan Pill <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* Daily Challenges */}
              <Link to="/daily-challenges" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                    <Flame className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">Gamified MCQs</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-amber-600 transition-colors">Daily Challenges</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Test your pharma knowledge daily with timed MCQs, earn XP points, and maintain daily learning streaks.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-amber-600 flex items-center gap-1">Start Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* Semester-wise Notes */}
              <Link to="/semesters" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">8 Semesters</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-blue-600 transition-colors">Semester Notes</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Organized study materials, rich notes, and PCI syllabus textbook explanations for Semesters 1 to 8.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-blue-600 flex items-center gap-1">Browse Semesters <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* AI Tutor */}
              <Link to="/ai-tutor" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                    <Brain className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">24/7 AI Mentor</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-indigo-600 transition-colors">AI Tutor</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Personalized AI mentor to explain complex SAR mechanisms, lab protocols, and answer questions instanty.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-indigo-600 flex items-center gap-1">Chat with AI <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* GPAT Preparation */}
              <Link to="/gpat" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                    <Activity className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Mocks & MCQs</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-emerald-600 transition-colors">GPAT Prep Hub</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Dedicated mock test series, subject-wise MCQs, and detailed solution breakdowns for GPAT aspirants.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-emerald-600 flex items-center gap-1">Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>

              {/* Drug Interactions */}
              <Link to="/drug-interaction" className="block p-7 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">Clinical Safety</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3 mb-2 group-hover:text-amber-600 transition-colors">Drug Interactions</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Analyze multi-drug combinations for CYP450 enzyme inhibition, synergism, and toxicity risk factors.</p>
                </div>
                <div className="mt-6 text-xs font-bold text-amber-600 flex items-center gap-1">Check Safety <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

