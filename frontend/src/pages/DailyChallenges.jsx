import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Flame, Award, CheckCircle2, XCircle, Sparkles, 
  RefreshCw, Star, Target, Zap, Shield
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function DailyChallenges() {
  const [activeTab, setActiveTab] = useState('challenge'); // 'challenge' | 'leaderboard'
  const [challenge, setChallenge] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [studentName, setStudentName] = useState(localStorage.getItem('studentName') || '');
  const [studentCollege, setStudentCollege] = useState(localStorage.getItem('studentCollege') || '');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const challengeRes = await axios.get('http://localhost:5000/api/challenges/today');
      setChallenge(challengeRes.data);

      const leaderRes = await axios.get('http://localhost:5000/api/challenges/leaderboard');
      setLeaderboard(leaderRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load daily challenge data. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIndex, optionIndex) => {
    if (submissionResult) return; // Prevent changing after submit
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: optionIndex
    });
  };

  const handleSubmitChallenge = async () => {
    if (!challenge) return;
    const totalQs = challenge.questions?.length || 5;
    if (Object.keys(userAnswers).length < totalQs) {
      setError(`Please answer all ${totalQs} questions before submitting.`);
      return;
    }

    setSubmitting(true);
    setError('');

    const nameToUse = studentName.trim() || 'Pharmacy Student';
    localStorage.setItem('studentName', nameToUse);
    if (studentCollege) localStorage.setItem('studentCollege', studentCollege);

    try {
      const response = await axios.post('http://localhost:5000/api/challenges/submit', {
        challengeId: challenge._id,
        answers: userAnswers,
        studentName: nameToUse,
        college: studentCollege.trim() || 'PCI B.Pharm College',
        semester: 4
      });

      setSubmissionResult(response.data);

      // Refresh leaderboard after submission
      const leaderRes = await axios.get('http://localhost:5000/api/challenges/leaderboard');
      setLeaderboard(leaderRes.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to submit challenge. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <Navbar />

      {/* Header Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-purple-950 via-slate-900 to-background text-white pt-16 pb-16 px-6 lg:px-12 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Daily B.Pharm Activity Streak
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
              Daily Challenges & Leaderboard
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Test your pharmacology, pharmaceutics & medicinal chemistry knowledge daily, earn XP points, build your study streak, and climb the national B.Pharm student rank leaderboard!
            </p>
          </div>

          {/* Quick Stats Widget */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl flex items-center gap-6 shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-2xl">
                <Flame className="w-6 h-6 fill-amber-400" />
                <span>{submissionResult?.studentRankData?.streakDays || 1}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Day Streak</span>
            </div>

            <div className="w-px h-10 bg-slate-800"></div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-400 font-black text-2xl">
                <Star className="w-6 h-6 fill-purple-400" />
                <span>{submissionResult?.studentRankData?.xpPoints || 120}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">XP Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">

        {/* Tab Controls */}
        <div className="flex gap-3 mb-8 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'challenge'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Today's Daily Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-2xl font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'leaderboard'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>National Student Leaderboard ({leaderboard.length})</span>
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-medium text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="py-24 text-center">
            <RefreshCw className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Loading daily challenge questions & leaderboard...</p>
          </div>
        )}

        {/* TAB 1: DAILY CHALLENGE QUIZ */}
        {!loading && activeTab === 'challenge' && challenge && (
          <div className="space-y-8">
            
            {/* Student Info Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>{challenge.title}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Answer 5 high-yield GPAT/PCI MCQs to earn up to +50 XP and maintain your daily study streak.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Your Name (e.g. Rahul Verma)"
                  className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={studentCollege}
                  onChange={(e) => setStudentCollege(e.target.value)}
                  placeholder="Pharmacy College / University"
                  className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Submission Result Announcement */}
            {submissionResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-4 border border-purple-500/40"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-2xl">
                      {submissionResult.score}/{submissionResult.totalQuestions}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Challenge Completed!</span>
                      <h3 className="text-xl font-extrabold text-white">
                        {submissionResult.score === submissionResult.totalQuestions
                          ? '🎉 Perfect Score! Master Pharmacist!'
                          : `Great Effort! You earned +${submissionResult.earnedXp} XP`}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Ranked on National B.Pharm Leaderboard • Current Badge: <strong className="text-amber-400">{submissionResult.studentRankData?.badge || 'Pharma Scholar'}</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('leaderboard')}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>View National Leaderboard</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Question Cards */}
            <div className="space-y-6">
              {challenge.questions.map((q, qIdx) => {
                const selectedOpt = userAnswers[qIdx];
                const resultItem = submissionResult?.questionResults?.find(r => r.questionIndex === qIdx);

                return (
                  <div
                    key={qIdx}
                    className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-100 pb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                        Question {qIdx + 1} of {challenge.questions.length} • {q.subject || 'Pharmacology'}
                      </span>
                      {resultItem && (
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                          resultItem.isCorrect
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                          {resultItem.isCorrect ? (
                            <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct (+10 XP)</>
                          ) : (
                            <><XCircle className="w-3.5 h-3.5 text-red-600" /> Incorrect</>
                          )}
                        </span>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>

                    {/* Options List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        let optionStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-purple-50 hover:border-purple-200';

                        if (resultItem) {
                          if (optIdx === q.correctAnswer) {
                            optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isSelected && !resultItem.isCorrect) {
                            optionStyle = 'bg-red-50 border-red-400 text-red-950 font-bold';
                          } else {
                            optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-purple-50 border-purple-600 text-purple-950 font-bold shadow-sm';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(qIdx, optIdx)}
                            disabled={Boolean(submissionResult)}
                            className={`p-4 rounded-2xl border text-left text-xs transition-all flex items-center gap-3 ${optionStyle}`}
                          >
                            <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                              isSelected ? 'bg-purple-600 text-white' : 'bg-white border text-slate-600'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {resultItem && (
                      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl text-xs text-purple-950 space-y-1">
                        <span className="font-extrabold text-purple-900 uppercase tracking-wider block flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Clinical Pharmacology Explanation:
                        </span>
                        <p className="leading-relaxed font-medium">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Quiz Action */}
            {!submissionResult && (
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleSubmitChallenge}
                  disabled={submitting || Object.keys(userAnswers).length < challenge.questions.length}
                  className={`px-10 py-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center gap-2 ${
                    Object.keys(userAnswers).length < challenge.questions.length
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30 hover:scale-105 active:scale-95'
                  }`}
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Submitting Challenge...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-yellow-300" />
                      <span>Submit Today's Challenge & Claim XP</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: NATIONAL B.PHARM LEADERBOARD */}
        {!loading && activeTab === 'leaderboard' && (
          <div className="space-y-6">
            
            <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 p-6 rounded-3xl shadow-lg flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-6 h-6 text-slate-950 fill-slate-950" />
                  <h3 className="font-black text-slate-950 text-xl">National B.Pharm Student Rank Leaderboard</h3>
                </div>
                <p className="text-xs text-slate-900 font-semibold max-w-2xl leading-relaxed">
                  Rankings updated daily based on challenge accuracy, XP points accumulated, and daily study streak consistency.
                </p>
              </div>

              <span className="px-4 py-2 bg-slate-950 text-amber-300 font-extrabold text-xs rounded-xl shadow-md shrink-0">
                Top B.Pharm Rankers
              </span>
            </div>

            {/* Rank Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-extrabold uppercase tracking-wider">
                    <tr>
                      <th className="p-4 pl-6">Rank</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">College / University</th>
                      <th className="p-4 text-center">Badge</th>
                      <th className="p-4 text-center">Streak</th>
                      <th className="p-4 pr-6 text-right">Total XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leaderboard.map((item, idx) => (
                      <tr
                        key={item._id || idx}
                        className={`hover:bg-slate-50 transition-colors ${
                          idx === 0
                            ? 'bg-amber-50/50 font-bold'
                            : idx === 1
                            ? 'bg-slate-50/70 font-semibold'
                            : idx === 2
                            ? 'bg-orange-50/40 font-semibold'
                            : ''
                        }`}
                      >
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-2">
                            {idx === 0 ? (
                              <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shadow-sm">
                                🥇 1
                              </span>
                            ) : idx === 1 ? (
                              <span className="w-7 h-7 rounded-xl bg-slate-300 text-slate-900 font-black flex items-center justify-center shadow-sm">
                                🥈 2
                              </span>
                            ) : idx === 2 ? (
                              <span className="w-7 h-7 rounded-xl bg-amber-700 text-white font-black flex items-center justify-center shadow-sm">
                                🥉 3
                              </span>
                            ) : (
                              <span className="w-7 h-7 rounded-xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center">
                                #{idx + 1}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="p-4 font-extrabold text-slate-900">
                          {item.studentName}
                        </td>

                        <td className="p-4 text-slate-500 font-medium">
                          {item.college || 'PCI Pharmacy Institute'} (Sem {item.semester || 4})
                        </td>

                        <td className="p-4 text-center">
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 inline-flex items-center gap-1">
                            <Award className="w-3 h-3 text-purple-600" />
                            {item.badge}
                          </span>
                        </td>

                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {item.streakDays} Days
                          </span>
                        </td>

                        <td className="p-4 pr-6 text-right font-black text-purple-700 text-sm">
                          {item.xpPoints} XP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
