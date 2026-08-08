import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, Activity, Pill, Sparkles, 
  ChevronRight, RefreshCw, Layers, Lightbulb, CheckCircle,
  Search, ShieldAlert, HeartPulse, Stethoscope, AlertTriangle, FileText, ClipboardList
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function DiseaseMaps() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/disease-maps');
      setMaps(response.data);
      if (response.data.length > 0) {
        setSelectedMap(response.data[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load disease learning maps. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(maps.map(m => m.category))];

  const filteredMaps = maps.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesQuery = searchQuery === '' || 
      m.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.icdCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-text-main pb-24">
      <Navbar />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 text-white pt-16 pb-16 px-6 lg:px-12 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/3 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-teal-400" /> Clinical Pharmacotherapeutics & Pathology Mind Maps
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Disease-Drug Learning Pathways & Clinical Mind Maps
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            In-depth visual pharmacotherapeutics: Diagnostic lab criteria, etiology & pathophysiology, multi-step treatment algorithms, drug doses, mechanisms, special populations (pregnancy/renal), interactions, and GPAT high-yield tips.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl relative pt-2">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by disease name, category, or ICD code..."
              className="w-full bg-slate-800/90 text-white pl-12 pr-4 py-3.5 rounded-2xl border border-slate-700 focus:border-teal-400 focus:outline-none text-sm placeholder-slate-400 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">

        {/* Category Filter Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-medium text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="py-24 text-center">
            <RefreshCw className="w-10 h-10 text-teal-600 animate-spin mx-auto mb-3" />
            <p className="text-slate-500 font-bold text-sm">Loading comprehensive disease mind maps...</p>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: DISEASE SELECTOR LIST */}
            <div className="lg:col-span-1 space-y-3">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                Select Disease ({filteredMaps.length}):
              </span>

              {filteredMaps.map(map => {
                const isSelected = selectedMap?.id === map.id;
                return (
                  <button
                    key={map.id}
                    onClick={() => setSelectedMap(map)}
                    className={`w-full text-left p-5 rounded-3xl border transition-all flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-teal-500 shadow-xl'
                        : 'bg-white hover:bg-teal-50/60 border-slate-200 hover:border-teal-300 text-slate-900 shadow-sm'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider block mb-1 ${
                        isSelected ? 'text-teal-400' : 'text-teal-600'
                      }`}>
                        {map.category} • ICD {map.icdCode}
                      </span>
                      <h4 className="font-bold text-sm leading-snug">{map.diseaseName}</h4>
                    </div>

                    <ChevronRight className={`w-5 h-5 transition-transform ${
                      isSelected ? 'text-teal-400 translate-x-1' : 'text-slate-400 group-hover:text-teal-600'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* RIGHT COLUMN: INTERACTIVE DETAILED CLINICAL MAP VIEW */}
            <div className="lg:col-span-2 space-y-6">
              {selectedMap && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMap.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6"
                  >
                    {/* Disease Header Summary Card */}
                    <div className="bg-slate-900 text-white p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          {selectedMap.category} • ICD {selectedMap.icdCode}
                        </span>
                        <Link
                          to="/ai-tutor"
                          className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>Ask AI Tutor about {selectedMap.diseaseName}</span>
                        </Link>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-white">{selectedMap.diseaseName}</h2>

                      <div className="bg-slate-800/90 p-4.5 rounded-2xl border border-slate-700/80 space-y-1.5">
                        <span className="text-[11px] font-extrabold text-teal-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-teal-400" /> Etiology & Pathophysiology:
                        </span>
                        <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">{selectedMap.pathophysiology}</p>
                      </div>
                    </div>

                    {/* Diagnostic Criteria & Biomarkers */}
                    {selectedMap.diagnosticCriteria && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <Stethoscope className="w-4.5 h-4.5 text-blue-600" />
                          <span>Diagnostic Criteria & Clinical Biomarkers</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedMap.diagnosticCriteria.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-blue-50/70 p-3 rounded-xl border border-blue-100 text-xs text-blue-950 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lifestyle Interventions */}
                    {selectedMap.lifestyleInterventions && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <HeartPulse className="w-4.5 h-4.5 text-emerald-600" />
                          <span>Lifestyle & Non-Pharmacological Interventions</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedMap.lifestyleInterventions.map((life, idx) => (
                            <div key={idx} className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950 font-medium flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{life}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Treatment Algorithm */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-teal-600" />
                        <span>Pharmacotherapeutic Treatment Algorithm</span>
                      </h3>

                      {selectedMap.treatmentAlgorithm?.map((stepObj, sIdx) => (
                        <div key={sIdx} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-4">
                          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                              S{stepObj.step}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                              {stepObj.stage}
                            </h4>
                          </div>

                          {stepObj.recommendation && (
                            <p className="text-xs font-bold text-teal-900 bg-teal-50 p-4 rounded-2xl border border-teal-200 leading-relaxed">
                              💡 {stepObj.recommendation}
                            </p>
                          )}

                          {stepObj.drugClasses?.map((cls, cIdx) => (
                            <div key={cIdx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h5 className="font-extrabold text-teal-950 text-sm flex items-center gap-2">
                                  <Pill className="w-4 h-4 text-teal-600" />
                                  {cls.className}
                                </h5>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                  Drug Class
                                </span>
                              </div>

                              <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                                <strong>Mechanism of Action:</strong> {cls.mechanism}
                              </p>

                              {/* Specific Drug Molecules & Dosages */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                {cls.drugs?.map((drug, dIdx) => (
                                  <div key={dIdx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                                    <div className="flex items-center justify-between font-bold text-slate-900">
                                      <span>{drug.name}</span>
                                      <span className="text-teal-700 font-extrabold text-[11px] bg-teal-50 px-2 py-0.5 rounded-md">
                                        {drug.dose}
                                      </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500">{drug.note}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Side Effects & Contraindications */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium">
                                  <strong>Side Effects:</strong> {cls.keySideEffect}
                                </div>
                                <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-950 font-medium">
                                  <strong>Contraindication:</strong> {cls.contraindication}
                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* Special Populations (Pregnancy / Renal) */}
                    {selectedMap.specialPopulations && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <FileText className="w-4.5 h-4.5 text-purple-600" />
                          <span>Special Populations & Clinical Selection</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2.5">
                          {selectedMap.specialPopulations.map((sp, idx) => (
                            <div key={idx} className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-xs text-purple-950 space-y-0.5">
                              {typeof sp === 'string' ? (
                                <p className="text-purple-950 font-medium">{sp}</p>
                              ) : (
                                <>
                                  <span className="font-extrabold text-purple-900 block">{sp.condition}:</span>
                                  <p className="text-purple-950">{sp.choice}</p>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Drug Interactions & Safety Warnings */}
                    {selectedMap.drugInteractions && (
                      <div className="bg-gradient-to-r from-red-950 to-slate-900 text-white p-6 rounded-3xl border border-red-500/30 shadow-lg space-y-3">
                        <h3 className="text-sm font-extrabold text-red-300 flex items-center gap-2">
                          <ShieldAlert className="w-4.5 h-4.5 text-red-400" />
                          <span>Critical Drug Interactions & Toxicity Warnings</span>
                        </h3>
                        <div className="space-y-2">
                          {selectedMap.drugInteractions.map((warn, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-red-900/40 p-3.5 rounded-xl border border-red-500/30 text-xs text-red-100">
                              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                              <span>{warn}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Monitoring Parameters */}
                    {selectedMap.monitoringParameters && (
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
                        <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                          <ClipboardList className="w-4.5 h-4.5 text-teal-600" />
                          <span>Laboratory Monitoring & Follow-up Parameters</span>
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedMap.monitoringParameters.map((mon, idx) => (
                            <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
                              <span>{mon}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* GPAT Exam Mind Map Tips */}
                    {selectedMap.gpatMindMapTips && (
                      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6.5 rounded-3xl shadow-xl space-y-3 border border-purple-500/40">
                        <h4 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                          <Lightbulb className="w-4.5 h-4.5 text-amber-300" />
                          <span>GPAT & NIPER High-Yield Mind Map Exam Notes:</span>
                        </h4>
                        <ul className="space-y-2.5 text-xs text-purple-100">
                          {selectedMap.gpatMindMapTips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5 bg-purple-950/60 p-3.5 rounded-xl border border-purple-500/30">
                              <CheckCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

