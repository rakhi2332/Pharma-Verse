import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, AlertTriangle, Info, CheckCircle2, Plus, X, 
  Search, Sparkles, Pill, Activity, BookOpen, ChevronRight, RefreshCw, Zap
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const PRESET_PAIRINGS = [
  { name: 'Aspirin + Warfarin', drugs: ['Aspirin', 'Warfarin'], tag: 'Bleeding Risk' },
  { name: 'Digoxin + Amiodarone', drugs: ['Digoxin', 'Amiodarone'], tag: 'P-gp Inhibition' },
  { name: 'Simvastatin + Clarithromycin', drugs: ['Simvastatin', 'Clarithromycin'], tag: 'CYP3A4 Inhibition' },
  { name: 'Ciprofloxacin + Theophylline', drugs: ['Ciprofloxacin', 'Theophylline'], tag: 'CYP1A2 Toxicity' },
  { name: 'Clopidogrel + Omeprazole', drugs: ['Clopidogrel', 'Omeprazole'], tag: 'Prodrug Activation Block' },
  { name: 'Spironolactone + Enalapril', drugs: ['Spironolactone', 'Enalapril'], tag: 'Hyperkalemia' },
  { name: 'Fluoxetine + Selegiline', drugs: ['Fluoxetine', 'Selegiline'], tag: 'Serotonin Syndrome' },
];

const COMMON_DRUG_SUGGESTIONS = [
  'Aspirin', 'Warfarin', 'Digoxin', 'Amiodarone', 'Simvastatin', 'Clarithromycin', 
  'Ciprofloxacin', 'Theophylline', 'Clopidogrel', 'Omeprazole', 'Spironolactone', 
  'Enalapril', 'Fluoxetine', 'Selegiline', 'Metformin', 'Ibuprofen', 'Methotrexate'
];

export default function DrugInteraction() {
  const [selectedDrugs, setSelectedDrugs] = useState(['Aspirin', 'Warfarin']);
  const [inputDrug, setInputDrug] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAddDrug = (drugName) => {
    const trimmed = drugName.trim();
    if (!trimmed) return;
    if (selectedDrugs.some(d => d.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" is already in your selected drugs list.`);
      return;
    }
    if (selectedDrugs.length >= 5) {
      setError('You can analyze up to 5 drugs simultaneously.');
      return;
    }
    setError('');
    setSelectedDrugs([...selectedDrugs, trimmed]);
    setInputDrug('');
  };

  const handleRemoveDrug = (drugName) => {
    setSelectedDrugs(selectedDrugs.filter(d => d !== drugName));
  };

  const handleCheckInteractions = async () => {
    if (selectedDrugs.length < 2) {
      setError('Please add at least 2 drugs to analyze interactions.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/drug-interaction/check', {
        drugs: selectedDrugs
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze drug interactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (drugs) => {
    setSelectedDrugs(drugs);
    setError('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <Navbar />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-background text-white pt-16 pb-16 px-6 lg:px-12 border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" /> B.Pharm Clinical Pharmacology Tool
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Clinical Drug Interaction Checker
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">
            Analyze multi-drug regimens for CYP450 metabolic inhibition, P-glycoprotein efflux competition, pharmacodynamic synergism/antagonism, and clinical toxicity risk levels.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN: DRUG INPUT & PRESETS */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Drug Selection Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-600" />
                Select Drugs ({selectedDrugs.length}/5)
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Type a drug name or pick from common pharmacology presets.
              </p>

              {/* Selected Drugs Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDrugs.map(drug => (
                  <span
                    key={drug}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-xs border border-blue-200"
                  >
                    <span>{drug}</span>
                    <button
                      onClick={() => handleRemoveDrug(drug)}
                      className="hover:text-red-600 transition-colors"
                      title="Remove drug"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddDrug(inputDrug);
                }}
                className="flex gap-2 mb-4"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={inputDrug}
                    onChange={(e) => setInputDrug(e.target.value)}
                    placeholder="Type drug name (e.g. Warfarin)"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>

              {/* Quick Suggestion Tags */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Add Common Drugs:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_DRUG_SUGGESTIONS.map(drug => {
                    const isSelected = selectedDrugs.some(d => d.toLowerCase() === drug.toLowerCase());
                    return (
                      <button
                        key={drug}
                        onClick={() => handleAddDrug(drug)}
                        disabled={isSelected}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800'
                        }`}
                      >
                        + {drug}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={handleCheckInteractions}
                disabled={loading || selectedDrugs.length < 2}
                className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  selectedDrugs.length < 2
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Clinical Interactions...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span>Check Interactions ({selectedDrugs.length} Drugs)</span>
                  </>
                )}
              </button>
            </div>

            {/* High-Yield GPAT Presets */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md">
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>High-Yield GPAT & Exam Combinations</span>
              </h4>
              <div className="space-y-2">
                {PRESET_PAIRINGS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handleApplyPreset(preset.drugs)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-xs block group-hover:text-blue-700">{preset.name}</span>
                      <span className="text-[10px] font-semibold text-slate-500">{preset.tag}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTION RESULTS */}
          <div className="lg:col-span-2 space-y-6">

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {!result && !loading && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Analyze Drug Interactions</h3>
                <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                  Select at least 2 drugs on the left panel or choose a high-yield GPAT combination to generate an instant clinical pharmacology interaction report.
                </p>
                <button
                  onClick={handleCheckInteractions}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Analyze Selected Pair ({selectedDrugs.join(' + ')})</span>
                </button>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Result Overview Header */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-400 block mb-1">
                      Clinical Analysis Report
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {result.queriedDrugs.join(' + ')}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {result.interactionCount > 0 ? (
                      <span className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-extrabold rounded-xl flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-red-400" />
                        {result.interactionCount} Significant Interaction(s) Found
                      </span>
                    ) : (
                      <span className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        No Known Major Interaction
                      </span>
                    )}
                  </div>
                </div>

                {/* Interaction Cards */}
                {result.interactions.length === 0 ? (
                  <div className="bg-emerald-50/70 border border-emerald-200 p-8 rounded-3xl text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-emerald-950 text-lg">No High-Risk Major Interaction Detected</h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                      No documented major CYP450 or P-gp competitive toxicity identified between {result.queriedDrugs.join(' and ')}. Always confirm with clinical patient monitoring.
                    </p>
                  </div>
                ) : (
                  result.interactions.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-5 hover:shadow-lg transition-all"
                    >
                      {/* Interaction Badge Bar */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-red-100 text-red-700 font-extrabold text-xs flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-base">
                            {item.drug1.toUpperCase()} ↔ {item.drug2.toUpperCase()}
                          </h4>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                          item.severity.toLowerCase().includes('major')
                            ? 'bg-red-100 text-red-800 border-red-200'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}>
                          Severity: {item.severity}
                        </span>
                      </div>

                      {/* Risk Level Highlight */}
                      <div className="bg-red-50/80 border border-red-200/80 p-4 rounded-2xl flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-extrabold text-red-950 uppercase tracking-wider block">Risk Level & Primary Danger:</span>
                          <p className="text-sm font-bold text-red-900 mt-0.5">{item.riskLevel}</p>
                        </div>
                      </div>

                      {/* Mechanism of Interaction */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-blue-600" />
                          Pharmacological Mechanism:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-medium">
                          {item.mechanism}
                        </p>
                      </div>

                      {/* Clinical Effects */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider block flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-amber-600" />
                          Clinical Consequences & Symptoms:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                          {item.clinicalEffects}
                        </p>
                      </div>

                      {/* Pharmacist Management */}
                      <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl space-y-1">
                        <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wider block flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Pharmacist Clinical Management & Dosage Adjustments:
                        </span>
                        <p className="text-xs text-blue-900 leading-relaxed font-medium">
                          {item.management}
                        </p>
                      </div>

                      {/* Ask AI Tutor Link */}
                      <div className="pt-2 flex justify-end">
                        <Link
                          to="/ai-tutor"
                          className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl border border-purple-200 transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Ask AI Tutor details about {item.drug1} + {item.drug2}</span>
                        </Link>
                      </div>
                    </div>
                  ))
                )}

                {/* Disclaimer */}
                <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 leading-relaxed border border-slate-200">
                  <strong>Disclaimer:</strong> {result.disclaimer}
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
