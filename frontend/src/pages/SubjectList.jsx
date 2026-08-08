import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Loader2, BookMarked, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../apiConfig';

const subjectColors = [
  { bg: 'bg-sky-50/80', border: 'border-sky-200', accent: 'text-sky-600', badge: 'bg-sky-100 text-sky-700' },
  { bg: 'bg-violet-50/80', border: 'border-violet-200', accent: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  { bg: 'bg-emerald-50/80', border: 'border-emerald-200', accent: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  { bg: 'bg-amber-50/80', border: 'border-amber-200', accent: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  { bg: 'bg-rose-50/80', border: 'border-rose-200', accent: 'text-rose-600', badge: 'bg-rose-100 text-rose-700' },
  { bg: 'bg-teal-50/80', border: 'border-teal-200', accent: 'text-teal-600', badge: 'bg-teal-100 text-teal-700' },
  { bg: 'bg-indigo-50/80', border: 'border-indigo-200', accent: 'text-indigo-600', badge: 'bg-indigo-100 text-indigo-700' },
  { bg: 'bg-fuchsia-50/80', border: 'border-fuchsia-200', accent: 'text-fuchsia-600', badge: 'bg-fuchsia-100 text-fuchsia-700' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 22 }
  }
};

export default function SubjectList() {
  const { semesterId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectsRes, semesterRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/subjects/semester/${semesterId}`).catch(() => null),
          axios.get(`${API_BASE_URL}/semesters/${semesterId}`).catch(() => null)
        ]);

        if (subjectsRes?.data && subjectsRes.data.length > 0) {
          setSubjects(subjectsRes.data);
          if (semesterRes?.data) setSemester(semesterRes.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Backend API disconnected. Using offline PCI Subjects fallback.');
      }

      // Offline PCI Subjects Fallback
      const fallbackSemesterMap = {
        'sem-1': {
          semester: { title: 'Semester I', semesterNumber: 1 },
          subjects: [
            { _id: 'sub-hap1', code: 'BP101T', name: 'Human Anatomy and Physiology I', type: 'Theory', credits: 4, description: 'Study of cell, tissues, skeletal system, joints, blood, lymphatic system, peripheral nervous system & special senses.' },
            { _id: 'sub-[#00b0f0]', code: 'BP102T', name: 'Pharmaceutical Analysis I', type: 'Theory', credits: 4, description: 'Volumetric analysis, acid-base titrations, non-aqueous, precipitation, complexometric & redox titrations.' },
            { _id: 'sub-pharma1', code: 'BP103T', name: 'Pharmaceutics I', type: 'Theory', credits: 4, description: 'History of pharmacy, pharmacopoeias, dosage forms, posology, pharmaceutical calculations, monophasic/biphasic liquids & semisolids.' },
            { _id: 'sub-inorg', code: 'BP104T', name: 'Pharmaceutical Inorganic Chemistry', type: 'Theory', credits: 4, description: 'Impurities in pharmaceuticals, gastrointestinal agents, topical agents, dental products & radiopharmaceuticals.' }
          ]
        }
      };

      const matched = fallbackSemesterMap[semesterId] || {
        semester: { title: 'B.Pharmacy Semester', semesterNumber: 1 },
        subjects: [
          { _id: 'sub-hap1', code: 'BP101T', name: 'Human Anatomy and Physiology I', type: 'Theory', credits: 4, description: 'Cell, tissues, skeletal system, blood & cardiovascular systems.' },
          { _id: 'sub-[#00b0f0]', code: 'BP102T', name: 'Pharmaceutical Analysis I', type: 'Theory', credits: 4, description: 'Acid-base titrations, complexometry, redox & electrochemical methods.' },
          { _id: 'sub-pharma1', code: 'BP103T', name: 'Pharmaceutics I', type: 'Theory', credits: 4, description: 'Pharmacopoeias, dosage forms, calculations, liquids & semisolids.' }
        ]
      };

      setSemester(matched.semester);
      setSubjects(matched.subjects);
      setLoading(false);
    };
    fetchData();
  }, [semesterId]);

  const semNum = semester?.semesterNumber || '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-1/4 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/semesters" className="hover:text-primary transition-colors">Semesters</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-text-main font-medium">Semester {semNum}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/semesters"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Semesters
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <BookMarked className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
                  Semester {semNum}
                </h1>
              </div>
            </div>
            {semester?.description && (
              <p className="text-lg text-text-muted max-w-3xl mt-4">{semester.description}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold">
              <FileText className="w-4 h-4" />
              {subjects.length} {subjects.length === 1 ? 'Subject' : 'Subjects'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-text-muted font-medium">Loading subjects...</p>
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && subjects.length === 0 && (
          <div className="text-center py-24">
            <BookMarked className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text-main mb-2">No subjects found</h3>
            <p className="text-text-muted">Subjects for this semester haven't been added yet.</p>
          </div>
        )}

        {!loading && !error && subjects.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {subjects.map((subj, index) => {
              const color = subjectColors[index % subjectColors.length];
              return (
                <motion.div key={subj._id} variants={cardVariants}>
                  <Link
                    to={`/subjects/${subj._id}/content`}
                    className={`group block p-6 rounded-3xl ${color.bg} border ${color.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  >
                    {subj.code && (
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${color.badge} mb-4`}>
                        {subj.code}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-text-main mb-2 group-hover:text-primary transition-colors leading-snug">
                      {subj.name}
                    </h3>
                    {subj.description && (
                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3 mb-4">
                        {subj.description}
                      </p>
                    )}
                    <div className={`flex items-center gap-1.5 text-sm font-semibold ${color.accent} group-hover:gap-3 transition-all`}>
                      <FileText className="w-4 h-4" />
                      <span>View Notes</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
