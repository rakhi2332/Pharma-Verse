import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Target, Sparkles, RefreshCw, 
  Zap, CheckSquare, Square
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../apiConfig';

const SUBJECT_OPTIONS = [
  'Pharmacology', 'Medicinal Chemistry', 'Pharmaceutics', 
  'Pharmaceutical Analysis', 'Pharmacognosy', 'Biochemistry', 
  'Physical Pharmaceutics', 'Pharmaceutical Biotechnology'
];

export default function StudyPlanner() {
  const [goal, setGoal] = useState('PCI University Semester Exams & GPAT 2025');
  const [semesterNumber, setSemesterNumber] = useState('4');
  const [hoursPerDay, setHoursPerDay] = useState('4');
  const [targetDays, setTargetDays] = useState('30');
  const [focusSubjects, setFocusSubjects] = useState(['Pharmacology', 'Medicinal Chemistry']);
  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});
  const [error, setError] = useState('');

  const toggleSubject = (subj) => {
    if (focusSubjects.includes(subj)) {
      setFocusSubjects(focusSubjects.filter(s => s !== subj));
    } else {
      if (focusSubjects.length >= 4) return;
      setFocusSubjects([...focusSubjects, subj]);
    }
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/study-planner/generate`, {
        goal,
        semesterNumber,
        hoursPerDay,
        targetDays,
        focusSubjects
      });

      setTimeout(() => {
        setPlanResult(response.data);
        setLoading(false);
      }, 600);
    } catch (err) {
      console.error(err);
      setError('Failed to generate study plan. Please try again.');
      setLoading(false);
    }
  };

  const toggleTaskCheck = (taskKey) => {
    setCheckedTasks({
      ...checkedTasks,
      [taskKey]: !checkedTasks[taskKey]
    });
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <Navbar />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-background text-white pt-16 pb-16 px-6 lg:px-12 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" /> B.Pharm & GPAT Personalized Schedule Generator
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
            AI Smart Study Planner
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Generate an intelligent, multi-phase daily study timetable tailored to your semester exam deadline, target study hours, and weak subject focus areas.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: PLANNER FORM SETUP */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-5">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Configure Study Parameters
              </h3>

              {/* Goal Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Target Exam / Goal:
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. PCI Semester 4 Exams & GPAT"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Semester & Target Days Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Semester:
                  </label>
                  <select
                    value={semesterNumber}
                    onChange={(e) => setSemesterNumber(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    Exam Deadline:
                  </label>
                  <select
                    value={targetDays}
                    onChange={(e) => setTargetDays(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15">15 Days (Sprint)</option>
                    <option value="30">30 Days (Standard)</option>
                    <option value="60">60 Days (Comprehensive)</option>
                    <option value="90">90 Days (Full Prep)</option>
                  </select>
                </div>
              </div>

              {/* Daily Hours Budget */}
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Daily Study Budget (Hours/Day):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['2', '4', '6', '8'].map(h => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHoursPerDay(h)}
                      className={`py-2 rounded-xl text-xs font-extrabold transition-all border ${
                        hoursPerDay === h
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {h} hrs
                    </button>
                  ))}
                </div>
              </div>

              {/* Weak Focus Subjects */}
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Select Focus / Weak Subjects (Max 4):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SUBJECT_OPTIONS.map(subj => {
                    const isSelected = focusSubjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => toggleSubject(subj)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-blue-100 text-blue-900 border-blue-300 font-extrabold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '} {subj}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Plan Button */}
              <button
                onClick={handleGeneratePlan}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculating Smart Timetable...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span>Generate AI Study Plan</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: GENERATED STUDY PLAN */}
          <div className="lg:col-span-2 space-y-6">

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm font-medium">
                {error}
              </div>
            )}

            {!planResult && !loading && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Create Your Custom Study Schedule</h3>
                <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                  Configure your exam deadline and daily hours budget on the left panel, then click "Generate AI Study Plan" to reveal your multi-phase timeline.
                </p>
                <button
                  onClick={handleGeneratePlan}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Generate Default 30-Day Plan</span>
                </button>
              </div>
            )}

            {planResult && !loading && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Summary Banner */}
                  <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        Semester {planResult.summary.semester} • {planResult.summary.targetDays} Days Plan
                      </span>

                      <Link
                        to="/ai-tutor"
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Ask AI Tutor for Revision Tips</span>
                      </Link>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-0.5">
                        Generated Study Routine:
                      </span>
                      <h2 className="text-2xl font-black text-white">{planResult.summary.goal}</h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Hours</span>
                        <span className="font-extrabold text-blue-400 text-base">{planResult.summary.totalStudyHours} hrs</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Budget</span>
                        <span className="font-extrabold text-emerald-400 text-base">{planResult.summary.dailyHours} hrs/day</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Focus Areas</span>
                        <span className="font-extrabold text-amber-300 text-xs line-clamp-1">{planResult.summary.focusSubjects.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Phase Timeline Cards */}
                  <div className="space-y-6">
                    {planResult.phases.map((phase, pIdx) => (
                      <div key={pIdx} className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-xs flex items-center justify-center">
                              P{pIdx + 1}
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-base">
                              {phase.phaseName}
                            </h3>
                          </div>

                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                            Duration: {phase.durationDays} Days ({phase.dailyHours} hrs/day)
                          </span>
                        </div>

                        {/* Objectives List */}
                        <div className="space-y-2">
                          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                            Key Milestone Objectives:
                          </span>
                          <div className="space-y-1.5">
                            {phase.objectives.map((obj, oIdx) => {
                              const taskKey = `${pIdx}-${oIdx}`;
                              const isChecked = Boolean(checkedTasks[taskKey]);
                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => toggleTaskCheck(taskKey)}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center gap-3 ${
                                    isChecked
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                                  )}
                                  <span className={isChecked ? 'line-through opacity-80' : ''}>{obj}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Daily Timetable Breakdown */}
                        <div className="space-y-2 pt-2">
                          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">
                            Daily Session Breakdown:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {phase.dailyTimetable.map((slot, sIdx) => (
                              <div key={sIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                                  <span>{slot.slot}</span>
                                  <span className="text-blue-700 font-extrabold text-[11px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                                    {slot.hours}
                                  </span>
                                </div>
                                <span className="text-[11px] font-extrabold text-indigo-600 block">{slot.focus}</span>
                                <p className="text-xs text-slate-600 leading-relaxed pt-0.5">{slot.activity}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 leading-relaxed border border-slate-200">
                    <strong>Note:</strong> {planResult.disclaimer}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
