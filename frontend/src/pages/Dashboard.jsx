import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { logout } from '../store/authSlice';
import { 
  BookOpen, 
  Brain, 
  Activity, 
  LogOut, 
  CheckCircle2, 
  Award, 
  Clock, 
  Calendar, 
  GitFork, 
  Scan, 
  Flame, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  Target,
  Gamepad2
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const studentName = user?.name || 'Pharma Student';
  const studentEmail = user?.email || 'student@pharmacy.edu';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="max-w-7xl w-full mx-auto p-6 md:p-10 space-y-10 flex-1">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-primary text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-2 z-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white/90 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Student Learning Portal
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Welcome back, {studentName}! 👋</h1>
            <p className="text-blue-100 text-sm md:text-base">
              Logged in as <span className="font-semibold text-white">{studentEmail}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all flex items-center gap-2 text-sm shrink-0 z-10 cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Primary Learning Hub */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" /> Core Curriculum & Exam Prep
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Semesters */}
            <Link
              to="/semesters"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">8 Semesters</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">B.Pharm Notes</h3>
                <p className="text-slate-500 text-sm mt-1">Access PCI syllabus notes, subject guides, and structured study materials for Sem 1 to 8.</p>
              </div>
              <div className="text-xs font-bold text-primary flex items-center gap-1">Browse Subjects <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* AI Tutor */}
            <Link
              to="/ai-tutor"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">24/7 AI Mentor</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">AI Tutor Chat</h3>
                <p className="text-slate-500 text-sm mt-1">Instant explanations for pharmacology mechanisms, SAR, equations, and lab concepts.</p>
              </div>
              <div className="text-xs font-bold text-indigo-600 flex items-center gap-1">Open AI Tutor <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* GPAT Prep */}
            <Link
              to="/gpat"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Mocks & MCQs</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">GPAT Prep Hub</h3>
                <p className="text-slate-500 text-sm mt-1">Practice topic MCQs, take timed full-length mock exams, and review high-yield answers.</p>
              </div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">Start Practice <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          </div>
        </div>

        {/* Interactive AI & Clinical Tools */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" /> Interactive Tools & Daily Challenges
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Drug Game */}
            <Link
              to="/drug-game"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col justify-between space-y-4 border-t-4 border-t-indigo-600"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">New Game</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Drug Challenge Game</h3>
                <p className="text-slate-500 text-sm mt-1">Timed speed quiz on drug mechanisms, chemical ring cores, and clinical ADME parameters.</p>
              </div>
              <div className="text-xs font-bold text-indigo-600 flex items-center gap-1">Play Drug Game <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* Study Planner */}
            <Link
              to="/study-planner"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">Schedule</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Study Planner</h3>
                <p className="text-slate-500 text-sm mt-1">Automated revision schedule, study goals, and exam milestone tracking.</p>
              </div>
              <div className="text-xs font-bold text-purple-600 flex items-center gap-1">Plan Schedule <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* Disease Maps */}
            <Link
              to="/disease-maps"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GitFork className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">Interactive</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Disease Maps</h3>
                <p className="text-slate-500 text-sm mt-1">Visual pathophysiology pathways, drug target receptors, and mechanism trees.</p>
              </div>
              <div className="text-xs font-bold text-teal-600 flex items-center gap-1">Explore Maps <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* Pill Scanner */}
            <Link
              to="/medicine-scanner"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-pink-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Scan className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">AI Vision</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors">Pill Scanner</h3>
                <p className="text-slate-500 text-sm mt-1">OCR label scanner to identify medications, dosages, and active ingredients.</p>
              </div>
              <div className="text-xs font-bold text-pink-600 flex items-center gap-1">Scan Pill <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>

            {/* Daily Challenges */}
            <Link
              to="/daily-challenges"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Daily Streak</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">Daily Challenges</h3>
                <p className="text-slate-500 text-sm mt-1">Daily MCQ quizzes, earn XP rewards, maintain streaks, and rise up leaderboards.</p>
              </div>
              <div className="text-xs font-bold text-amber-600 flex items-center gap-1">Start Quiz <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          </div>
        </div>

        {/* Safety & Clinical Tools */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 md:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Clinical Safety Checker</span>
              <h3 className="text-xl font-bold text-white">Drug Interaction Analyzer</h3>
              <p className="text-slate-300 text-sm mt-0.5">Evaluate multi-drug combinations for CYP450 inhibition, synergism, and toxicity risk factors.</p>
            </div>
          </div>
          <Link
            to="/drug-interaction"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm shrink-0"
          >
            Check Interactions <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Learning Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Subjects Covered</span>
              <p className="text-2xl font-extrabold text-slate-800">42 Subjects</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Daily Streak</span>
              <p className="text-2xl font-extrabold text-slate-800">5 Days 🔥</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Study Goal</span>
              <p className="text-2xl font-extrabold text-slate-800">On Track 🎯</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">GPAT Readiness</span>
              <p className="text-2xl font-extrabold text-slate-800">High Yield</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

