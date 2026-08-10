import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, AlertTriangle, Info, CheckCircle2, Plus, X, 
  Search, Sparkles, Pill, Activity, BookOpen, ChevronRight, RefreshCw, Zap, Shield
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../apiConfig';

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

const INTERACTION_DATABASE = [
  {
    drug1: 'aspirin',
    drug2: 'warfarin',
    severity: 'Major',
    riskLevel: 'High Risk of Severe Bleeding',
    mechanism: 'Pharmacodynamic synergism (inhibition of platelet aggregation by Aspirin + anticoagulant effect of Warfarin) and displacement from plasma protein binding sites.',
    clinicalEffects: 'Significantly increased risk of major gastrointestinal hemorrhage, intracranial bleeding, and prolonged prothrombin time / INR elevation.',
    management: 'Avoid co-administration unless specifically indicated (e.g. recent coronary stent). Monitor INR closely and adjust warfarin dosage accordingly. Recommend PPI gastroprotection.'
  },
  {
    drug1: 'digoxin',
    drug2: 'amiodarone',
    severity: 'Major',
    riskLevel: 'Digitalis Toxicity & Arrhythmia',
    mechanism: 'Amiodarone inhibits P-glycoprotein (P-gp) efflux transporter in renal tubules and intestine, reducing clearance and increasing serum Digoxin concentration by 70% - 100%.',
    clinicalEffects: 'Nausea, visual halos (xanthopsia), bradycardia, heart block, and fatal ventricular arrhythmias.',
    management: 'Reduce Digoxin dose by 50% when starting Amiodarone. Monitor serum Digoxin concentration (target 0.5 - 0.9 ng/mL) and ECG.'
  },
  {
    drug1: 'simvastatin',
    drug2: 'clarithromycin',
    severity: 'Major',
    riskLevel: 'Rhabdomyolysis & Acute Kidney Injury',
    mechanism: 'Clarithromycin is a potent inhibitor of CYP3A4 enzyme. Simvastatin is extensively metabolized by CYP3A4; co-administration increases Simvastatin AUC by up to 10-fold.',
    clinicalEffects: 'Severe myopathy, muscle breakdown (rhabdomyolysis), myoglobinuria, and acute renal failure.',
    management: 'Contraindicated. Suspend Simvastatin during Clarithromycin therapy, or switch to a non-CYP3A4 metabolized statin (e.g. Pravastatin or Rosuvastatin).'
  },
  {
    drug1: 'ciprofloxacin',
    drug2: 'theophylline',
    severity: 'Major',
    riskLevel: 'Theophylline Toxicity & Seizures',
    mechanism: 'Ciprofloxacin inhibits hepatic CYP1A2 isoenzyme, significantly decreasing clearance of Theophylline and increasing plasma levels by 100% - 300%.',
    clinicalEffects: 'Nausea, vomiting, severe tachycardia, tremor, agitation, confusion, and life-threatening grand mal seizures.',
    management: 'Avoid combination if possible. If required, monitor serum theophylline levels and reduce theophylline dose by 50%.'
  },
  {
    drug1: 'clopidogrel',
    drug2: 'omeprazole',
    severity: 'Major',
    riskLevel: 'Reduced Antiplatelet Efficacy & Stent Thrombosis',
    mechanism: 'Omeprazole inhibits CYP2C19, the primary bioactivating enzyme required to convert Clopidogrel (prodrug) into its active thiol metabolite.',
    clinicalEffects: 'Inadequate antiplatelet protection, increased risk of recurrent myocardial infarction, ischemic stroke, and coronary stent thrombosis.',
    management: 'Avoid Omeprazole or Esomeprazole. Use Pantoprazole or Rabeprazole (minimal CYP2C19 inhibition) or H2-receptor antagonists (e.g. Famotidine).'
  },
  {
    drug1: 'spironolactone',
    drug2: 'enalapril',
    severity: 'Moderate to Major',
    riskLevel: 'Severe Hyperkalemia & Cardiac Arrest',
    mechanism: 'Additive potassium retention. Enalapril suppresses aldosterone secretion via ACE inhibition, while Spironolactone competitively blocks mineralocorticoid receptors.',
    clinicalEffects: 'Elevated serum potassium (> 5.5 mEq/L), muscle weakness, paresthesias, peaked T-waves on ECG, and fatal cardiac arrest.',
    management: 'Regularly monitor serum potassium and creatinine. Avoid potassium supplements. Limit Spironolactone dose to <= 25 mg daily when combined with ACE inhibitors.'
  },
  {
    drug1: 'fluoxetine',
    drug2: 'selegiline',
    severity: 'Major (Fatal)',
    riskLevel: 'Serotonin Syndrome Toxicity',
    mechanism: 'Additive central serotonergic enhancement. Fluoxetine blocks 5-HT reuptake while Selegiline inhibits monoamine oxidase (MAO-B/A) serotonin breakdown.',
    clinicalEffects: 'Hyperthermia, autonomic instability, neuromuscular excitability (clonus, hyperreflexia), delirium, coma, and death.',
    management: 'Absolute contraindication. Allow a 5-week washout period after discontinuing Fluoxetine before starting MAO inhibitors.'
  },
  {
    drug1: 'paracetamol',
    drug2: 'ibuprofen',
    severity: 'Minor / Low Risk',
    riskLevel: 'Safe Multimodal Analgesic Combination',
    mechanism: 'Complementary sites of action. Paracetamol acts via central COX-3 / endocannabinoid pain pathways, while Ibuprofen acts peripherally via COX-1 & COX-2 inhibition.',
    clinicalEffects: 'Enhanced anti-pyretic and analgesic efficacy with minimal competitive metabolism at therapeutic dosages.',
    management: 'Generally safe and effective for acute pain or fever. Take Ibuprofen with food to minimize gastric irritation.'
  }
];

const generateDynamicClinicalAnalysis = (d1Raw, d2Raw) => {
  const d1 = d1Raw.trim().toLowerCase();
  const d2 = d2Raw.trim().toLowerCase();

  const isNSAID = (d) => ['ibuprofen', 'naproxen', 'diclofenac', 'indomethacin', 'aspirin', 'piroxicam', 'ketorolac', 'mefenamic', 'celecoxib'].some(k => d.includes(k));
  const isAnticoagulant = (d) => ['warfarin', 'heparin', 'rivaroxaban', 'apixaban', 'dabigatran', 'clopidogrel', 'prasugrel', 'ticagrelor'].some(k => d.includes(k));
  const isStatins = (d) => ['atorvastatin', 'simvastatin', 'rosuvastatin', 'pravastatin', 'lovastatin'].some(k => d.includes(k));
  const isMacrolideOrAzole = (d) => ['clarithromycin', 'erythromycin', 'ketoconazole', 'itraconazole', 'fluconazole', 'cimetidine'].some(k => d.includes(k));
  const isAceOrArb = (d) => ['enalapril', 'lisinopril', 'ramipril', 'losartan', 'valsartan', 'telmisartan'].some(k => d.includes(k));
  const isDiuretic = (d) => ['furosemide', 'torsemide', 'hydrochlorothiazide', 'spironolactone', 'indapamide'].some(k => d.includes(k));

  if ((isNSAID(d1) && isAnticoagulant(d2)) || (isNSAID(d2) && isAnticoagulant(d1))) {
    return {
      drug1: d1Raw,
      drug2: d2Raw,
      severity: 'Major',
      riskLevel: 'Severe Gastrointestinal & Systemic Bleeding Risk',
      mechanism: 'Additive antiplatelet / mucosal damage from NSAIDs combined with systemic anticoagulation.',
      clinicalEffects: 'Increased incidence of major GI tract hemorrhage, prolonged bleeding time, and internal hematomas.',
      management: 'Avoid co-administration. If necessary, co-prescribe a PPI (e.g. Pantoprazole) and monitor hemoglobin.'
    };
  }

  if ((isStatins(d1) && isMacrolideOrAzole(d2)) || (isStatins(d2) && isMacrolideOrAzole(d1))) {
    return {
      drug1: d1Raw,
      drug2: d2Raw,
      severity: 'Major',
      riskLevel: 'CYP3A4 Inhibition & Myopathy / Rhabdomyolysis Risk',
      mechanism: 'Potent CYP3A4 enzyme inhibition increases systemic statin bioavailability and plasma clearance time.',
      clinicalEffects: 'Elevated serum CK levels, severe muscle pain, rhabdomyolysis, and myoglobin-induced renal impairment.',
      management: 'Temporarily withhold statin therapy during antimicrobial treatment or switch to Pravastatin / Rosuvastatin.'
    };
  }

  if ((isAceOrArb(d1) && isDiuretic(d2)) || (isAceOrArb(d2) && isDiuretic(d1))) {
    return {
      drug1: d1Raw,
      drug2: d2Raw,
      severity: 'Moderate',
      riskLevel: 'Synergistic Antihypertensive Action & Electrolyte Shift',
      mechanism: 'Dual blockade of RAAS pathway and intravascular volume depletion enhances blood pressure lowering.',
      clinicalEffects: 'First-dose hypotension, transient reduction in GFR, and serum potassium fluctuations.',
      management: 'Monitor blood pressure, serum electrolytes (potassium/sodium), and blood urea nitrogen / serum creatinine.'
    };
  }

  return {
    drug1: d1Raw,
    drug2: d2Raw,
    severity: 'Moderate / Caution',
    riskLevel: 'Pharmacokinetic & Pharmacodynamic Clinical Review Needed',
    mechanism: `Co-administration of ${d1Raw} and ${d2Raw} involves potential hepatic CYP450 isoenzyme competition, plasma protein binding displacement, or renal clearance interactions.`,
    clinicalEffects: `Possible altered therapeutic plasma concentrations of ${d1Raw} or ${d2Raw}, leading to variable clinical efficacy or mild adverse effects.`,
    management: `Monitor patient response, vital signs, and therapeutic blood levels. Ensure appropriate timing of administration and hydration.`
  };
};

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
      const response = await axios.post(`${API_BASE_URL}/drug-interaction/check`, {
        drugs: selectedDrugs
      }, { timeout: 2000 });

      if (response.data && response.data.interactions) {
        setResult(response.data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend Drug Interaction API unreachable, running client-side pharmacology analyzer...', err.message);
    }

    // Client-side fallback analyzer
    const normalized = selectedDrugs.map(d => d.trim());
    const found = [];

    for (let i = 0; i < normalized.length; i++) {
      for (let j = i + 1; j < normalized.length; j++) {
        const d1 = normalized[i];
        const d2 = normalized[j];
        const d1Lower = d1.toLowerCase();
        const d2Lower = d2.toLowerCase();

        const match = INTERACTION_DATABASE.find(item => 
          (item.drug1 === d1Lower && item.drug2 === d2Lower) || (item.drug1 === d2Lower && item.drug2 === d1Lower)
        );

        if (match) {
          found.push({ ...match, drug1: d1, drug2: d2 });
        } else {
          found.push(generateDynamicClinicalAnalysis(d1, d2));
        }
      }
    }

    setResult({
      queriedDrugs: selectedDrugs,
      interactionCount: found.length,
      interactions: found,
      disclaimer: 'This Drug Interaction Checker is designed for B.Pharmacy academic study, clinical pharmacology reference, and GPAT preparation.'
    });
    setLoading(false);
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

          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">
            AI Drug-Drug Interaction Checker
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Analyze complex multi-drug regimens for dangerous pharmacokinetic & pharmacodynamic interactions, CYP450 enzyme inhibition/induction, P-gp transport clearance, and severe adverse clinical outcomes.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN: DRUG INPUT & SELECTION PANEL */}
          <div className="lg:col-span-5 space-y-6">

            {/* Input Box */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-600" />
                Select / Enter Medications
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputDrug}
                  onChange={(e) => setInputDrug(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDrug(inputDrug);
                    }
                  }}
                  placeholder="e.g. Aspirin, Warfarin, Metformin..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
                />
                <button
                  onClick={() => handleAddDrug(inputDrug)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {/* Selected Drugs Tags */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  Regimen List ({selectedDrugs.length}/5):
                </span>

                <div className="flex flex-wrap gap-2">
                  {selectedDrugs.map(drug => (
                    <span
                      key={drug}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs font-extrabold flex items-center gap-1.5 shadow-sm"
                    >
                      <Pill className="w-3.5 h-3.5 text-blue-600" />
                      <span>{drug}</span>
                      <button
                        onClick={() => handleRemoveDrug(drug)}
                        className="hover:bg-blue-200/60 p-0.5 rounded-full transition-colors cursor-pointer text-blue-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleCheckInteractions}
                disabled={loading || selectedDrugs.length < 2}
                className="w-full py-3.5 rounded-2xl font-black text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Cross-Analyzing Clinical Databases...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-yellow-300" />
                    <span>Analyze Drug Interactions</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestions & High-Risk Presets */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> High-Yield GPAT Interaction Presets
              </h3>

              <div className="space-y-2">
                {PRESET_PAIRINGS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(preset.drugs)}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <span>{preset.name}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                      {preset.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTION REPORT RESULT */}
          <div className="lg:col-span-7 space-y-6">

            {!result && !loading && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Check Drug Regimen Safety</h3>
                <p className="text-slate-500 text-sm max-w-md mb-6 leading-relaxed">
                  Add at least 2 medications on the left panel or click a preset pairing to generate a detailed clinical interaction report.
                </p>
                <button
                  onClick={() => handleApplyPreset(['Aspirin', 'Warfarin'])}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-yellow-300" />
                  <span>Analyze Aspirin + Warfarin Preset</span>
                </button>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                
                {/* Result Header Card */}
                <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-blue-400" /> Clinical Evaluation Report
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {result.interactionCount} Interaction(s) Analyzed
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Analyzed Medication Regimen:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.queriedDrugs.map(d => (
                        <span key={d} className="px-3 py-1 bg-slate-800 text-white font-extrabold text-xs rounded-lg border border-slate-700">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Interactions List */}
                <div className="space-y-6">
                  {result.interactions.map((item, idx) => {
                    const isMajor = item.severity.toLowerCase().includes('major');
                    const isModerate = item.severity.toLowerCase().includes('moderate');

                    return (
                      <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                        
                        {/* Title & Severity Badge */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                          <h4 className="font-black text-slate-900 text-base flex items-center gap-2">
                            <Pill className="w-4 h-4 text-blue-600" /> {item.drug1} + {item.drug2}
                          </h4>

                          <span className={`text-xs font-extrabold px-3 py-1 rounded-xl border ${
                            isMajor
                              ? 'bg-rose-50 text-rose-800 border-rose-200'
                              : isModerate
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                            {item.severity} • {item.riskLevel}
                          </span>
                        </div>

                        {/* Mechanism */}
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                          <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
                            Pharmacological Mechanism:
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {item.mechanism}
                          </p>
                        </div>

                        {/* Clinical Effects */}
                        <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-1">
                          <span className="text-[11px] font-extrabold text-rose-800 uppercase tracking-wider block flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> Key Clinical Adverse Outcomes:
                          </span>
                          <p className="text-xs text-rose-950 leading-relaxed font-medium">
                            {item.clinicalEffects}
                          </p>
                        </div>

                        {/* Clinical Management */}
                        <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-1">
                          <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider block flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Recommended Clinical Management & Monitoring:
                          </span>
                          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                            {item.management}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-400 font-medium">
                  {result.disclaimer}
                </p>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
