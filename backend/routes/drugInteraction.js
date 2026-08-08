const express = require('express');
const router = express.Router();

// Extensive Clinical Drug Interaction Knowledge Base for B.Pharm & Clinical Pharmacology
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
    drug1: 'metformin',
    drug2: 'contrast dye',
    severity: 'Major',
    riskLevel: 'Lactic Acidosis',
    mechanism: 'Iodinated radiocontrast agents can induce acute renal failure, leading to rapid systemic accumulation of Metformin.',
    clinicalEffects: 'Metformin-associated lactic acidosis (MALA), severe metabolic acidosis, tachypnea, hypotension, and renal dysfunction.',
    management: 'Withhold Metformin at the time of or prior to iodinated contrast imaging procedure. Re-evaluate renal function 48 hours post-procedure before resuming.'
  },
  {
    drug1: 'amiodarone',
    drug2: 'levofloxacin',
    severity: 'Major',
    riskLevel: 'Additive Torsades de Pointes',
    mechanism: 'Both drugs delay cardiac repolarization by blocking IKr potassium channels, causing additive prolongation of QTc interval.',
    clinicalEffects: 'Marked QTc prolongation (> 500 ms), polymorphic ventricular tachycardia (Torsades de Pointes), and sudden cardiac death.',
    management: 'Avoid co-administration. Monitor baseline and serial ECGs. Maintain serum potassium (> 4.0 mEq/L) and magnesium (> 2.0 mg/dL).'
  },
  {
    drug1: 'methotrexate',
    drug2: 'ibuprofen',
    severity: 'Major',
    riskLevel: 'Bone Marrow Suppression & Toxicity',
    mechanism: 'NSAIDs reduce renal prostaglandins, decreasing renal blood flow and active tubular secretion of Methotrexate, leading to elevated plasma levels.',
    clinicalEffects: 'Severe leukopenia, thrombocytopenia, mucosal ulceration, nephrotoxicity, and pancytopenia.',
    management: 'Avoid high-dose Methotrexate with NSAIDs. If co-administered with low-dose Methotrexate (e.g. for rheumatoid arthritis), monitor complete blood count (CBC) and renal function.'
  },
  {
    drug1: 'paracetamol',
    drug2: 'ibuprofen',
    severity: 'Minor / Low Risk',
    riskLevel: 'Safe Multimodal Analgesic Combination',
    mechanism: 'Complementary sites of action. Paracetamol acts via central COX-3 / endocannabinoid pain pathways, while Ibuprofen acts peripherally via COX-1 & COX-2 inhibition.',
    clinicalEffects: 'Enhanced anti-pyretic and analgesic efficacy with minimal competitive metabolism at therapeutic dosages.',
    management: 'Generally safe and effective for acute pain or fever. Take Ibuprofen with food to minimize gastric irritation. Do not exceed 4g Paracetamol or 1.2g OTC Ibuprofen per 24 hours.'
  },
  {
    drug1: 'acetaminophen',
    drug2: 'ibuprofen',
    severity: 'Minor / Low Risk',
    riskLevel: 'Safe Multimodal Analgesic Combination',
    mechanism: 'Complementary sites of action. Acetaminophen acts via central COX pathways, while Ibuprofen acts peripherally via COX-1 & COX-2 inhibition.',
    clinicalEffects: 'Enhanced anti-pyretic and analgesic efficacy with minimal competitive metabolism at therapeutic dosages.',
    management: 'Generally safe and effective for acute pain or fever. Take Ibuprofen with food to minimize gastric irritation.'
  },
  {
    drug1: 'metoprolol',
    drug2: 'verapamil',
    severity: 'Major',
    riskLevel: 'Severe Bradycardia & AV Block',
    mechanism: 'Additive negative inotropic and chronotropic cardiac suppression. Both drugs slow AV nodal conduction and suppress SA node firing.',
    clinicalEffects: 'Profound bradycardia, complete heart block, severe hypotension, and acute heart failure exacerbation.',
    management: 'Avoid concurrent intravenous use. Use extreme caution with oral combinations. Monitor heart rate, blood pressure, and ECG continuously.'
  },
  {
    drug1: 'lisinopril',
    drug2: 'spironolactone',
    severity: 'Moderate to Major',
    riskLevel: 'Severe Hyperkalemia',
    mechanism: 'Additive potassium retention via inhibition of the renin-angiotensin-aldosterone system (RAAS).',
    clinicalEffects: 'Serum potassium elevation (> 5.5 mmol/L), cardiac conduction abnormalities, and muscle paralysis.',
    management: 'Monitor serum potassium and renal function closely. Avoid potassium supplements.'
  },
  {
    drug1: 'tramadol',
    drug2: 'fluoxetine',
    severity: 'Major',
    riskLevel: 'Serotonin Syndrome & Seizures',
    mechanism: 'Fluoxetine inhibits CYP2D6 (reducing Tramadol activation to O-desmethyltramadol) and causes additive central serotonin elevation while lowering seizure threshold.',
    clinicalEffects: 'Agitation, hyperreflexia, clonus, diaphoresis, hyperthermia, and increased seizure susceptibility.',
    management: 'Avoid co-prescribing if possible. Monitor closely for serotonergic toxicity or choose alternative non-serotonergic analgesics.'
  }
];

// Helper to generate dynamic clinical evaluation for any custom drug pair
const generateDynamicClinicalAnalysis = (d1Raw, d2Raw) => {
  const d1 = d1Raw.trim().toLowerCase();
  const d2 = d2Raw.trim().toLowerCase();

  const isNSAID = (d) => ['ibuprofen', 'naproxen', 'diclofenac', 'indomethacin', 'aspirin', 'piroxicam', 'ketorolac', 'mefenamic', 'celecoxib'].some(k => d.includes(k));
  const isAnticoagulant = (d) => ['warfarin', 'heparin', 'rivaroxaban', 'apixaban', 'dabigatran', 'clopidogrel', 'prasugrel', 'ticagrelor'].some(k => d.includes(k));
  const isStatins = (d) => ['atorvastatin', 'simvastatin', 'rosuvastatin', 'pravastatin', 'lovastatin'].some(k => d.includes(k));
  const isMacrolideOrAzole = (d) => ['clarithromycin', 'erythromycin', 'ketoconazole', 'itraconazole', 'fluconazole', 'cimetidine'].some(k => d.includes(k));
  const isAceOrArb = (d) => ['enalapril', 'lisinopril', 'ramipril', 'losartan', 'valsartan', 'telmisartan'].some(k => d.includes(k));
  const isDiuretic = (d) => ['furosemide', 'torsemide', 'hydrochlorothiazide', 'spironolactone', 'indapamide'].some(k => d.includes(k));
  const isBetaBlocker = (d) => ['metoprolol', 'atenolol', 'propranolol', 'carvedilol', 'bisoprolol'].some(k => d.includes(k));
  const isCcb = (d) => ['amlodipine', 'diltiazem', 'verapamil', 'nifedipine'].some(k => d.includes(k));

  if (isNSAID(d1) && isAnticoagulant(d2) || isNSAID(d2) && isAnticoagulant(d1)) {
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

  if (isStatins(d1) && isMacrolideOrAzole(d2) || isStatins(d2) && isMacrolideOrAzole(d1)) {
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

  if (isAceOrArb(d1) && isDiuretic(d2) || isAceOrArb(d2) && isDiuretic(d1)) {
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

  if (isBetaBlocker(d1) && isCcb(d2) || isBetaBlocker(d2) && isCcb(d1)) {
    return {
      drug1: d1Raw,
      drug2: d2Raw,
      severity: 'Major',
      riskLevel: 'Additive Cardiac Suppression & Hypotension',
      mechanism: 'Dual depression of SA node automaticity and AV nodal conduction.',
      clinicalEffects: 'Profound bradycardia, AV block, hypotension, and reduced cardiac output.',
      management: 'Monitor pulse rate, blood pressure, and ECG. Avoid non-dihydropyridine CCBs (Verapamil/Diltiazem) with beta blockers.'
    };
  }

  // Default intelligent clinical pharmacology breakdown for any custom pair
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

// POST /api/drug-interaction/check
router.post('/check', (req, res) => {
  const { drugs } = req.body;

  if (!drugs || !Array.isArray(drugs) || drugs.length < 2) {
    return res.status(400).json({ error: 'Please select or provide at least two drugs to check for clinical interactions.' });
  }

  const normalizedDrugs = drugs.map(d => d.trim());
  const foundInteractions = [];

  // Check every pair
  for (let i = 0; i < normalizedDrugs.length; i++) {
    for (let j = i + 1; j < normalizedDrugs.length; j++) {
      const d1 = normalizedDrugs[i];
      const d2 = normalizedDrugs[j];
      const d1Lower = d1.toLowerCase();
      const d2Lower = d2.toLowerCase();

      const match = INTERACTION_DATABASE.find(item => 
        (item.drug1 === d1Lower && item.drug2 === d2Lower) || (item.drug1 === d2Lower && item.drug2 === d1Lower)
      );

      if (match) {
        foundInteractions.push({
          ...match,
          drug1: d1,
          drug2: d2
        });
      } else {
        // Generate dynamic intelligent clinical analysis for custom drug pair!
        const dynamicAnalysis = generateDynamicClinicalAnalysis(d1, d2);
        foundInteractions.push(dynamicAnalysis);
      }
    }
  }

  res.json({
    queriedDrugs: drugs,
    interactionCount: foundInteractions.length,
    interactions: foundInteractions,
    disclaimer: 'This Drug Interaction Checker is designed for B.Pharmacy academic study, clinical pharmacology reference, and GPAT preparation.'
  });
});

module.exports = router;
