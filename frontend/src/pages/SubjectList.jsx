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

const PCI_SEMESTER_SUBJECTS = {
  1: {
    semester: { title: 'Semester I', semesterNumber: 1, description: 'Human Anatomy & Physiology I, Pharmaceutical Analysis I, Pharmaceutics I, Inorganic Chemistry' },
    subjects: [
      { _id: 'bp101t', code: 'BP101T', name: 'Human Anatomy and Physiology I', type: 'Theory', credits: 4, description: 'Study of cell, tissues, skeletal system, joints, blood, lymphatic system, peripheral nervous system & special senses.' },
      { _id: 'bp102t', code: 'BP102T', name: 'Pharmaceutical Analysis I', type: 'Theory', credits: 4, description: 'Volumetric analysis, acid-base titrations, non-aqueous, precipitation, complexometric & redox titrations.' },
      { _id: 'bp103t', code: 'BP103T', name: 'Pharmaceutics I', type: 'Theory', credits: 4, description: 'History of pharmacy, pharmacopoeias, dosage forms, posology, pharmaceutical calculations, monophasic/biphasic liquids & semisolids.' },
      { _id: 'bp104t', code: 'BP104T', name: 'Pharmaceutical Inorganic Chemistry', type: 'Theory', credits: 4, description: 'Impurities in pharmaceuticals, gastrointestinal agents, topical agents, dental products & radiopharmaceuticals.' }
    ]
  },
  2: {
    semester: { title: 'Semester II', semesterNumber: 2, description: 'Human Anatomy & Physiology II, Organic Chemistry I, Biochemistry, Pathophysiology' },
    subjects: [
      { _id: 'bp201t', code: 'BP201T', name: 'Human Anatomy and Physiology II', type: 'Theory', credits: 4, description: 'Nervous system, digestive system, respiratory system, endocrine system, urinary system & reproductive system.' },
      { _id: 'bp202t', code: 'BP202T', name: 'Pharmaceutical Organic Chemistry I', type: 'Theory', credits: 4, description: 'Isomerism, alkanes, alkenes, conjugated dienes, alkyl halides, alcohols, carbonyl compounds & carboxylic acids.' },
      { _id: 'bp203t', code: 'BP203T', name: 'Biochemistry', type: 'Theory', credits: 4, description: 'Biomolecules, bioenergetics, carbohydrate metabolism, lipid metabolism, amino acid metabolism & nucleic acids.' },
      { _id: 'bp204t', code: 'BP204T', name: 'Pathophysiology', type: 'Theory', credits: 4, description: 'Basic mechanisms of cell injury, inflammation, cardiovascular, endocrine, respiratory, renal & infectious diseases.' }
    ]
  },
  3: {
    semester: { title: 'Semester III', semesterNumber: 3, description: 'Organic Chemistry II, Physical Pharmaceutics I, Microbiology, Pharmaceutical Engineering' },
    subjects: [
      { _id: 'bp301t', code: 'BP301T', name: 'Pharmaceutical Organic Chemistry II', type: 'Theory', credits: 4, description: 'Benzene & derivatives, aromatic amines, fats & oils, polynuclear hydrocarbons & cycloalkanes.' },
      { _id: 'bp302t', code: 'BP302T', name: 'Physical Pharmaceutics I', type: 'Theory', credits: 4, description: 'Solubility of drugs, states of matter, surface & interfacial tension, complexation & buffer solutions.' },
      { _id: 'bp303t', code: 'BP303T', name: 'Pharmaceutical Microbiology', type: 'Theory', credits: 4, description: 'Morphology of bacteria & fungi, staining, sterilization, disinfectant evaluation & aseptic area layout.' },
      { _id: 'bp304t', code: 'BP304T', name: 'Pharmaceutical Engineering', type: 'Theory', credits: 4, description: 'Flow of fluids, size reduction, filtration, evaporation, distillation, drying, mixing & corrosion control.' }
    ]
  },
  4: {
    semester: { title: 'Semester IV', semesterNumber: 4, description: 'Organic Chemistry III, Medicinal Chemistry I, Physical Pharmaceutics II, Pharmacology I, Pharmacognosy I' },
    subjects: [
      { _id: 'bp401t', code: 'BP401T', name: 'Pharmaceutical Organic Chemistry III', type: 'Theory', credits: 4, description: 'Stereoisomerism, optical activity, geometrical isomerism, heterocyclic chemistry & reactions.' },
      { _id: 'bp402t', code: 'BP402T', name: 'Medicinal Chemistry I', type: 'Theory', credits: 4, description: 'Physicochemical parameters, autonomic nervous system agents, sedatives, hypnotics, NSAIDs & anesthetics.' },
      { _id: 'bp403t', code: 'BP403T', name: 'Physical Pharmaceutics II', type: 'Theory', credits: 4, description: 'Colloidal dispersions, rheology, coarse dispersions (suspensions/emulsions) & micromeritics.' },
      { _id: 'bp404t', code: 'BP404T', name: 'Pharmacology I', type: 'Theory', credits: 4, description: 'General pharmacology principles, ADME pharmacokinetics, pharmacodynamics, neurohumoral transmission & ANS drugs.' },
      { _id: 'bp405t', code: 'BP405T', name: 'Pharmacognosy and Phytochemistry I', type: 'Theory', credits: 4, description: 'Cultivation, collection, classification of crude drugs, plant tissue culture, primary & secondary metabolites.' }
    ]
  },
  5: {
    semester: { title: 'Semester V', semesterNumber: 5, description: 'Medicinal Chemistry II, Industrial Pharmacy I, Pharmacology II, Pharmacognosy II, Jurisprudence' },
    subjects: [
      { _id: 'bp501t', code: 'BP501T', name: 'Medicinal Chemistry II', type: 'Theory', credits: 4, description: 'Antihistamines, antineoplastic agents, cardiovascular drugs, antianginal, antiarrhythmics, antihypertensives & diuretics.' },
      { _id: 'bp502t', code: 'BP502T', name: 'Industrial Pharmacy I', type: 'Theory', credits: 4, description: 'Preformulation, tablets, liquid dosage forms, capsules, parenterals, ophthalmic preparations & cosmetics.' },
      { _id: 'bp503t', code: 'BP503T', name: 'Pharmacology II', type: 'Theory', credits: 4, description: 'Cardiovascular drugs, autacoids, endocrine pharmacology, oral hypoglycemics, bioassay principles & NSAIDs.' },
      { _id: 'bp504t', code: 'BP504T', name: 'Pharmacognosy and Phytochemistry II', type: 'Theory', credits: 4, description: 'Metabolic pathways (shikimic/acetate), isolation & identification of alkaloids, steroids, glycosides & resins.' },
      { _id: 'bp505t', code: 'BP505T', name: 'Pharmaceutical Jurisprudence', type: 'Theory', credits: 4, description: 'Drugs and Cosmetics Act 1940, Pharmacy Act, Narcotic Drugs Act, Medicinal & Toilet Preparations Act.' }
    ]
  },
  6: {
    semester: { title: 'Semester VI', semesterNumber: 6, description: 'Medicinal Chemistry III, Pharmacology III, Herbal Tech, Biopharmaceutics, Biotech, QA' },
    subjects: [
      { _id: 'bp601t', code: 'BP601T', name: 'Medicinal Chemistry III', type: 'Theory', credits: 4, description: 'Beta-lactam antibiotics, macrolides, quinolones, antimalarials, antitubercular, anti-HIV & SAR of anti-infectives.' },
      { _id: 'bp602t', code: 'BP602T', name: 'Pharmacology III', type: 'Theory', credits: 4, description: 'Chemotherapy of infectious diseases, cancer chemotherapy, immunopharmacology & toxicology principles.' },
      { _id: 'bp603t', code: 'BP603T', name: 'Herbal Drug Technology', type: 'Theory', credits: 4, description: 'Herbal medicine, nutraceuticals, herbal cosmetics, standardization of WHO herbal guidelines & patenting.' },
      { _id: 'bp604t', code: 'BP604T', name: 'Biopharmaceutics and Pharmacokinetics', type: 'Theory', credits: 4, description: 'Absorption, distribution, elimination kinetics, compartment models, bioavailability & bioequivalence studies.' },
      { _id: 'bp605t', code: 'BP605T', name: 'Pharmaceutical Biotechnology', type: 'Theory', credits: 4, description: 'Recombinant DNA technology, monoclonal antibodies, enzyme immobilization, biosensors & vaccines.' },
      { _id: 'bp606t', code: 'BP606T', name: 'Pharmaceutical Quality Assurance', type: 'Theory', credits: 4, description: 'cGMP principles, GLP, ISO 9000 quality management, ICH guidelines & pharmaceutical validation.' }
    ]
  },
  7: {
    semester: { title: 'Semester VII', semesterNumber: 7, description: 'Instrumental Analysis, Industrial Pharmacy II, Pharmacy Practice, Novel Drug Delivery Systems' },
    subjects: [
      { _id: 'bp701t', code: 'BP701T', name: 'Instrumental Methods of Analysis', type: 'Theory', credits: 4, description: 'UV-Visible spectroscopy, IR, NMR, Mass spectrometry, Fluorimetry, HPLC, GC, Column & Thin Layer Chromatography.' },
      { _id: 'bp702t', code: 'BP702T', name: 'Industrial Pharmacy II', type: 'Theory', credits: 4, description: 'Pilot plant scale-up techniques, technology transfer, SUPAC guidelines, regulatory affairs & ISO 14000.' },
      { _id: 'bp703t', code: 'BP703T', name: 'Pharmacy Practice', type: 'Theory', credits: 4, description: 'Hospital pharmacy, community pharmacy, ADR monitoring, drug information services, patient counseling & TDM.' },
      { _id: 'bp704t', code: 'BP704T', name: 'Novel Drug Delivery Systems (NDDS)', type: 'Theory', credits: 4, description: 'Controlled release polymers, microencapsulation, liposomes, niosomes, transdermal patches, targeted drug delivery.' }
    ]
  },
  8: {
    semester: { title: 'Semester VIII', semesterNumber: 8, description: 'Biostatistics, Social & Preventive Pharmacy, Pharma Marketing & Management' },
    subjects: [
      { _id: 'bp801t', code: 'BP801T', name: 'Biostatistics and Research Methodology', type: 'Theory', credits: 4, description: 'Parametric & non-parametric tests, t-test, ANOVA, Chi-square, regression analysis, DOE & research design.' },
      { _id: 'bp802t', code: 'BP802T', name: 'Social and Preventive Pharmacy', type: 'Theory', credits: 4, description: 'Public health programs, WHO disease prevention, nutrition, hygiene, maternal & child health care.' },
      { _id: 'bp803et', code: 'BP803ET', name: 'Pharmaceutical Marketing Management', type: 'Theory', credits: 4, description: 'Pharma market analysis, product management, pricing policies, promotional channels, detailing & sales force.' },
      { _id: 'bp804et', code: 'BP804ET', name: 'Pharmaceutical Regulatory Science', type: 'Theory', credits: 4, description: 'USFDA, EMA, CDSCO regulatory approval process, IND, NDA, ANDA filings & Orange Book specifications.' }
    ]
  }
};

export default function SubjectList() {
  const { semesterId } = useParams();

  // Instant zero-delay initial state calculation
  const initialCleanNum = parseInt(String(semesterId || '1').replace(/\D/g, '')) || 1;
  const initialData = PCI_SEMESTER_SUBJECTS[initialCleanNum] || PCI_SEMESTER_SUBJECTS[1];

  const [subjects, setSubjects] = useState(initialData.subjects);
  const [semester, setSemester] = useState(initialData.semester);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const cleanNum = parseInt(String(semesterId).replace(/\D/g, '')) || 1;
    const matchedData = PCI_SEMESTER_SUBJECTS[cleanNum] || PCI_SEMESTER_SUBJECTS[1];
    setSemester(matchedData.semester);
    setSubjects(matchedData.subjects);
    setLoading(false);

    // Silent background sync if backend available
    axios.get(`${API_BASE_URL}/subjects/semester/${semesterId}`, { timeout: 1500 })
      .then(res => {
        if (res.data && res.data.length > 0) {
          setSubjects(res.data);
        }
      })
      .catch(() => {});
  }, [semesterId]);

  const semNum = semester?.semesterNumber || (parseInt(String(semesterId).replace(/\D/g, '')) || 1);

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
                      <span>View Notes & PDF</span>
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
