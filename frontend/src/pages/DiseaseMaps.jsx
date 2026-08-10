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
import { API_BASE_URL } from '../apiConfig';

const FALLBACK_DISEASE_MAPS = [
  {
    id: 'hypertension',
    diseaseName: 'Essential & Secondary Hypertension',
    category: 'Cardiovascular System',
    icdCode: 'I10',
    pathophysiology: 'Sustained elevation of systemic vascular resistance (SVR) driven by RAAS hyperactivity, sympathetic vasoconstrictor tone, vascular remodeling, and renal sodium retention.',
    diagnosticCriteria: [
      'Normal: SBP < 120 and DBP < 80 mmHg',
      'Elevated BP: SBP 120–129 and DBP < 80 mmHg',
      'Stage 1 HTN: SBP 130–139 or DBP 80–89 mmHg',
      'Stage 2 HTN: SBP ≥ 140 or DBP ≥ 90 mmHg',
      'Hypertensive Crisis: SBP > 180 and/or DBP > 120 mmHg'
    ],
    lifestyleInterventions: [
      'DASH Diet: High in fruits, vegetables, potassium, and low-fat dairy',
      'Sodium Restriction: Limit dietary sodium to < 1,500 – 2,000 mg/day',
      'Aerobic Exercise: 150 min/week moderate-intensity exercise',
      'Weight Loss: ~1 mmHg BP drop per 1 kg of body weight lost'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Stage 1 HTN (SBP 130-139 mmHg) - Monotherapy',
        recommendation: 'Initiate 1 first-line antihypertensive agent. Target BP < 130/80 mmHg.',
        drugClasses: [
          {
            className: 'ACE Inhibitors (ACEIs)',
            mechanism: 'Inhibits Angiotensin Converting Enzyme (ACE), preventing Angiotensin I -> Ang II conversion & inhibiting bradykinin degradation.',
            drugs: [
              { name: 'Enalapril', dose: '5 - 40 mg OD/BD', note: 'Prodrug converted to active Enalaprilat' },
              { name: 'Lisinopril', dose: '10 - 40 mg OD', note: 'Lysine derivative, water soluble, long acting' },
              { name: 'Ramipril', dose: '2.5 - 10 mg OD', note: 'Cardioprotective in post-MI and heart failure' }
            ],
            keySideEffect: 'Dry persistent cough (bradykinin accumulation), hyperkalemia, angioedema.',
            contraindication: 'Bilateral renal artery stenosis, Pregnancy (Teratogenic).'
          },
          {
            className: 'Angiotensin II Receptor Blockers (ARBs)',
            mechanism: 'Competitive antagonist at AT1 receptors, selectively blocking Ang II vasoconstriction without affecting bradykinin.',
            drugs: [
              { name: 'Telmisartan', dose: '40 - 80 mg OD', note: 'Longest half-life (~24h), partial PPAR-gamma agonist' },
              { name: 'Losartan', dose: '50 - 100 mg OD', note: 'Uricosuric effect (decreases serum uric acid)' }
            ],
            keySideEffect: 'Hyperkalemia, dizziness, renal function decline in volume depletion.',
            contraindication: 'Pregnancy (Category D).'
          },
          {
            className: 'Calcium Channel Blockers (Dihydropyridines)',
            mechanism: 'Inhibits L-type voltage-gated Ca2+ channels in vascular smooth muscle -> arteriodilation.',
            drugs: [
              { name: 'Amlodipine', dose: '2.5 - 10 mg OD', note: 'Long-acting, minimal negative inotropic effect' },
              { name: 'Cilnidipine', dose: '5 - 20 mg OD', note: 'Dual L-type and N-type CCB (less pedal edema)' }
            ],
            keySideEffect: 'Peripheral ankle edema, flushing, headache, gingival hyperplasia.',
            contraindication: 'Severe aortic stenosis, unstable angina.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Pregnancy HTN / Preeclampsia', choice: 'Labetalol, Methyldopa, Nifedipine ER. (Strictly avoid ACEIs/ARBs).' },
      { condition: 'Diabetic Nephropathy with Proteinuria', choice: 'ACEI or ARB is mandatory first-line.' }
    ],
    drugInteractions: [
      'ACEI / ARB + Spironolactone + NSAIDs: High risk of life-threatening hyperkalemia & acute renal failure ("Triple Whammy").',
      'Non-Dihydropyridine CCBs + Beta-Blockers: Severe bradycardia and AV heart block.'
    ],
    monitoringParameters: [
      'Serum Potassium (K+) & Creatinine / eGFR within 1-2 weeks of starting ACEI/ARB.',
      'Blood Pressure check 4 weeks after initiation.'
    ],
    gpatMindMapTips: [
      'ACEIs cause dry cough due to inhibition of bradykinin degradation by Kininase II.',
      'Telmisartan has partial PPAR-gamma agonist activity, making it beneficial in metabolic syndrome.',
      'Losartan is the only ARB with uricosuric action (inhibits URAT1 in proximal tubule).'
    ]
  },
  {
    id: 'heart-failure',
    diseaseName: 'Heart Failure (HFrEF & HFpEF)',
    category: 'Cardiovascular System',
    icdCode: 'I50',
    pathophysiology: 'Inability of heart to pump blood at rate commensurate with metabolic requirements (reduced ejection fraction HFrEF ≤ 40%), resulting in sympathetic and RAAS neurohormonal activation.',
    diagnosticCriteria: [
      'Echocardiogram: LVEF ≤ 40% (HFrEF); LVEF ≥ 50% (HFpEF)',
      'BNP > 35 pg/mL or NT-proBNP > 125 pg/mL',
      'Clinical Signs: Dyspnea on exertion, orthopnea, PND, elevated JVP, bilateral ankle edema'
    ],
    lifestyleInterventions: [
      'Fluid Restriction: Limit to 1.5 – 2.0 L/day in severe volume overload',
      'Sodium Limit: < 2,000 mg/day; Daily weight monitoring (> 2kg gain in 3 days = fluid retention)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Guideline-Directed Medical Therapy (GDMT "Fantastic Four" Pillars)',
        recommendation: 'Initiate all 4 pillars early to reduce mortality & hospitalizations.',
        drugClasses: [
          {
            className: 'ARNI (Angiotensin Receptor-Neprilysin Inhibitor)',
            mechanism: 'Sacubitril inhibits Neprilysin enzyme; Valsartan blocks AT1 receptor.',
            drugs: [
              { name: 'Sacubitril / Valsartan', dose: '24/26 mg to 97/103 mg BD', note: 'Superior to ACEIs in PARADIGM-HF trial' }
            ],
            keySideEffect: 'Hypotension, hyperkalemia, angioedema.',
            contraindication: 'History of angioedema, co-administration with ACEI (requires 36h washout).'
          },
          {
            className: 'Evidence-Based Beta-Blockers',
            mechanism: 'Inhibits sympathetic hyperactivation -> decreases heart rate, prevents cardiac remodeling.',
            drugs: [
              { name: 'Metoprolol Succinate ER', dose: '12.5 - 200 mg OD', note: 'Cardioselective Beta-1 blocker' },
              { name: 'Carvedilol', dose: '3.125 - 25 mg BD', note: 'Non-selective Beta + Alpha-1 blocker' }
            ],
            keySideEffect: 'Bradycardia, fluid retention during initiation, fatigue.',
            contraindication: 'Severe acute decompensated heart failure, 2nd/3rd degree AV block.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Persistent HR ≥ 70 bpm despite max Beta-blocker', choice: 'Add Ivabradine (If funny current channel blocker).' }
    ],
    drugInteractions: [
      'Sacubitril/Valsartan + Enalapril: MUST maintain 36-hour washout period to prevent fatal angioedema.'
    ],
    monitoringParameters: [
      'Serum Potassium & Creatinine 1-2 weeks post-ARNI or MRA initiation.'
    ],
    gpatMindMapTips: [
      'Digoxin mechanism: Inhibits Na+/K+-ATPase pump -> increases intracellular Na+ -> decreases Na+/Ca2+ exchanger -> increases intracellular Ca2+.'
    ]
  },
  {
    id: 'diabetes-mellitus-type2',
    diseaseName: 'Type 2 Diabetes Mellitus (T2DM)',
    category: 'Endocrine System',
    icdCode: 'E11',
    pathophysiology: 'Peripheral insulin resistance coupled with progressive pancreatic beta-cell dysfunction and hyperglucagonemia.',
    diagnosticCriteria: [
      'Fasting Glucose ≥ 126 mg/dL | HbA1c ≥ 6.5%',
      '2-Hour OGTT ≥ 200 mg/dL | Random Glucose ≥ 200 mg/dL with symptoms'
    ],
    lifestyleInterventions: [
      'Medical Nutrition Therapy: Low glycemic index, high fiber',
      '150 min/week moderate physical exercise & 5-10% weight loss'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line Foundation Therapy',
        recommendation: 'Metformin + Lifestyle Modification.',
        drugClasses: [
          {
            className: 'Biguanides',
            mechanism: 'Activates AMPK -> decreases hepatic gluconeogenesis & increases peripheral insulin sensitivity.',
            drugs: [
              { name: 'Metformin', dose: '500 - 2000 mg daily', note: 'First-line standard. Does NOT cause hypoglycemia monotherapy.' }
            ],
            keySideEffect: 'GI distress, Vitamin B12 deficiency, rare lactic acidosis.',
            contraindication: 'eGFR < 30 mL/min/1.73m2, acute severe hypoxia.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Pregnancy T2DM / Gestational', choice: 'Insulin (Lispro, Aspart, NPH) is drug of choice.' }
    ],
    drugInteractions: [
      'Metformin + Radiocontrast Dye: Risk of acute renal failure & lactic acidosis. Hold Metformin for 48h.'
    ],
    monitoringParameters: [
      'HbA1c every 3-6 months; Annual uACR & eGFR.'
    ],
    gpatMindMapTips: [
      'Linagliptin is the only DPP-4 inhibitor excreted non-renally (bile/feces), requiring NO dose adjustment in renal failure.'
    ]
  },
  {
    id: 'peptic-ulcer-disease',
    diseaseName: 'Peptic Ulcer Disease (PUD) & GERD',
    category: 'Gastrointestinal System',
    icdCode: 'K27 / K21',
    pathophysiology: 'Mucosal erosion in stomach or duodenum due to imbalance between aggressive factors (Gastric Acid, Pepsin, H. pylori, NSAIDs) and defensive protective factors.',
    diagnosticCriteria: [
      'Upper GI Endoscopy (EGD): Gold standard for ulcer visualization & biopsy',
      'Urea Breath Test (UBT) / Stool Antigen Test for H. pylori'
    ],
    lifestyleInterventions: [
      'Avoid NSAIDs, Aspirin, Alcohol, Smoking, and late-night meals'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Gastric Acid Suppression',
        recommendation: 'Proton Pump Inhibitors (PPIs) first-line.',
        drugClasses: [
          {
            className: 'Proton Pump Inhibitors (PPIs)',
            mechanism: 'Irreversible covalent inhibition of gastric H+/K+-ATPase proton pump in parietal cells via disulfide bonds.',
            drugs: [
              { name: 'Omeprazole', dose: '20 - 40 mg OD 30 min before breakfast', note: 'Prodrug converted to active sulfenamide' },
              { name: 'Pantoprazole', dose: '40 mg OD', note: 'Lowest CYP2C19 inhibition (safer with Clopidogrel)' }
            ],
            keySideEffect: 'Hypomagnesemia, C. difficile diarrhea, bone fractures long-term.',
            contraindication: 'Hypersensitivity.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'NSAID Protection', choice: 'Co-prescribe PPI or Misoprostol alongside chronic NSAID.' }
    ],
    drugInteractions: [
      'Omeprazole + Clopidogrel: CYP2C19 inhibition reduces active metabolite of Clopidogrel. Use Pantoprazole.'
    ],
    monitoringParameters: [
      'Urea Breath Test 4 weeks post-treatment to confirm H. pylori eradication.'
    ],
    gpatMindMapTips: [
      'Misoprostol is a synthetic PGE1 analog contraindicated in pregnancy due to abortifacient action.'
    ]
  },
  {
    id: 'asthma-copd',
    diseaseName: 'Bronchial Asthma & COPD',
    category: 'Respiratory System',
    icdCode: 'J45 / J44',
    pathophysiology: 'Chronic airway inflammation with bronchial hyperresponsiveness, smooth muscle spasm, and airflow obstruction.',
    diagnosticCriteria: [
      'Spirometry: FEV1/FVC < 0.70',
      'Asthma Reversibility: Post-bronchodilator FEV1 increase > 12% and > 200 mL'
    ],
    lifestyleInterventions: [
      'Trigger Avoidance & Smoking Cessation; Annual Influenza & Pneumococcal vaccines'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Reliever & Controller Therapy',
        recommendation: 'GINA / GOLD Inhaler Guidelines.',
        drugClasses: [
          {
            className: 'Inhaled Corticosteroid (ICS) + LABA',
            mechanism: 'ICS suppresses inflammatory cytokines; LABA provides 12-24h bronchodilation.',
            drugs: [
              { name: 'Budesonide + Formoterol', dose: '160/4.5 mcg DPI BD or PRN', note: 'Preferred SMART therapy' },
              { name: 'Fluticasone + Salmeterol', dose: '250/50 mcg DPI BD', note: 'Maintenance controller' }
            ],
            keySideEffect: 'Oral candidiasis (thrush), dysphonia. Rinse mouth with water after use.',
            contraindication: 'Untreated fungal infections.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'AERD (Aspirin Asthma)', choice: 'Avoid Aspirin/NSAIDs. Use Montelukast (CysLT1 receptor antagonist).' }
    ],
    drugInteractions: [
      'Non-Selective Beta-Blockers (Propranolol) + Beta-Agonists: Severe fatal bronchospasm.'
    ],
    monitoringParameters: [
      'Annual Spirometry FEV1 & Inhaler technique evaluation.'
    ],
    gpatMindMapTips: [
      'Theophylline mechanism: Non-selective PDE-3/4 inhibitor and adenosine A1/A2A antagonist.'
    ]
  }
];

export default function DiseaseMaps() {
  const [maps, setMaps] = useState(FALLBACK_DISEASE_MAPS);
  const [selectedMap, setSelectedMap] = useState(FALLBACK_DISEASE_MAPS[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/disease-maps`, { timeout: 5000 });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setMaps(response.data);
        setSelectedMap(response.data[0]);
      }
    } catch (err) {
      console.warn('Disease Maps API unreachable, using client-side pre-seeded disease maps database...', err.message);
      setMaps(FALLBACK_DISEASE_MAPS);
      setSelectedMap(FALLBACK_DISEASE_MAPS[0]);
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
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL: DISEASE MAP LIST */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-teal-600" /> Clinical Pathology List ({filteredMaps.length})
              </h3>
            </div>

            {loading ? (
              <div className="p-8 text-center text-slate-400 space-y-3 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <RefreshCw className="w-6 h-6 animate-spin text-teal-600 mx-auto" />
                <p className="text-xs font-bold">Loading Pathophysiology Mind Maps...</p>
              </div>
            ) : filteredMaps.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-white rounded-3xl border border-slate-200 shadow-sm text-sm">
                No disease maps found matching "<span className="font-bold text-slate-700">{searchQuery}</span>"
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
                {filteredMaps.map(m => {
                  const isSelected = selectedMap?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMap(m)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 group cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 text-white border-teal-500 shadow-lg shadow-teal-950/20'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-teal-500/20 text-teal-300 border border-teal-400/30' : 'bg-slate-100 text-slate-500'
                          }`}>
                            ICD: {m.icdCode}
                          </span>
                          <span className={`text-[10px] font-bold ${isSelected ? 'text-teal-200' : 'text-teal-600'}`}>
                            {m.category}
                          </span>
                        </div>
                        <h4 className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-teal-600'}`}>
                          {m.diseaseName}
                        </h4>
                        <p className={`text-xs line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {m.pathophysiology}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isSelected ? 'text-teal-400 translate-x-0.5' : 'text-slate-300 group-hover:text-teal-600'}`} />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: INTERACTIVE CLINICAL PATHWAY MAP DETAIL */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedMap ? (
                <motion.div
                  key={selectedMap.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Map Header Card */}
                  <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-4 border border-slate-800">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-400/30 rounded-full text-xs font-bold flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-teal-400" /> {selectedMap.category}
                        </span>
                        <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-mono font-bold">
                          ICD-10: {selectedMap.icdCode}
                        </span>
                      </div>

                      <Link
                        to="/ai-tutor"
                        className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        <span>Ask AI Tutor about {selectedMap.diseaseName}</span>
                      </Link>
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                        {selectedMap.diseaseName}
                      </h2>
                    </div>

                    {/* Pathophysiology Box */}
                    <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1.5">
                      <span className="text-[11px] font-extrabold text-teal-400 uppercase tracking-wider block flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-teal-400" /> Primary Pathophysiology & Etiology
                      </span>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                        {selectedMap.pathophysiology}
                      </p>
                    </div>
                  </div>

                  {/* Diagnostic Criteria & Lifestyle Interventions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Diagnostic Criteria */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-teal-600" /> Diagnostic Criteria & Lab Markers
                      </h3>
                      <ul className="space-y-2">
                        {selectedMap.diagnosticCriteria.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lifestyle Interventions */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-emerald-600" /> Lifestyle & Non-Pharm Interventions
                      </h3>
                      <ul className="space-y-2">
                        {selectedMap.lifestyleInterventions.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                            <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Treatment Algorithm Steps */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-teal-600" /> Stepwise Pharmacotherapeutic Treatment Algorithm
                    </h3>

                    {selectedMap.treatmentAlgorithm.map((alg, aIdx) => (
                      <div key={aIdx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-xl bg-teal-100 text-teal-800 font-black text-xs flex items-center justify-center">
                              S{alg.step}
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-sm md:text-base">
                              {alg.stage}
                            </h4>
                          </div>
                          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-200">
                            {alg.recommendation}
                          </span>
                        </div>

                        {/* Drug Classes Grid */}
                        <div className="space-y-4">
                          {alg.drugClasses.map((cls, cIdx) => (
                            <div key={cIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <h5 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                  <Pill className="w-4 h-4 text-teal-600" /> {cls.className}
                                </h5>
                              </div>

                              <p className="text-xs font-medium text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                                <span className="font-bold text-slate-800">Mechanism of Action: </span> {cls.mechanism}
                              </p>

                              {/* Individual Drugs List */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {cls.drugs.map((drug, dIdx) => (
                                  <div key={dIdx} className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-sm space-y-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-extrabold text-xs text-slate-900">{drug.name}</span>
                                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">{drug.dose}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium">{drug.note}</p>
                                  </div>
                                ))}
                              </div>

                              {/* Side Effects & Contraindications */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1">
                                <div className="p-2 bg-amber-50 rounded-xl border border-amber-100 text-amber-900 font-medium">
                                  <span className="font-bold text-amber-950">Side Effects: </span> {cls.keySideEffect}
                                </div>
                                <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 text-rose-900 font-medium">
                                  <span className="font-bold text-rose-950">Contraindications: </span> {cls.contraindication}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Special Populations & Interactions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Special Populations */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" /> Special Populations & Comorbidities
                      </h3>
                      <div className="space-y-2">
                        {selectedMap.specialPopulations.map((sp, idx) => (
                          <div key={idx} className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 text-xs space-y-1">
                            <span className="font-extrabold text-amber-950 block">{sp.condition}</span>
                            <p className="text-amber-900 font-medium">{sp.choice}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Drug Interactions */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-600" /> High-Risk Clinical Drug Interactions
                      </h3>
                      <div className="space-y-2">
                        {selectedMap.drugInteractions.map((di, idx) => (
                          <div key={idx} className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs font-medium text-rose-900">
                            {di}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* GPAT Exam High-Yield Mind Map Tips */}
                  <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 rounded-3xl shadow-xl space-y-3 border border-blue-800">
                    <h3 className="text-sm font-extrabold text-yellow-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-300" /> GPAT Exam High-Yield Mind Map Tips
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-slate-200">
                      {selectedMap.gpatMindMapTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-white/10 p-3 rounded-xl border border-white/10">
                          <span className="text-yellow-300 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
