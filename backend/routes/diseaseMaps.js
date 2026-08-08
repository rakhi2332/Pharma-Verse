const express = require('express');
const router = express.Router();

// Comprehensive Human Systems Clinical Pharmacology & Disease Database (25+ Major Diseases)
const DISEASE_MAPS_DATABASE = [
  // -------------------------------------------------------------
  // 1. CARDIOVASCULAR SYSTEM (CVS)
  // -------------------------------------------------------------
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
      'Hypertensive Crisis: SBP > 180 and/or DBP > 120 mmHg (Emergency if acute target organ damage present)'
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
          },
          {
            className: 'Mineralocorticoid Receptor Antagonists (MRAs)',
            mechanism: 'Blocks aldosterone at distal tubule -> prevents cardiac fibrosis & potassium loss.',
            drugs: [
              { name: 'Spironolactone', dose: '12.5 - 25 mg OD', note: 'Non-selective MRA (gynecomastia)' },
              { name: 'Eplerenone', dose: '25 - 50 mg OD', note: 'Selective MRA (no gynecomastia)' }
            ],
            keySideEffect: 'Hyperkalemia, gynecomastia.',
            contraindication: 'Serum K+ > 5.0 mEq/L, eGFR < 30 mL/min.'
          },
          {
            className: 'SGLT2 Inhibitors',
            mechanism: 'Reduces preload/afterload, enhances myocardial energetics, natriuresis.',
            drugs: [
              { name: 'Dapagliflozin / Empagliflozin', dose: '10 mg OD', note: 'Proven reduction in HFrEF & HFpEF mortality' }
            ],
            keySideEffect: 'Genital mycotic infections.',
            contraindication: 'Dialysis.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Persistent HR ≥ 70 bpm despite max Beta-blocker', choice: 'Add Ivabradine (If funny current channel blocker).' }
    ],
    drugInteractions: [
      'Sacubitril/Valsartan + Enalapril: MUST maintain 36-hour washout period to prevent fatal angioedema.',
      'Digoxin + Amiodarone: Amiodarone doubles Digoxin levels; reduce Digoxin dose by 50%.'
    ],
    monitoringParameters: [
      'Serum Potassium & Creatinine 1-2 weeks post-ARNI or MRA initiation.',
      'Digoxin therapeutic drug monitoring (0.5 - 0.9 ng/mL).'
    ],
    gpatMindMapTips: [
      'Digoxin mechanism: Inhibits Na+/K+-ATPase pump -> increases intracellular Na+ -> decreases Na+/Ca2+ exchanger -> increases intracellular Ca2+ -> positive inotropy.',
      'Digoxin toxicity classic sign: Xanthopsia (yellow-green visual halos) & reverse tick ST depression.'
    ]
  },
  {
    id: 'ischemic-heart-disease',
    diseaseName: 'Ischemic Heart Disease & Myocardial Infarction',
    category: 'Cardiovascular System',
    icdCode: 'I20 / I21',
    pathophysiology: 'Myocardial ischemia caused by coronary artery atherosclerotic plaque rupture and thrombosis, leading to myocardial cell necrosis.',
    diagnosticCriteria: [
      'EKG: ST-elevation (STEMI) or ST-depression / T-inversion (NSTEMI)',
      'Biomarkers: High-sensitivity Cardiac Troponin I/T (hs-cTn) & CK-MB elevation',
      'Angiography: Luminal stenosis in coronary arteries'
    ],
    lifestyleInterventions: [
      'Mediterranean Diet & Supervised Cardiac Rehabilitation',
      'Absolute Smoking Cessation'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Acute Emergency MONA-BASH Protocol',
        recommendation: 'Immediate DAPT + Anticoagulation + Reperfusion (PCI).',
        drugClasses: [
          {
            className: 'Dual Antiplatelet Therapy (DAPT)',
            mechanism: 'Aspirin inhibits COX-1; P2Y12 antagonists block ADP-induced platelet activation.',
            drugs: [
              { name: 'Aspirin', dose: '325 mg chewed loading, then 81 mg OD', note: 'Irreversible COX-1 inhibitor' },
              { name: 'Ticagrelor', dose: '180 mg loading, then 90 mg BD', note: 'Reversible direct P2Y12 antagonist' },
              { name: 'Clopidogrel', dose: '600 mg loading, then 75 mg OD', note: 'Prodrug requiring CYP2C19 activation' }
            ],
            keySideEffect: 'Bleeding, dyspnea (ticagrelor).',
            contraindication: 'Active pathological bleeding.'
          },
          {
            className: 'Sublingual Nitrates',
            mechanism: 'Releases Nitric Oxide (NO) -> venodilation & reduced preload.',
            drugs: [
              { name: 'Nitroglycerin (GTN)', dose: '0.4 mg SL tablet q5min (max 3 doses)', note: 'Rapid relief of anginal pain' }
            ],
            keySideEffect: 'Headache, hypotension, reflex tachycardia.',
            contraindication: 'Co-administration with PDE-5 inhibitors (Sildenafil) within 24-48 hours.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Prinzmetal Vasospastic Angina', choice: 'Use CCBs (Diltiazem/Amlodipine) or Nitrates. Strictly avoid Beta-blockers.' }
    ],
    drugInteractions: [
      'Nitrates + PDE-5 Inhibitors (Sildenafil / Tadalafil): Severe, life-threatening hypotension.',
      'Clopidogrel + Omeprazole: CYP2C19 inhibition reduces active metabolite. Use Pantoprazole.'
    ],
    monitoringParameters: [
      'Serial Troponins & EKG telemetry.',
      'Hemoglobin & Hematocrit for DAPT bleeding.'
    ],
    gpatMindMapTips: [
      'Sublingual Nitroglycerin undergoes > 90% first-pass hepatic metabolism if swallowed; SL bypasses liver.',
      'Ticagrelor is a direct-acting reversible P2Y12 antagonist and does NOT require metabolic bioactivation.'
    ]
  },
  {
    id: 'cardiac-arrhythmias',
    diseaseName: 'Cardiac Arrhythmias & Atrial Fibrillation',
    category: 'Cardiovascular System',
    icdCode: 'I48',
    pathophysiology: 'Abnormal cardiac impulse generation or conduction (re-entry circuits, triggered activity, enhanced automaticity), leading to chaotic atrial contractions and thromboembolism risk.',
    diagnosticCriteria: [
      'EKG: Irregularly irregular rhythm with absent P-waves and variable ventricular rate (Atrial Fibrillation)',
      'CHA2DS2-VASc Score: Risk stratifies stroke probability in AF'
    ],
    lifestyleInterventions: [
      'Limit Caffeine & Alcohol Intake (Holiday Heart Syndrome trigger)',
      'Electrolyte Balance (Maintain Serum K+ 4.0-5.0 mEq/L & Mg2+ > 2.0 mg/dL)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Rate Control & Stroke Prevention',
        recommendation: 'Beta-blocker or Non-Dihydropyridine CCB + DOAC Anticoagulant.',
        drugClasses: [
          {
            className: 'Class III Antiarrhythmics (Potassium Channel Blockers)',
            mechanism: 'Inhibits IKr potassium channels -> prolongs action potential duration & effective refractory period.',
            drugs: [
              { name: 'Amiodarone', dose: '200 - 400 mg daily', note: 'Contains iodine; broad-spectrum Class I-IV action' },
              { name: 'Dronedarone', dose: '400 mg BD', note: 'Non-iodinated amiodarone analog' }
            ],
            keySideEffect: 'Pulmonary fibrosis, corneal microdeposits, thyroid dysfunction (hypo/hyper), slate-blue skin discoloration.',
            contraindication: '2nd/3rd degree AV block, severe sinus node dysfunction.'
          },
          {
            className: 'Direct Oral Anticoagulants (DOACs)',
            mechanism: 'Directly inhibits Factor Xa or Thrombin (Factor IIa) to prevent cardioembolic stroke.',
            drugs: [
              { name: 'Apixaban', dose: '5 mg BD', note: 'Direct Factor Xa inhibitor; preferred in CKD' },
              { name: 'Rivaroxaban', dose: '20 mg OD with evening meal', note: 'Direct Factor Xa inhibitor' },
              { name: 'Dabigatran', dose: '150 mg BD', note: 'Direct Thrombin (IIa) inhibitor; antidote is Idarucizumab' }
            ],
            keySideEffect: 'Major GI & intracranial bleeding.',
            contraindication: 'Mechanical prosthetic heart valves (Must use Warfarin).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Valvular AF / Mechanical Heart Valve', choice: 'Warfarin (Target INR 2.0-3.0 or 2.5-3.5) is mandatory. DOACs contraindicated.' }
    ],
    drugInteractions: [
      'Amiodarone + Warfarin: Inhibits CYP2C9, doubling INR. Reduce Warfarin dose by 50%.',
      'Dabigatran + P-gp Inhibitors (Verapamil): Increases Dabigatran exposure.'
    ],
    monitoringParameters: [
      'Baseline Chest X-Ray, Thyroid Function Tests (TSH), & LFTs every 6 months for Amiodarone.',
      'INR monitoring for Warfarin; Serum Creatinine / eGFR for DOACs.'
    ],
    gpatMindMapTips: [
      'Vaughan Williams Classification: Class I (Na+ channel blockers), Class II (Beta-blockers), Class III (K+ channel blockers), Class IV (Ca2+ channel blockers).',
      'Amiodarone active metabolite is Desethylamiodarone; t1/2 is extremely long (~50 days).'
    ]
  },

  // -------------------------------------------------------------
  // 2. ENDOCRINE SYSTEM
  // -------------------------------------------------------------
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
      },
      {
        step: 2,
        stage: 'Organ Protection Add-on (Heart Failure, CKD, ASCVD)',
        recommendation: 'Add SGLT2i or GLP-1 RA.',
        drugClasses: [
          {
            className: 'SGLT2 Inhibitors (Gliflozins)',
            mechanism: 'Inhibits SGLT2 in renal proximal tubule -> promotes glucosuria & natriuresis.',
            drugs: [
              { name: 'Dapagliflozin / Empagliflozin', dose: '10 mg OD', note: 'Proven cardiorenal protection' }
            ],
            keySideEffect: 'Genital mycotic infections, UTIs, Euglycemic DKA.',
            contraindication: 'Dialysis.'
          },
          {
            className: 'GLP-1 Receptor Agonists',
            mechanism: 'Glucose-dependent insulin secretion, glucagon suppression, satiety.',
            drugs: [
              { name: 'Semaglutide', dose: '0.5 - 1 mg weekly SC / 7-14mg oral', note: 'Profound weight loss & HbA1c reduction' }
            ],
            keySideEffect: 'Nausea, pancreatitis risk.',
            contraindication: 'Medullary Thyroid Carcinoma (MTC) history.'
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
      'Linagliptin is the only DPP-4 inhibitor excreted non-renally (bile/feces), requiring NO dose adjustment in renal failure.',
      'SGLT2 inhibitors cause Euglycemic DKA (blood glucose < 250 mg/dL).'
    ]
  },
  {
    id: 'diabetes-type1-dka',
    diseaseName: 'Type 1 Diabetes Mellitus & DKA Emergency',
    category: 'Endocrine System',
    icdCode: 'E10',
    pathophysiology: 'Autoimmune destruction of pancreatic beta-cells (anti-GAD65 / anti-IA2 antibodies) resulting in absolute insulin deficiency and uncontrolled lipolysis producing ketoacids (acetoacetate & beta-hydroxybutyrate).',
    diagnosticCriteria: [
      'DKA Triad: Hyperglycemia (> 250 mg/dL) + Metabolic Acidosis (pH < 7.30, HCO3 < 18 mEq/L) + Ketonemia / Ketonuria',
      'Elevated Anion Gap: [Na+] - ([Cl-] + [HCO3-]) > 12 mEq/L'
    ],
    lifestyleInterventions: [
      'Basal-Bolus Insulin Regimen Dosing & Carbohydrate Counting',
      'Frequent Blood Glucose & Ketone Self-Monitoring'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Emergency DKA Management Protocol',
        recommendation: 'IV Fluid Resuscitation + Regular Insulin Infusion + Potassium Replacement.',
        drugClasses: [
          {
            className: 'IV Regular Insulin & Electrolyte Resuscitation',
            mechanism: 'Inhibits lipolysis & hepatic ketogenesis; drives glucose and potassium into cells.',
            drugs: [
              { name: '0.9% Normal Saline', dose: '1 - 1.5 L in 1st hour IV', note: 'Restores intravascular volume' },
              { name: 'Regular Insulin (Short-acting)', dose: '0.1 units/kg IV bolus, then 0.1 units/kg/hr infusion', note: 'Target glucose drop 50-75 mg/dL per hour' },
              { name: 'Potassium Chloride (KCl)', dose: '20 - 30 mEq/L IV fluid once K+ < 5.2 mEq/L', note: 'PREVENT hypokalemia before insulin drives K+ intracellularly!' }
            ],
            keySideEffect: 'Severe hypokalemia, cerebral edema (rapid osmolality drop), hypoglycemia.',
            contraindication: 'Do NOT start insulin if serum K+ < 3.3 mEq/L! Fix K+ first!'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Outpatient T1DM Maintenance', choice: 'Basal Insulin (Glargine / Degludec OD) + Rapid-acting Bolus Insulin (Lispro / Aspart with meals).' }
    ],
    drugInteractions: [
      'Beta-Blockers + Insulin: Blunts sympathetic hypoglycemia warning signs (tachycardia, tremors); sweating remains intact.'
    ],
    monitoringParameters: [
      'Hourly Blood Glucose & Potassium (K+) every 2 hours until DKA resolved & anion gap closed.'
    ],
    gpatMindMapTips: [
      'Regular Insulin is the ONLY insulin formulation suitable for IV administration in DKA emergencies.',
      'Insulin Glargine is a long-acting basal insulin that forms microprecipitates at physiological pH in SC tissue.'
    ]
  },
  {
    id: 'thyroid-disorders',
    diseaseName: 'Thyroid Disorders (Hypo & Hyperthyroidism)',
    category: 'Endocrine System',
    icdCode: 'E03 / E05',
    pathophysiology: 'Hypothyroidism: T3/T4 deficiency (Hashimoto thyroiditis). Hyperthyroidism: Excessive T3/T4 synthesis (Graves disease TSH-receptor autoantibodies).',
    diagnosticCriteria: [
      'Hypo: High TSH (> 4.5 mIU/L) + Low Free T4',
      'Hyper: Suppressed TSH (< 0.1 mIU/L) + High Free T4 / Free T3'
    ],
    lifestyleInterventions: [
      'Levothyroxine: Take on empty stomach 30-60 mins before breakfast with plain water'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Hypothyroidism Replacement',
        recommendation: 'Levothyroxine Monotherapy.',
        drugClasses: [
          {
            className: 'Synthetic T4 Hormone',
            mechanism: 'Synthetic T4 converted peripherally to active T3 by 5-deiodinase.',
            drugs: [
              { name: 'Levothyroxine Sodium (T4)', dose: '1.6 mcg/kg/day OD fasting', note: 'Start 25-50 mcg in elderly or cardiac disease' }
            ],
            keySideEffect: 'Iatrogenic hyperthyroidism, palpitations, osteopenia.',
            contraindication: 'Untreated adrenal insufficiency.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Hyperthyroidism Inhibition',
        recommendation: 'Thionamides (Methimazole / PTU).',
        drugClasses: [
          {
            className: 'Thionamides',
            mechanism: 'Inhibits Thyroid Peroxidase (TPO) enzyme -> blocks iodide organification.',
            drugs: [
              { name: 'Methimazole', dose: '15 - 40 mg OD', note: 'First-line for Graves (except 1st trimester pregnancy)' },
              { name: 'Propylthiouracil (PTU)', dose: '100 - 150 mg TID', note: 'Blocks peripheral T4 -> T3 conversion; preferred in 1st trimester' }
            ],
            keySideEffect: 'Agranulocytosis (sore throat, fever), severe hepatotoxicity (PTU).',
            contraindication: 'Severe liver failure (PTU).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Pregnancy Hyperthyroidism', choice: 'PTU in 1st trimester (prevents Methimazole aplasia cutis); switch to Methimazole in 2nd/3rd trimester.' }
    ],
    drugInteractions: [
      'Levothyroxine + Calcium / Iron Supplements: Chelation binding in gut reduces T4 absorption. Separate by 4 hours.'
    ],
    monitoringParameters: [
      'TSH & Free T4 every 6-8 weeks; CBC immediately if fever/sore throat on Thionamides (agranulocytosis).'
    ],
    gpatMindMapTips: [
      'Propylthiouracil (PTU) has dual action: Inhibits TPO enzyme AND inhibits peripheral 5-deiodinase conversion of T4 to T3.',
      'Agranulocytosis (ANC < 500) is a life-threatening thionamide adverse effect.'
    ]
  },
  {
    id: 'adrenal-cushings-addisons',
    diseaseName: 'Adrenal Disorders (Cushing’s & Addison’s)',
    category: 'Endocrine System',
    icdCode: 'E24 / E27',
    pathophysiology: 'Cushing’s: Chronic cortisol excess (pituitary adenoma / exogenous steroids). Addison’s: Autoimmune destruction of adrenal cortex leading to glucocorticoid & mineralocorticoid deficiency.',
    diagnosticCriteria: [
      'Cushing’s: 24h Urinary Free Cortisol elevation + Overnight 1mg Dexamethasone Suppression Test (failure to suppress cortisol < 1.8 mcg/dL)',
      'Addison’s: Hyponatremia + Hyperkalemia + Hypoglycemia + Low morning Cortisol (< 3 mcg/dL) & High ACTH'
    ],
    lifestyleInterventions: [
      'Addison’s MedicAlert Bracelet & Emergency Hydrocortisone Injection Kit',
      'Increase Sodium Intake during heat / fever stress'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Addisonian Addison’s Crisis / Replacement',
        recommendation: 'Glucocorticoid + Mineralocorticoid replacement.',
        drugClasses: [
          {
            className: 'Corticosteroids & Mineralocorticoids',
            mechanism: 'Replaces endogenous cortisol and aldosterone.',
            drugs: [
              { name: 'Hydrocortisone', dose: '15 - 25 mg daily (2/3 morning, 1/3 afternoon)', note: 'Short half-life mimicking physiological circadian rhythm' },
              { name: 'Fludrocortisone', dose: '0.05 - 0.2 mg OD morning', note: 'Potent mineralocorticoid replacing aldosterone' }
            ],
            keySideEffect: 'Cushingoid features, hypertension, fluid retention, hyperglycemia.',
            contraindication: 'Systemic fungal infections.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Addisonian Crisis (Emergency)', choice: 'IV Hydrocortisone 100mg stat, then 100mg q6h + IV 0.9% Saline Resuscitation.' },
      { condition: 'Stress / Surgery Dosing', choice: 'Double or triple oral hydrocortisone dose during fever/infection ("Sick Day Rules").' }
    ],
    drugInteractions: [
      'Ketoconazole / Etomidate: Inhibits adrenal 11-beta-hydroxylase enzyme; used off-label to lower cortisol in Cushing’s.'
    ],
    monitoringParameters: [
      'Blood Pressure, Serum Sodium & Potassium, Blood Glucose.'
    ],
    gpatMindMapTips: [
      'Fludrocortisone possesses potent mineralocorticoid activity (sodium retention & potassium excretion).',
      'Abrupt withdrawal of long-term systemic corticosteroids causes acute adrenal crisis due to HPA axis suppression.'
    ]
  },

  // -------------------------------------------------------------
  // 3. GASTROINTESTINAL SYSTEM (GIT)
  // -------------------------------------------------------------
  {
    id: 'peptic-ulcer-disease',
    diseaseName: 'Peptic Ulcer Disease (PUD) & GERD',
    category: 'Gastrointestinal System',
    icdCode: 'K27 / K21',
    pathophysiology: 'Mucosal erosion in stomach or duodenum due to imbalance between aggressive factors (Gastric Acid, Pepsin, H. pylori, NSAIDs) and defensive protective factors (Bicarbonate, Mucus, Prostaglandins PGE2).',
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
              { name: 'Omeprazole', dose: '20 - 40 mg OD 30 min before breakfast', note: 'Prodrug converted to active sulfenamide in acidic canaliculus' },
              { name: 'Pantoprazole', dose: '40 mg OD', note: 'Lowest CYP2C19 inhibition (safer with Clopidogrel)' }
            ],
            keySideEffect: 'Hypomagnesemia, C. difficile diarrhea, bone fractures long-term.',
            contraindication: 'Hypersensitivity.'
          }
        ]
      },
      {
        step: 2,
        stage: 'H. Pylori 14-Day Eradication Protocol',
        recommendation: 'Bismuth Quadruple or Triple Therapy.',
        drugClasses: [
          {
            className: 'Quadruple Eradication Therapy',
            mechanism: 'PPI + Dual Antibiotics + Mucosal Protectant.',
            drugs: [
              { name: 'Bismuth Quadruple Therapy', dose: 'PPI BD + Bismuth Subsalicylate 524mg QID + Metronidazole 500mg TID + Tetracycline 500mg QID x 14 days', note: 'High eradication rate' }
            ],
            keySideEffect: 'Black stool (bismuth), metallic taste (metronidazole).',
            contraindication: 'Penicillin allergy (replace amoxicillin).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'NSAID Protection', choice: 'Co-prescribe PPI or Misoprostol alongside chronic NSAID.' }
    ],
    drugInteractions: [
      'Omeprazole + Clopidogrel: CYP2C19 inhibition reduces active metabolite of Clopidogrel. Use Pantoprazole.',
      'Sucralfate + Fluoroquinolones: Chelation binding in stomach; separate by 2 hours.'
    ],
    monitoringParameters: [
      'Urea Breath Test 4 weeks post-treatment to confirm H. pylori eradication.'
    ],
    gpatMindMapTips: [
      'Misoprostol is a synthetic PGE1 analog contraindicated in pregnancy due to abortifacient action (uterine contractions).',
      'Sucralfate requires acidic pH (< 4) to polymerize into a viscous paste.'
    ]
  },
  {
    id: 'inflammatory-bowel-disease',
    diseaseName: 'Inflammatory Bowel Disease (UC & Crohn’s)',
    category: 'Gastrointestinal System',
    icdCode: 'K50 / K51',
    pathophysiology: 'Ulcerative Colitis: Mucosal inflammation restricted continuously to colon/rectum. Crohn’s Disease: Transmural, skip-lesion inflammation anywhere in GI tract.',
    diagnosticCriteria: [
      'Colonoscopy & Biopsy: Continuous mucosal ulceration (UC) vs Cobblestoning & granulomas (Crohn’s)',
      'Fecal Calprotectin > 50-100 mcg/g'
    ],
    lifestyleInterventions: [
      'Low-FODMAP Diet during acute flares; Avoid NSAIDs'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Mild-to-Moderate Induction & Maintenance',
        recommendation: '5-Aminosalicylates (5-ASA).',
        drugClasses: [
          {
            className: '5-Aminosalicylates (5-ASA)',
            mechanism: 'Inhibits COX & lipoxygenase in colonic mucosa -> reduces leukotrienes.',
            drugs: [
              { name: 'Mesalamine', dose: '2.4 - 4.8 g daily', note: 'Eudragit L/S pH-dependent enteric coating' },
              { name: 'Sulfasalazine', dose: '2 - 4 g daily', note: 'Cleaved by bacterial azoreductases in colon' }
            ],
            keySideEffect: 'Headache, interstitial nephritis, sulfasalazine male infertility.',
            contraindication: 'Salicylate hypersensitivity.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Severe Refractory Flare', choice: 'IV Hydrocortisone 100mg QID or Biologic Anti-TNF (Infliximab) / Vedolizumab.' }
    ],
    drugInteractions: [
      'Azathioprine + Allopurinol: Allopurinol inhibits Xanthine Oxidase -> 4-fold surge in toxic 6-MP. Reduce Azathioprine dose by 75%!'
    ],
    monitoringParameters: [
      'TPMT testing prior to starting Azathioprine; CBC bi-weekly.'
    ],
    gpatMindMapTips: [
      'Sulfasalazine consists of 5-ASA linked to Sulfapyridine by an azo bond cleaved by colonic bacteria.',
      'Vedolizumab is a gut-selective anti-alpha-4-beta-7 integrin mAb.'
    ]
  },
  {
    id: 'cirrhosis-hepatic-failure',
    diseaseName: 'Liver Cirrhosis & Hepatic Encephalopathy',
    category: 'Gastrointestinal System',
    icdCode: 'K74 / K72',
    pathophysiology: 'Diffuse hepatic fibrosis, nodular regeneration, and portal hypertension secondary to chronic liver injury (Alcohol, NASH, Hepatitis B/C), resulting in impaired ammonia clearance and hepatic encephalopathy.',
    diagnosticCriteria: [
      'Liver Biopsy / Transient Elastography (FibroScan): Confirms stage F4 fibrosis',
      'Child-Pugh Score & MELD Score: Assesses cirrhosis mortality risk',
      'Elevated Serum Ammonia (> 50-100 umol/L) + Asterixis ("flapping tremor") in Encephalopathy'
    ],
    lifestyleInterventions: [
      'Absolute Alcohol Cessation',
      'Sodium Restriction < 2,000 mg/day for Ascites management'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Ascites & Hepatic Encephalopathy Protocol',
        recommendation: 'Diuretic combination (Spironolactone + Furosemide) + Non-absorbable disaccharide.',
        drugClasses: [
          {
            className: 'Non-Absorbable Disaccharide & Antibiotics',
            mechanism: 'Lactulose converted by colonic bacteria to lactic acid -> lowers colonic pH -> traps ammonia as non-absorbable NH4+ ion.',
            drugs: [
              { name: 'Lactulose', dose: '30 - 45 mL 3-4 times daily', note: 'Titrate to achieve 2-3 soft bowel movements per day' },
              { name: 'Rifaximin', dose: '550 mg BD', note: 'Non-absorbable antibiotic reducing urease-producing gut bacteria' }
            ],
            keySideEffect: 'Diarrhea, abdominal cramps, dehydration.',
            contraindication: 'Bowel obstruction.'
          },
          {
            className: 'Ascites Diuretic Combination Therapy',
            mechanism: 'Spironolactone (MRA) + Furosemide (Loop) in 100mg:40mg ratio to maintain normokalemia.',
            drugs: [
              { name: 'Spironolactone + Furosemide', dose: '100 mg / 40 mg OD morning', note: 'Maintain 100:40 ratio during dose titration up to 400:160 mg' }
            ],
            keySideEffect: 'Electrolyte imbalance, gynecomastia, renal failure.',
            contraindication: 'Anuria, severe hyponatremia.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Acute Esophageal Variceal Bleeding', choice: 'IV Octreotide (Somatostatin analog) + Endoscopic Variceal Ligation (EVL) + Prophylactic Ceftriaxone.' },
      { condition: 'Secondary Variceal Prophylaxis', choice: 'Non-selective Beta-Blockers (Propranolol / Nadolol) to lower portal venous pressure.' }
    ],
    drugInteractions: [
      'Sedatives / Benzodiazepines + Cirrhosis: Impaired hepatic clearance triggers acute fatal Hepatic Encephalopathy coma.'
    ],
    monitoringParameters: [
      'Child-Pugh / MELD score, Serum Ammonia, LFTs, INR (PT), Serum Electrolytes.'
    ],
    gpatMindMapTips: [
      'Lactulose mechanism: Cleaved into organic acids in colon, converting NH3 (ammonia) into non-absorbable NH4+ (ammonium ion).',
      'Propranolol lowers portal pressure via dual action: Beta-1 blockade (decreases cardiac output) + Beta-2 blockade (unopposed alpha-1 splanchnic vasoconstriction).'
    ]
  },

  // -------------------------------------------------------------
  // 4. RESPIRATORY SYSTEM
  // -------------------------------------------------------------
  {
    id: 'asthma-copd',
    diseaseName: 'Bronchial Asthma & COPD',
    category: 'Respiratory System',
    icdCode: 'J45 / J44',
    pathophysiology: 'Chronic airway inflammation with bronchial hyperresponsiveness, smooth muscle spasm, and airflow obstruction (reversible in Asthma; progressive in COPD).',
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
          },
          {
            className: 'LAMA (Long-Acting Muscarinic Antagonist)',
            mechanism: 'Blocks M3 acetylcholine receptors on airway smooth muscle.',
            drugs: [
              { name: 'Tiotropium bromide', dose: '18 mcg DPI OD', note: 'First-line backbone in COPD' }
            ],
            keySideEffect: 'Dry mouth, urinary retention.',
            contraindication: 'Glaucoma, BPH.'
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
      'Theophylline mechanism: Non-selective PDE-3/4 inhibitor and adenosine A1/A2A antagonist.',
      'Rinse mouth after ICS to prevent oral candidiasis.'
    ]
  },
  {
    id: 'pneumonia-ards',
    diseaseName: 'Pneumonia & Acute Respiratory Distress Syndrome',
    category: 'Respiratory System',
    icdCode: 'J18 / J80',
    pathophysiology: 'Pneumonia: Acute alveolar pulmonary parenchyma infection (Streptococcus pneumoniae). ARDS: Non-cardiogenic pulmonary edema and diffuse alveolar damage caused by severe systemic inflammation / sepsis.',
    diagnosticCriteria: [
      'Chest X-Ray / CT: Lobar consolidation or bilateral patchy ground-glass infiltrates',
      'ARDS Berlin Definition: PaO2/FiO2 ratio ≤ 300 mmHg with PEEP ≥ 5 cmH2O',
      'CURB-65 Score for Community-Acquired Pneumonia (CAP) severity'
    ],
    lifestyleInterventions: [
      'Pneumococcal (PCV13 / PPSV23) & Influenza Vaccination',
      'Early Mobility & Pulmonary Hygiene'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Empiric CAP Antibiotic Protocol',
        recommendation: 'Beta-lactam + Macrolide or Respiratory Fluoroquinolone.',
        drugClasses: [
          {
            className: 'Empiric Antimicrobial Combination',
            mechanism: 'Covers typical (S. pneumoniae) and atypical (Legionella, Mycoplasma) respiratory pathogens.',
            drugs: [
              { name: 'Amoxicillin/Clavulanate + Azithromycin', dose: '1g BD + 500mg OD x 5-7 days', note: 'Outpatient CAP regimen' },
              { name: 'Ceftriaxone + Azithromycin', dose: '1-2g IV OD + 500mg IV OD', note: 'Inpatient ward CAP protocol' },
              { name: 'Levofloxacin / Moxifloxacin', dose: '750 mg OD / 400 mg OD', note: 'Respiratory Fluoroquinolone monotherapy' }
            ],
            keySideEffect: 'Diarrhea, QT prolongation (macrolides/fluoroquinolones), tendonitis (fluoroquinolones).',
            contraindication: 'Fluoroquinolone tendonitis history, Myasthenia Gravis.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'ARDS Mechanical Ventilation', choice: 'Low Tidal Volume Ventilation (6 mL/kg predicted body weight) + Dexamethasone 6mg IV daily.' }
    ],
    drugInteractions: [
      'Azithromycin / Fluoroquinolones + QT-prolonging drugs: Additive risk of Torsades de Pointes arrhythmia.'
    ],
    monitoringParameters: [
      'Arterial Blood Gas (ABG PaO2/FiO2), Sputum culture, Blood cultures, Procalcitonin.'
    ],
    gpatMindMapTips: [
      'Azithromycin inhibits bacterial 50S ribosomal subunit protein synthesis.',
      'Levofloxacin inhibits bacterial DNA Gyrase (Topoisomerase II) and Topoisomerase IV.'
    ]
  },

  // -------------------------------------------------------------
  // 5. CENTRAL NERVOUS SYSTEM & PSYCHIATRY (CNS)
  // -------------------------------------------------------------
  {
    id: 'epilepsy-seizures',
    diseaseName: 'Epilepsy & Seizure Disorders',
    category: 'Central Nervous System',
    icdCode: 'G40',
    pathophysiology: 'Excessive, hypersynchronous electrical discharges of cortical cerebral neurons caused by imbalance between excitatory (Glutamate) and inhibitory (GABA) neurotransmission.',
    diagnosticCriteria: [
      'EEG: Epileptiform spikes & sharp waves',
      'Brain MRI: Hippocampal sclerosis / structural lesion'
    ],
    lifestyleInterventions: [
      'Strict Sleep Hygiene; Ketogenic Diet in pediatric refractory epilepsy'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line AED Monotherapy',
        recommendation: 'Select AED based on seizure semiology.',
        drugClasses: [
          {
            className: 'Broad-Spectrum AEDs',
            mechanism: 'Blocks Na+ channels, boosts GABA, blocks T-type Ca2+ channels.',
            drugs: [
              { name: 'Sodium Valproate', dose: '500 - 2000 mg daily', note: 'First-line for Generalized & Myoclonic seizures' },
              { name: 'Levetiracetam', dose: '1000 - 3000 mg BD', note: 'Binds SV2A protein; zero hepatic CYP interaction' }
            ],
            keySideEffect: 'Valproate: Weight gain, alopecia, hepatotoxicity, neural tube defects in pregnancy.',
            contraindication: 'Pregnancy (Valproate teratogenic).'
          },
          {
            className: 'Narrow-Spectrum Na+ Channel Blockers',
            mechanism: 'Stabilizes inactive state of neuronal Na+ channels.',
            drugs: [
              { name: 'Carbamazepine', dose: '400 - 1200 mg daily', note: 'Potent CYP inducer; auto-induction' },
              { name: 'Phenytoin', dose: '300 - 400 mg daily', note: 'Zero-order saturation kinetics' },
              { name: 'Lamotrigine', dose: '100 - 400 mg daily', note: 'Safe in pregnancy' }
            ],
            keySideEffect: 'Carbamazepine hyponatremia (SIADH), SJS rash (HLA-B*1502).',
            contraindication: 'Absence / Myoclonic seizures (worsened by Carbamazepine/Phenytoin).'
          },
          {
            className: 'T-Type Ca2+ Channel Blocker',
            mechanism: 'Blocks thalamic T-type Ca2+ channels.',
            drugs: [
              { name: 'Ethosuximide', dose: '500 - 1500 mg daily', note: 'Gold-standard specifically for Absence seizures' }
            ],
            keySideEffect: 'GI distress, drowsiness.',
            contraindication: 'Hypersensitivity.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Status Epilepticus Emergency Protocol (> 5 mins)',
        recommendation: 'Immediate IV Benzodiazepine.',
        drugClasses: [
          {
            className: 'Abortive Therapy',
            mechanism: 'Potentiates GABA-A chloride channel opening frequency.',
            drugs: [
              { name: 'IV Lorazepam / IV Diazepam', dose: '4mg IV / 10mg IV stat', note: 'Rapid seizure termination' }
            ],
            keySideEffect: 'Respiratory depression.',
            contraindication: 'Airway compromise without ventilation.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Pregnancy Epilepsy', choice: 'Lamotrigine or Levetiracetam monotherapy + Folic Acid 5mg/day. Avoid Valproate!' },
      { condition: 'HLA-B*1502 Asian Patients', choice: 'Screen for HLA-B*1502 before starting Carbamazepine (prevents SJS/TEN).' }
    ],
    drugInteractions: [
      'Phenytoin / Carbamazepine + OCPs: Enzyme induction causes contraceptive failure.',
      'Valproate + Lamotrigine: Valproate doubles Lamotrigine levels -> high SJS risk. Halve Lamotrigine dose.'
    ],
    monitoringParameters: [
      'TDM: Phenytoin (10-20 mcg/mL), Carbamazepine (4-12 mcg/mL), Valproate (50-100 mcg/mL).'
    ],
    gpatMindMapTips: [
      'Phenytoin exhibits zero-order Michaelis-Menten kinetics at therapeutic levels.',
      'Ethosuximide treats 3 Hz spike-and-wave Absence seizures.'
    ]
  },
  {
    id: 'parkinsons-disease',
    diseaseName: 'Parkinson’s Disease & Movement Disorders',
    category: 'Central Nervous System',
    icdCode: 'G20',
    pathophysiology: 'Loss of dopaminergic neurons in substantia nigra pars compacta, causing striatal dopamine depletion and Lewy body accumulation.',
    diagnosticCriteria: [
      'Triad: Resting Tremor ("pill-rolling"), Bradykinesia, Rigidity ("cogwheel")',
      'Shuffling gait, postural instability, positive Levodopa trial'
    ],
    lifestyleInterventions: [
      'Physical therapy & balance training; Protein redistribution diet'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Dopamine Replacement Therapy',
        recommendation: 'Levodopa + Carbidopa gold standard.',
        drugClasses: [
          {
            className: 'Dopamine Precursor + DOPA Decarboxylase Inhibitor',
            mechanism: 'Levodopa crosses BBB; Carbidopa blocks peripheral conversion.',
            drugs: [
              { name: 'Levodopa + Carbidopa', dose: '100/25 mg TID', note: 'Carbidopa prevents peripheral nausea' }
            ],
            keySideEffect: 'Dyskinesias, wearing-off motor fluctuations, hallucinations.',
            contraindication: 'Narrow-angle glaucoma, MAO-A inhibitors.'
          },
          {
            className: 'Dopamine Agonists',
            mechanism: 'Direct striatal D2/D3 receptor stimulation.',
            drugs: [
              { name: 'Pramipexole / Ropinirole', dose: '0.125-1.5mg TID / 0.25-8mg TID', note: 'Preferred in young patients (< 60 yrs)' }
            ],
            keySideEffect: 'Impulse control disorders (gambling), sleep attacks.',
            contraindication: 'Psychosis.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'COMT Inhibitors (Entacapone)', choice: 'Add Entacapone to Levodopa to treat "wearing-off" fluctuations.' }
    ],
    drugInteractions: [
      'Levodopa + Vitamin B6 (without Carbidopa): Enhances peripheral decarboxylation, rendering Levodopa ineffective.'
    ],
    monitoringParameters: [
      'Assess motor fluctuations & impulse control behaviors.'
    ],
    gpatMindMapTips: [
      'Carbidopa does NOT cross the blood-brain barrier!',
      'Entacapone acts peripherally; Tolcapone acts centrally + peripherally (hepatotoxicity).'
    ]
  },
  {
    id: 'alzheimers-dementia',
    diseaseName: 'Alzheimer’s Disease & Cognitive Dementia',
    category: 'Central Nervous System',
    icdCode: 'G30',
    pathophysiology: 'Progressive neurodegenerative cortical atrophy marked by extracellular Amyloid-beta (Abeta42) senile plaques and intracellular hyperphosphorylated Tau neurofibrillary tangles, leading to central cholinergic deficit.',
    diagnosticCriteria: [
      'Mini-Mental State Examination (MMSE): Score < 24 indicates cognitive impairment',
      'Brain MRI: Bitemporal & hippocampal brain atrophy',
      'CSF / PET Biomarkers: Low CSF Abeta42 & positive amyloid PET scan'
    ],
    lifestyleInterventions: [
      'Cognitive Stimulation Therapy & Memory Exercises',
      'Structured Daily Routine & Caregiver Support Systems'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Mild-to-Moderate Cognitive Enhancement',
        recommendation: 'Cholinesterase Inhibitors (ChEIs).',
        drugClasses: [
          {
            className: 'Acetylcholinesterase Inhibitors (AChEIs)',
            mechanism: 'Reversibly inhibits acetylcholinesterase enzyme -> increases synaptic Acetylcholine in hippocampus.',
            drugs: [
              { name: 'Donepezil', dose: '5 - 10 mg OD at bedtime', note: 'Reversible piperidine AChEI; once daily dosing' },
              { name: 'Rivastigmine', dose: '1.5 - 6 mg BD or Transdermal patch', note: 'Dual AChE & BuChE pseudo-irreversible inhibitor' },
              { name: 'Galantamine', dose: '8 - 24 mg daily', note: 'AChEI + Allosteric nicotinic receptor modulator' }
            ],
            keySideEffect: 'Nausea, diarrhea, bradycardia, syncope, vivid dreams.',
            contraindication: 'Sick sinus syndrome, severe cardiac conduction defects.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Moderate-to-Severe Add-on Therapy',
        recommendation: 'NMDA Receptor Antagonist.',
        drugClasses: [
          {
            className: 'Uncompetitive NMDA Receptor Antagonist',
            mechanism: 'Blocks pathological tonic low-level glutamate excitotoxicity without interfering with physiological neurotransmission.',
            drugs: [
              { name: 'Memantine', dose: '5 - 20 mg daily', note: 'Neuroprotective in moderate-to-severe Alzheimer’s' }
            ],
            keySideEffect: 'Dizziness, headache, confusion, constipation.',
            contraindication: 'Severe renal failure (requires dose reduction).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Disease-Modifying Monoclonal Antibodies', choice: 'Lecanemab / Donanemab (Anti-amyloid beta mAb) for early symptomatic AD with confirmed amyloid pathology.' }
    ],
    drugInteractions: [
      'AChEIs + Anticholinergic Drugs (Diphenhydramine, Oxybutynin, Amitriptyline): Direct pharmacological antagonism rendering AChEIs completely ineffective!'
    ],
    monitoringParameters: [
      'MMSE / MoCA cognitive assessment every 6 months.',
      'MRI monitoring for Amyloid-Related Imaging Abnormalities (ARIA edema/hemorrhage) on anti-amyloid mAbs.'
    ],
    gpatMindMapTips: [
      'Donepezil is a selective, reversible AChEI with a long half-life (~70 hours) allowing once-daily bedtime dosing.',
      'Rivastigmine inhibits both Acetylcholinesterase (AChE) and Butyrylcholinesterase (BuChE).'
    ]
  },
  {
    id: 'stroke-cerebrovascular',
    diseaseName: 'Ischemic & Hemorrhagic Stroke',
    category: 'Central Nervous System',
    icdCode: 'I63 / I61',
    pathophysiology: 'Acute neurological deficit caused by focal cerebral artery occlusion (Ischemic Stroke ~85%) or cerebral vessel rupture (Hemorrhagic Stroke ~15%), leading to ischemic penumbra necrosis.',
    diagnosticCriteria: [
      'Non-Contrast Head CT Scan: MANDATORY FIRST STEP to exclude intracranial hemorrhage before thrombolysis!',
      'FAST Clinical Scale: Face drooping, Arm weakness, Speech difficulty, Time to call emergency',
      'NIH Stroke Scale (NIHSS): Quantifies stroke severity'
    ],
    lifestyleInterventions: [
      'Strict Blood Pressure & Glycemic Control',
      'Carotid Endarterectomy (CEA) for severe carotid artery stenosis (> 70%)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Acute Ischemic Stroke Thrombolysis Protocol (< 4.5 Hours Window)',
        recommendation: 'IV Thrombolysis with Alteplase / Tenecteplase if within 4.5 hours of symptom onset.',
        drugClasses: [
          {
            className: 'Recombinant Tissue Plasminogen Activator (r-tPA)',
            mechanism: 'Binds fibrin in thrombus & converts plasminogen to plasmin -> degrades fibrin clot.',
            drugs: [
              { name: 'Alteplase (rt-PA)', dose: '0.9 mg/kg IV (max 90mg) over 60 min (10% bolus over 1 min)', note: 'Strict 4.5-hour treatment window from time last known well' },
              { name: 'Tenecteplase (TNK-tPA)', dose: '0.25 mg/kg IV single bolus', note: 'Higher fibrin specificity & longer half-life' }
            ],
            keySideEffect: 'Intracranial hemorrhage (ICH), systemic bleeding, oropharyngeal angioedema.',
            contraindication: 'Active internal bleeding, BP > 185/110 mmHg, INR > 1.7, platelets < 100,000, recent head trauma / surgery.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Secondary Stroke Prevention',
        recommendation: 'Antiplatelet (Aspirin + Clopidogrel DAPT for 21 days) + High-intensity Statin.',
        drugClasses: [
          {
            className: 'Antiplatelet & Statin Secondary Prevention',
            mechanism: 'Prevents recurrent atherothrombotic emboli.',
            drugs: [
              { name: 'Aspirin + Clopidogrel', dose: 'Aspirin 81mg + Clopidogrel 75mg daily x 21 days', note: 'CHANCE / POINT trial short DAPT protocol' },
              { name: 'Atorvastatin', dose: '80 mg OD', note: 'SPARCL trial target LDL-C < 70 mg/dL' }
            ],
            keySideEffect: 'Bleeding, dyspepsia.',
            contraindication: 'Hemorrhagic stroke.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'BP Management pre-tPA', choice: 'Lower SBP < 185 mmHg and DBP < 110 mmHg using IV Labetalol or Nicardipine before initiating r-tPA.' }
    ],
    drugInteractions: [
      'Alteplase + ACE Inhibitors: Increased risk of severe oropharyngeal angioedema.',
      'Aspirin / Anticoagulants: Do NOT administer within 24 hours post-Alteplase thrombolysis.'
    ],
    monitoringParameters: [
      'Neurological checks (NIHSS) & BP monitoring q15min during tPA infusion.',
      'Follow-up CT / MRI at 24 hours post-tPA to rule out hemorrhagic transformation before starting antiplatelets.'
    ],
    gpatMindMapTips: [
      'Alteplase antidote for major life-threatening bleeding: Tranexamic Acid or Aminocaproic Acid (fibrinolysis inhibitors).',
      'Tenecteplase is a genetically modified variant of Alteplase with higher fibrin specificity and resistance to PAI-1.'
    ]
  },
  {
    id: 'schizophrenia-bipolar',
    diseaseName: 'Schizophrenia & Bipolar Disorder',
    category: 'Psychiatry & CNS',
    icdCode: 'F20 / F31',
    pathophysiology: 'Schizophrenia: Mesolimbic dopamine hyperactivity (positive symptoms) & mesocortical dopamine hypoactivity (negative symptoms). Bipolar: Cyclical mood swings between mania and depression.',
    diagnosticCriteria: [
      'Schizophrenia: ≥ 2 symptoms for ≥ 1 month (delusions, hallucinations, disorganized speech)',
      'Bipolar I: At least 1 manic episode (elevated mood, decreased sleep need, grandiosity for ≥ 1 week)'
    ],
    lifestyleInterventions: [
      'Psychoeducation & Assertive Community Treatment',
      'Avoid illicit drugs / cannabis (triggers psychotic relapses)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line Antipsychotic & Mood Stabilizer Therapy',
        recommendation: 'Atypical Second-Generation Antipsychotics (SGAs) or Lithium.',
        drugClasses: [
          {
            className: 'Second-Generation Atypical Antipsychotics (SGAs)',
            mechanism: 'Dual D2 dopamine receptor & 5-HT2A serotonin receptor antagonism.',
            drugs: [
              { name: 'Risperidone', dose: '2 - 6 mg daily', note: 'Potent D2 blocker; elevated prolactin risk' },
              { name: 'Olanzapine', dose: '5 - 20 mg daily at bedtime', note: 'Highly effective; metabolic syndrome risk' },
              { name: 'Aripiprazole', dose: '10 - 30 mg OD', note: 'D2 partial agonist ("dopamine stabilizer"); low metabolic risk' },
              { name: 'Clozapine', dose: '125 - 450 mg daily', note: 'Gold-standard for Treatment-Resistant Schizophrenia' }
            ],
            keySideEffect: 'Metabolic syndrome (weight gain, dyslipidemia, diabetes), extrapyramidal symptoms (EPS), tardive dyskinesia.',
            contraindication: 'Clozapine: ANC < 1500/mm3 (Agranulocytosis black box warning).'
          },
          {
            className: 'Mood Stabilizers (Bipolar Disorder)',
            mechanism: 'Inhibits inositol monophosphatase (IMPase) & glycogen synthase kinase-3 (GSK-3).',
            drugs: [
              { name: 'Lithium Carbonate', dose: '600 - 1200 mg daily in divided doses', note: 'Gold-standard anti-suicidal mood stabilizer' }
            ],
            keySideEffect: 'Fine hand tremor, hypothyroidism, nephrogenic diabetes insipidus, weight gain.',
            contraindication: 'Severe renal failure, severe cardiovascular disease.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Treatment-Resistant Schizophrenia', choice: 'Clozapine is the ONLY evidence-based drug. Mandatory ANC blood monitoring weekly.' }
    ],
    drugInteractions: [
      'Lithium + Thiazide Diuretics / NSAIDs / ACEIs: Reduced renal clearance leads to severe fatal Lithium Toxicity (target range 0.6 - 1.2 mEq/L).',
      'Antipsychotics + QT Prolonging Drugs: Risk of Torsades de Pointes.'
    ],
    monitoringParameters: [
      'Lithium Serum Levels (Therapeutic window: 0.6 - 1.2 mEq/L for maintenance; 1.0 - 1.5 mEq/L acute mania).',
      'Absolute Neutrophil Count (ANC) weekly for Clozapine.',
      'Fasting lipids, HbA1c, & weight for Olanzapine.'
    ],
    gpatMindMapTips: [
      'Clozapine causes life-threatening Agranulocytosis (1-2%) requiring strict blood monitoring (ANC > 1500 to start).',
      'Aripiprazole is a partial agonist at D2 and 5-HT1A receptors and antagonist at 5-HT2A receptors.',
      'Neuroleptic Malignant Syndrome (NMS) triad: Fever, muscle rigidity ("lead-pipe"), and autonomic instability treated with Dantrolene & Bromocriptine.'
    ]
  },

  // -------------------------------------------------------------
  // 6. MUSCULOSKELETAL SYSTEM
  // -------------------------------------------------------------
  {
    id: 'rheumatoid-arthritis',
    diseaseName: 'Rheumatoid Arthritis & Gout',
    category: 'Musculoskeletal System',
    icdCode: 'M05 / M10',
    pathophysiology: 'RA: Autoimmune synovial pannus destruction. Gout: Monosodium urate (MSU) crystal deposition secondary to hyperuricemia (> 6.8 mg/dL).',
    diagnosticCriteria: [
      'RA: Positive Anti-CCP & RF; elevated ESR/CRP',
      'Gout: Negatively birefringent needle-shaped MSU crystals on joint aspirate'
    ],
    lifestyleInterventions: [
      'Gout: Low-purine diet (avoid red meat, beer); Maintain urine output > 2L/day'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Acute Gout & RA Baseline Therapy',
        recommendation: 'Gout: Colchicine / NSAIDs; RA: csDMARDs.',
        drugClasses: [
          {
            className: 'Xanthine Oxidase Inhibitors (Urate-Lowering Therapy)',
            mechanism: 'Inhibits Xanthine Oxidase, blocking hypoxanthine -> uric acid synthesis.',
            drugs: [
              { name: 'Allopurinol', dose: '100 - 300 mg OD', note: 'Start low & titrate; test HLA-B*5801 in Han Chinese' },
              { name: 'Febuxostat', dose: '40 - 80 mg OD', note: 'Non-purine selective XO inhibitor' }
            ],
            keySideEffect: 'Allopurinol hypersensitivity syndrome (SJS), acute gout mobilization flare.',
            contraindication: 'Do not start during acute gout flare without anti-inflammatory cover.'
          },
          {
            className: 'Colchicine (Acute Gout)',
            mechanism: 'Binds tubulin, inhibiting neutrophil chemotaxis.',
            drugs: [
              { name: 'Colchicine', dose: '1.2 mg at onset, then 0.6 mg 1 hour later', note: 'Low-dose regimen equally effective' }
            ],
            keySideEffect: 'Diarrhea, vomiting, bone marrow suppression.',
            contraindication: 'Severe renal/hepatic impairment with CYP3A4 inhibitors.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'RA Anchor DMARD', choice: 'Methotrexate ONCE WEEKLY + Folic Acid 5mg weekly.' }
    ],
    drugInteractions: [
      'Allopurinol + Azathioprine / 6-MP: Inhibits 6-MP breakdown -> fatal bone marrow aplasia. Reduce Azathioprine by 75%!'
    ],
    monitoringParameters: [
      'Serum Uric Acid target < 6.0 mg/dL; CBC & LFTs for Methotrexate.'
    ],
    gpatMindMapTips: [
      'Colchicine arrests cell division at metaphase by binding tubulin heterodimers.',
      'Methotrexate ONCE WEEKLY dosing is critical! Daily use causes fatal pancytopenia.'
    ]
  },
  {
    id: 'osteoporosis',
    diseaseName: 'Osteoporosis & Bone Mineral Disorders',
    category: 'Musculoskeletal System',
    icdCode: 'M81',
    pathophysiology: 'Metabolic bone disease characterized by compromised bone strength and microarchitectural deterioration caused by osteoclast-mediated bone resorption exceeding osteoblast-mediated bone formation (postmenopausal estrogen loss / aging).',
    diagnosticCriteria: [
      'DXA Scan Bone Mineral Density (BMD): T-score ≤ -2.5 SD at lumbar spine or femoral neck (Osteopenia: T-score -1.0 to -2.5)',
      'Fragility Fracture: Low-trauma fracture of hip, spine, or wrist',
      'FRAX Score: 10-year major osteoporotic fracture probability'
    ],
    lifestyleInterventions: [
      'Calcium (1,000 - 1,200 mg/day) & Vitamin D3 (800 - 2,000 IU/day) supplementation',
      'Weight-Bearing & Resistance Exercise (walking, stair climbing)',
      'Fall Prevention Measures & Avoidance of Alcohol / Smoking'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line Antiresorptive Therapy',
        recommendation: 'Oral Bisphosphonates are first-line.',
        drugClasses: [
          {
            className: 'Bisphosphonates',
            mechanism: 'Binds hydroxyapatite crystals in bone; taken up by osteoclasts -> inhibits farnesyl pyrophosphate (FPP) synthase -> induces osteoclast apoptosis.',
            drugs: [
              { name: 'Alendronate', dose: '70 mg ONCE WEEKLY oral', note: 'Take first thing in morning with 8 oz plain water; stay upright 30 mins' },
              { name: 'Risedronate', dose: '35 mg ONCE WEEKLY or 150 mg MONTHLY', note: 'Reduces vertebral & non-vertebral fractures' },
              { name: 'Zoledronic Acid', dose: '5 mg IV ONCE YEARLY infusion', note: 'Bypasses GI administration barrier' }
            ],
            keySideEffect: 'Esophagitis / esophageal ulceration, atypical femoral fractures (AFF), osteonecrosis of the jaw (ONJ).',
            contraindication: 'Esophageal stricture / inability to stand/sit upright for 30 minutes, Hypocalcemia, eGFR < 35 mL/min.'
          },
          {
            className: 'RANKL Inhibitor Monoclonal Antibody',
            mechanism: 'Human mAb that binds RANKL, blocking RANK receptor activation on osteoclasts -> inhibits osteoclast maturation.',
            drugs: [
              { name: 'Denosumab', dose: '60 mg SC every 6 months', note: 'Reversible antiresorptive; requires lifelong continuation or bisphosphonate bridge upon stopping' }
            ],
            keySideEffect: 'Hypocalcemia, skin infections (cellulitis), ONJ.',
            contraindication: 'Pre-existing hypocalcemia.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Anabolic Bone-Forming Agents (Very High Fracture Risk)',
        recommendation: 'Parathyroid Hormone (PTH) analogs for anabolic bone building.',
        drugClasses: [
          {
            className: 'Recombinant Parathyroid Hormone Analogs (Anabolic)',
            mechanism: 'Intermittent daily administration stimulates osteoblastic bone formation over resorption.',
            drugs: [
              { name: 'Teriparatide (PTH 1-34)', dose: '20 mcg SC daily (max 2 years total lifetime treatment)', note: 'Potent bone builder' }
            ],
            keySideEffect: 'Hypercalcemia, dizziness, leg cramps.',
            contraindication: 'Paget’s disease of bone, prior skeletal radiation therapy, unexplained elevated alkaline phosphatase (Osteosarcoma risk).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Postmenopausal Osteoporosis with Breast Cancer Risk', choice: 'Raloxifene (Selective Estrogen Receptor Modulator SERM) - acts as estrogen agonist in bone but antagonist in breast/uterus.' }
    ],
    drugInteractions: [
      'Bisphosphonates + Calcium / Food / Coffee: Food & cations reduce bisphosphonate bioavailability to < 1%! Must take strictly on empty stomach with plain water.'
    ],
    monitoringParameters: [
      'Repeat DXA Scan BMD every 1-2 years.',
      'Serum Calcium & 25-hydroxyvitamin D levels prior to starting bisphosphonates or denosumab.'
    ],
    gpatMindMapTips: [
      'Oral Bisphosphonates MUST be taken with a full glass of plain water after overnight fasting, remaining upright for 30-60 minutes to prevent fatal esophageal perforation.',
      'Teriparatide is a recombinant fragment of human parathyroid hormone (PTH 1-34) restricted to 2 years lifetime use due to osteosarcoma risk in rat studies.',
      'Raloxifene is an estrogen agonist in bone (prevents bone loss) and antagonist in breast tissue (reduces invasive breast cancer risk).'
    ]
  },

  // -------------------------------------------------------------
  // 7. NEPHROLOGY & GENITOURINARY SYSTEM
  // -------------------------------------------------------------
  {
    id: 'chronic-kidney-disease',
    diseaseName: 'Chronic Kidney Disease (CKD)',
    category: 'Nephrology & Renal',
    icdCode: 'N18',
    pathophysiology: 'Progressive, irreversible loss of renal nephron architecture (> 3 months) leading to uremic toxin accumulation, fluid overload, hyperkalemia, metabolic acidosis, and EPO deficiency anemia.',
    diagnosticCriteria: [
      'eGFR < 60 mL/min/1.73m2 for > 3 months',
      'Albuminuria (uACR): A1 (<30), A2 (30-300 micro), A3 (>300 macro mg/g)',
      'Staging: G1 (≥90), G2 (60-89), G3a (45-59), G3b (30-44), G4 (15-29), G5 (<15 or Dialysis)'
    ],
    lifestyleInterventions: [
      'Protein Limit 0.6-0.8 g/kg/day; Potassium Limit < 2,000 mg/day in advanced CKD'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Renoprotective Therapy',
        recommendation: 'ACEI/ARB + SGLT2 inhibitor.',
        drugClasses: [
          {
            className: 'RAAS & SGLT2 Renoprotective Agents',
            mechanism: 'ACEI/ARB dilates efferent arteriole; SGLT2i restores tubuloglomerular feedback.',
            drugs: [
              { name: 'Dapagliflozin / Empagliflozin', dose: '10 mg OD', note: 'Proven reduction in ESRD (DAPA-CKD trial)' },
              { name: 'Telmisartan / Ramipril', dose: 'Max tolerated dose', note: 'Mandatory in albuminuria' }
            ],
            keySideEffect: 'Initial mild eGFR dip (< 30% acceptable), hyperkalemia.',
            contraindication: 'eGFR < 20 mL/min for SGLT2i initiation.'
          },
          {
            className: 'Renal Anemia & Phosphate Binders',
            mechanism: 'ESA stimulates erythropoiesis; Phosphate binders bind gut phosphate.',
            drugs: [
              { name: 'Erythropoietin (EPO)', dose: '20-50 units/kg SC 1-3x weekly', note: 'Target Hb 10 - 11.5 g/dL' },
              { name: 'Sevelamer Carbonate', dose: '800 - 1600 mg TID with meals', note: 'Non-calcium polymer binder' }
            ],
            keySideEffect: 'EPO hypertension, thrombosis.',
            contraindication: 'Uncontrolled severe hypertension.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Renal Dosing', choice: 'Calculate CrCl via Cockcroft-Gault formula. Adjust renally cleared drugs (Gabapentin, Enoxaparin).' }
    ],
    drugInteractions: [
      'NSAIDs + CKD: Afferent arteriolar constriction precipitates acute renal failure.',
      'Potassium Supplements + ACEIs: Severe fatal hyperkalemia.'
    ],
    monitoringParameters: [
      'Serum Cr, eGFR, K+, Ca2+, Phosphate every 1-3 months.'
    ],
    gpatMindMapTips: [
      'Cockcroft-Gault: [(140-Age) x Wt(kg)] / [72 x SCr] x (0.85 if female).',
      'Sevelamer is a non-absorbed phosphate-binding polymer free of calcium and aluminum.'
    ]
  },
  {
    id: 'aki-nephrotic-syndrome',
    diseaseName: 'Acute Kidney Injury (AKI) & Nephrotic Syndrome',
    category: 'Nephrology & Renal',
    icdCode: 'N17 / N04',
    pathophysiology: 'AKI: Rapid decline in renal function (< 48h) classified into Prerenal (hypoperfusion), Intrinsic (ATN / nephrotoxins), and Postrenal (obstruction). Nephrotic Syndrome: Podocyte effacement causing heavy proteinuria (> 3.5 g/day), hypoalbuminemia, hyperlipidemia, and severe generalized edema (anasarca).',
    diagnosticCriteria: [
      'KDIGO AKI Definition: Serum Creatinine increase by ≥ 0.3 mg/dL within 48h OR ≥ 1.5x baseline within 7 days OR Urine output < 0.5 mL/kg/hr for 6 hours',
      'Nephrotic Triad: Heavy Proteinuria (> 3.5 g/24h) + Hypoalbuminemia (< 3.0 g/dL) + Generalized Edema'
    ],
    lifestyleInterventions: [
      'Discontinue all nephrotoxic medications (NSAIDs, Aminoglycosides, Radiocontrast)',
      'Sodium Restriction < 2,000 mg/day & Fluid Balance Monitoring'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'AKI Volume Management & Nephrotic Immunosuppression',
        recommendation: 'Prerenal AKI: IV Isotonic Crystalloids. Nephrotic: High-dose Corticosteroids.',
        drugClasses: [
          {
            className: 'Nephrotic Corticosteroids & Diuretics',
            mechanism: 'Prednisone suppresses T-cell immune-mediated podocyte injury; Loop diuretics treat anasarca.',
            drugs: [
              { name: 'Prednisolone', dose: '1 mg/kg/day (max 80mg) x 8-12 weeks', note: 'First-line for Minimal Change Disease (MCD)' },
              { name: 'Furosemide', dose: '40 - 120 mg IV/Oral daily', note: 'Loop diuretic targeting Na+/K+/2Cl- co-transporter in thick ascending Limb of Henle' }
            ],
            keySideEffect: 'Furosemide: Ototoxicity, hypokalemia, hyperuricemia, acute interstitial nephritis.',
            contraindication: 'Anuria, severe electrolyte depletion.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Nephrotic Hypercoagulability Risk', choice: 'Serum Albumin < 2.0 g/dL causes loss of Antithrombin III in urine; initiate prophylactic Anticoagulation (Enoxaparin / Warfarin) for renal vein thrombosis prevention.' }
    ],
    drugInteractions: [
      'Aminoglycosides (Gentamicin) + Furosemide: Synergistic severe ototoxicity & nephrotoxicity.',
      'NSAIDs + Triamterene / ACEIs: Acute hemodynamic AKI.'
    ],
    monitoringParameters: [
      'Daily Urine Output, Serum Creatinine & Electrolytes q24h in AKI.',
      '24-hour urine protein & serum albumin in Nephrotic Syndrome.'
    ],
    gpatMindMapTips: [
      'Furosemide inhibits the Na+/K+/2Cl- (NKCC2) cotransporter in the thick ascending limb of the Loop of Henle, causing profound diuresis and urinary Ca2+ loss.',
      'Minimal Change Disease is the most common cause of Nephrotic Syndrome in children, showing dramatic response to oral Prednisone.'
    ]
  },
  {
    id: 'bph-erectile-dysfunction',
    diseaseName: 'Benign Prostatic Hyperplasia & Erectile Dysfunction',
    category: 'Nephrology & Renal',
    icdCode: 'N40 / N52',
    pathophysiology: 'BPH: Non-malignant enlargement of prostatic stromal & epithelial cells driven by Dihydrotestosterone (DHT), causing bladder outlet obstruction. ED: Inability to achieve penile erection due to impaired NO-cGMP mediated cavernosal arterial relaxation.',
    diagnosticCriteria: [
      'IPSS (International Prostate Symptom Score): Evaluates lower urinary tract symptoms (LUTS)',
      'Digital Rectal Exam (DRE) & Serum PSA (Prostate Specific Antigen < 4.0 ng/mL)',
      'IIEF-5 Questionnaire for Erectile Dysfunction'
    ],
    lifestyleInterventions: [
      'Limit evening fluid intake; Avoid caffeine and alcohol before bed',
      'Avoid OTC Decongestants (Pseudoephedrine alpha-1 agonists exacerbate urinary retention)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'BPH & ED Dual Medical Management',
        recommendation: 'Alpha-1 blocker for rapid LUTS relief + 5-Alpha Reductase Inhibitor for prostate size reduction.',
        drugClasses: [
          {
            className: 'Uroselective Alpha-1A Receptor Blockers',
            mechanism: 'Selectively blocks Alpha-1A receptors in prostate smooth muscle & bladder neck -> rapid dynamic relaxation.',
            drugs: [
              { name: 'Tamsulosin', dose: '0.4 mg OD 30 min after same meal daily', note: 'Uroselective Alpha-1A blocker (minimal BP effect)' },
              { name: 'Silodosin', dose: '8 mg OD with meal', note: 'Highest Alpha-1A selectivity' }
            ],
            keySideEffect: 'Retrograde ejaculation, intraoperative floppy iris syndrome (IFIS during cataract surgery), dizziness.',
            contraindication: 'Planned cataract surgery (inform ophthalmologist).'
          },
          {
            className: '5-Alpha Reductase Inhibitors (5-ARIs)',
            mechanism: 'Inhibits 5-alpha reductase enzyme -> blocks Testosterone conversion to active Dihydrotestosterone (DHT) -> shrinks prostate volume by 20-30% over 6 months.',
            drugs: [
              { name: 'Finasteride', dose: '5 mg OD', note: 'Inhibits Type 2 5-AR enzyme' },
              { name: 'Dutasteride', dose: '0.5 mg OD', note: 'Dual inhibitor of Type 1 and Type 2 5-AR enzymes' }
            ],
            keySideEffect: 'Erectile dysfunction, decreased libido, gynecomastia, lowers PSA levels by ~50%.',
            contraindication: 'Pregnancy (Teratogenic - pregnant women must NOT handle crushed tablets).'
          },
          {
            className: 'Phosphodiesterase-5 (PDE-5) Inhibitors (ED & BPH)',
            mechanism: 'Inhibits PDE-5 enzyme -> prevents cGMP degradation -> smooth muscle relaxation in corpus cavernosum & bladder neck.',
            drugs: [
              { name: 'Tadalafil', dose: '5 mg OD (BPH/ED continuous) or 10-20 mg PRN', note: 'Long half-life (~17.5h "The Weekend Pill")' },
              { name: 'Sildenafil', dose: '25 - 100 mg PRN 1 hour before sexual activity', note: 'Onset 30-60 mins; duration ~4 hours' }
            ],
            keySideEffect: 'Headache, facial flushing, dyspepsia, nasal congestion, blue-tinted vision (cyanopsia via PDE-6 inhibition), priapism.',
            contraindication: 'Co-administration with Nitrates or Riociguat (causes severe fatal hypotension).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'BPH Prostate Volume > 40 cc', choice: 'Combination Therapy: Tamsulosin + Dutasteride (CombODART) is superior to monotherapy.' }
    ],
    drugInteractions: [
      'PDE-5 Inhibitors (Sildenafil/Tadalafil) + Nitrates (GTN/Isosorbide): Fatal synergistic cGMP surge -> refractory severe shock.',
      'Non-selective Alpha-1 Blockers (Doxazosin) + PDE-5 Inhibitors: Additive orthostatic hypotension.'
    ],
    monitoringParameters: [
      'Serum PSA baseline and 6 months after starting Finasteride (multiply PSA value by 2 for true reading).',
      'IPSS symptom score & Post-Void Residual (PVR) urine volume.'
    ],
    gpatMindMapTips: [
      'Finasteride inhibits Type 2 5-alpha reductase, lowering prostate DHT levels and reducing serum PSA levels by exactly 50%.',
      'Sildenafil causes blue-tinted visual disturbances (cyanopsia) due to off-target inhibition of PDE-6 in retinal photoreceptors.',
      'Tamsulosin causes Intraoperative Floppy Iris Syndrome (IFIS) during cataract surgery due to iris dilator muscle alpha-1A blockade.'
    ]
  },

  // -------------------------------------------------------------
  // 8. INFECTIOUS DISEASES & ANTIMICROBIAL STEWARDSHIP
  // -------------------------------------------------------------
  {
    id: 'tuberculosis',
    diseaseName: 'Pulmonary & Extrapulmonary Tuberculosis (TB)',
    category: 'Infectious Diseases',
    icdCode: 'A15 / A16',
    pathophysiology: 'Infectious granulomatous disease caused by Mycobacterium tuberculosis, an acid-fast intracellular bacillus, characterized by caseating necrosis and pulmonary cavitation.',
    diagnosticCriteria: [
      'Ziehl-Neelsen (ZN) Acid-Fast Sputum Smear Microscopy',
      'GeneXpert MTB/RIF: Detects M. tuberculosis DNA & Rifampicin resistance in 2h',
      'Chest X-Ray: Apical cavitary infiltrates'
    ],
    lifestyleInterventions: [
      'Infection Control Masks; High-protein diet + Vitamin B6 (Pyridoxine) during Isoniazid'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line 6-Month Regimen (Drug-Susceptible TB)',
        recommendation: '2 Months Intensive (HRZE) + 4 Months Continuation (HRE).',
        drugClasses: [
          {
            className: 'Intensive Phase Drugs (HRZE)',
            mechanism: 'Bactericidal & sterilizing anti-mycobacterial action.',
            drugs: [
              { name: 'Isoniazid (H)', dose: '300 mg OD', note: 'Inhibits mycolic acid cell wall synthesis via InhA' },
              { name: 'Rifampicin (R)', dose: '450 - 600 mg OD', note: 'Inhibits bacterial DNA-dependent RNA polymerase' },
              { name: 'Pyrazinamide (Z)', dose: '1000 - 1500 mg OD', note: 'Sterilizes acidic phagolysosomes' },
              { name: 'Ethambutol (E)', dose: '800 - 1200 mg OD', note: 'Bacteriostatic arabinosyl transferase inhibitor' }
            ],
            keySideEffect: 'H: Peripheral neuropathy (pyridoxine def), hepatotoxicity. R: Red-orange fluids, CYP induction. Z: Hyperuricemia. E: Retrobulbar optic neuritis.',
            contraindication: 'Pre-existing severe acute liver injury.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'TB + HIV Co-infection', choice: 'Start Anti-TB immediately; start ART within 2-8 weeks (Use Efavirenz due to Rifampicin induction).' },
      { condition: 'MDR-TB', choice: 'BPaLM Regimen (Bedaquiline, Pretomanid, Linezolid, Moxifloxacin x 6 months).' }
    ],
    drugInteractions: [
      'Rifampicin + OCPs / Warfarin / Antiretrovirals: Potent CYP3A4 & P-gp induction drastically lowers co-drug levels.'
    ],
    monitoringParameters: [
      'Monthly LFTs; Monthly Visual Acuity & Color Vision (Ishihara) for Ethambutol.'
    ],
    gpatMindMapTips: [
      'Isoniazid peripheral neuropathy is caused by inhibition of Pyridoxal Kinase -> Vitamin B6 deficiency. Prevent with Pyridoxine (10-50mg/day).',
      'Ethambutol causes retrobulbar optic neuritis (red-green color blindness).'
    ]
  },
  {
    id: 'malaria',
    diseaseName: 'Malaria & Parasitic Infections',
    category: 'Infectious Diseases',
    icdCode: 'B50 / B54',
    pathophysiology: 'Plasmodium falciparum protozoal infection causing microvascular cytoadherence, severe anemia, cerebral malaria, and organ failure.',
    diagnosticCriteria: [
      'Giemsa Peripheral Blood Smear: Ring forms & banana-shaped gametocytes',
      'Rapid Diagnostic Test (RDT): Detects P. falciparum HRP-2'
    ],
    lifestyleInterventions: [
      'Insecticide-Treated Nets (ITNs); Travel Chemoprophylaxis (Doxycycline)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Uncomplicated P. falciparum Malaria',
        recommendation: 'Artemisinin-based Combination Therapy (ACT).',
        drugClasses: [
          {
            className: 'Artemisinin-based Combination Therapy (ACT)',
            mechanism: 'Endoperoxide bridge generates toxic free radicals in parasite food vacuole.',
            drugs: [
              { name: 'Artemether + Lumefantrine', dose: '6-dose regimen over 3 days with fatty meal', note: 'Fatty food increases Lumefantrine absorption 16-fold' }
            ],
            keySideEffect: 'Delayed hemolysis, QT prolongation (lumefantrine).',
            contraindication: 'First trimester pregnancy (Use Quinine + Clindamycin).'
          },
          {
            className: 'Relapse Prevention (P. vivax / P. ovale)',
            mechanism: 'Eradicates dormant liver hypnozoites.',
            drugs: [
              { name: 'Primaquine', dose: '0.25 - 0.5 mg/kg daily x 14 days', note: 'MUST test G6PD activity prior to administration' }
            ],
            keySideEffect: 'Severe intravascular hemolysis in G6PD deficiency.',
            contraindication: 'G6PD deficiency, Pregnancy.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Severe / Cerebral Malaria', choice: 'IV Artesunate 2.4 mg/kg at 0, 12, 24h, then daily.' }
    ],
    drugInteractions: [
      'Lumefantrine + QT-prolonging drugs: Risk of Torsades de Pointes.'
    ],
    monitoringParameters: [
      'G6PD Enzyme Activity Assay prior to Primaquine.'
    ],
    gpatMindMapTips: [
      'Primaquine is the ONLY antimalarial active against dormant liver hypnozoites of P. vivax and P. ovale.',
      'Artemisinin active moiety is an internal endoperoxide bridge.'
    ]
  },
  {
    id: 'hiv-aids',
    diseaseName: 'HIV / AIDS & Opportunistic Infections',
    category: 'Infectious Diseases',
    icdCode: 'B20',
    pathophysiology: 'Human Immunodeficiency Virus (HIV-1) retrovirus infects CD4+ T-helper lymphocytes, causing progressive immune system collapse and vulnerability to lethal opportunistic infections (PCP, Cryptococcus, CMV, Kaposi sarcoma) when CD4 count < 200 cells/mm3.',
    diagnosticCriteria: [
      'Screening & Confirmation: 4th Generation HIV Ag/Ab Combination Immunoassay (p24 antigen + HIV-1/2 antibodies) followed by HIV-1/2 Differentiation Immunoassay',
      'Quantitative HIV RNA Viral Load (RT-PCR) & CD4+ T-Lymphocyte Count'
    ],
    lifestyleInterventions: [
      'Strict 100% Antiretroviral Therapy (ART) Medication Adherence (prevents drug resistance mutations)',
      'Pre-Exposure Prophylaxis (PrEP: Tenofovir DF + Emtricitabine OD) for high-risk individuals'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'First-Line Antiretroviral Therapy (ART Single-Pill FDC)',
        recommendation: 'Initiate ART immediately upon diagnosis regardless of CD4 count ("Test and Treat").',
        drugClasses: [
          {
            className: 'Integrase Strand Transfer Inhibitor (INSTI) + 2 NRTIs',
            mechanism: 'Dolutegravir inhibits HIV integrase enzyme, blocking integration of viral DNA into host genome; NRTIs terminate viral reverse transcription.',
            drugs: [
              { name: 'Dolutegravir + Tenofovir AF + Emtricitabine', dose: '1 tablet ONCE DAILY', note: 'Gold-standard first-line WHO regimen (TLD)' },
              { name: 'Bictegravir + Tenofovir AF + Emtricitabine', dose: '1 tablet ONCE DAILY', note: 'High barrier to resistance, minimal side effects' }
            ],
            keySideEffect: 'Weight gain, insomnia, headache, renal impairment & bone density loss (Tenofovir DF form).',
            contraindication: 'Hypersensitivity.'
          }
        ]
      },
      {
        step: 2,
        stage: 'Opportunistic Infection Prophylaxis (CD4 < 200 cells/mm3)',
        recommendation: 'Initiate primary prophylaxis against Pneumocystis jirovecii pneumonia (PCP).',
        drugClasses: [
          {
            className: 'PCP & Toxoplasmosis Prophylaxis',
            mechanism: 'Synergistic folate pathway inhibition in microorganisms.',
            drugs: [
              { name: 'Trimethoprim / Sulfamethoxazole (Cotrimoxazole)', dose: '1 Double Strength (DS) tablet OD', note: 'Mandatory when CD4 < 200 cells/mm3' }
            ],
            keySideEffect: 'Rash, Stevens-Johnson Syndrome, hyperkalemia, neutropenia.',
            contraindication: 'Sulfa allergy, G6PD deficiency.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Post-Exposure Prophylaxis (PEP)', choice: 'Initiate within 72 hours of exposure: Dolutegravir + Tenofovir DF + Emtricitabine x 28 days.' }
    ],
    drugInteractions: [
      'Dolutegravir + Polyvalent Cations (Magnesium/Aluminum Antacids, Calcium/Iron supplements): Chelation reduces Dolutegravir absorption. Separate by 2 hours before or 6 hours after.',
      'Ritonavir / Cobicistat (Boosted Protease Inhibitors) + Statins (Simvastatin): Massive CYP3A4 inhibition causes fatal rhabdomyolysis.'
    ],
    monitoringParameters: [
      'HIV Viral Load at 4-8 weeks post-ART, then every 6 months (Goal: Undetectable viral load < 50 copies/mL).',
      'CD4 count & Serum Creatinine / eGFR.'
    ],
    gpatMindMapTips: [
      'Tenofovir Alafenamide (TAF) delivers active metabolite TFV-DP into lymphoid cells more efficiently with 90% lower plasma levels than Tenofovir Disoproxil Fumarate (TDF), causing far less renal & bone toxicity.',
      'Efavirenz (NNRTI) causes central nervous system side effects (vivid nightmarish dreams, dizziness) and false-positive cannabinoid drug screens.'
    ]
  },
  {
    id: 'sepsis-septic-shock',
    diseaseName: 'Sepsis & Septic Shock',
    category: 'Infectious Diseases',
    icdCode: 'A41',
    pathophysiology: 'Life-threatening organ dysfunction caused by a dysregulated host systemic inflammatory response to infection, progressing to Septic Shock characterized by severe cellular/metabolic abnormalities, profound vasodilation, microvascular thrombosis, and tissue hypoperfusion.',
    diagnosticCriteria: [
      'SOFA Score (Sequential Organ Failure Assessment): Increase by ≥ 2 points from baseline',
      'Quick SOFA (qSOFA): Respiratory rate ≥ 22/min, Altered mentation (GCS < 15), Systolic BP ≤ 100 mmHg',
      'Septic Shock Definition: Persistent hypotension requiring Vasopressors to maintain MAP ≥ 65 mmHg AND Serum Lactate > 2 mmol/L despite adequate fluid resuscitation'
    ],
    lifestyleInterventions: [
      'Immediate Emergency ICU Protocol ("Surviving Sepsis Campaign Hour-1 Bundle")'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Surviving Sepsis Hour-1 Emergency Bundle Protocol',
        recommendation: 'Measure Lactate + Blood Cultures + Broad-Spectrum IV Antibiotics + 30 mL/kg Crystalloid Fluid + Vasopressors.',
        drugClasses: [
          {
            className: 'Empiric Ultra Broad-Spectrum Antibiotics',
            mechanism: 'Immediate bactericidal coverage targeting Gram-negative (Pseudomonas aeruginosa) and Gram-positive (MRSA) pathogens.',
            drugs: [
              { name: 'Piperacillin / Tazobactam (Zosyn)', dose: '4.5 g IV q6h extended infusion over 3-4h', note: 'Antipseudomonal extended-spectrum penicillin' },
              { name: 'Meropenem', dose: '1 g IV q8h', note: 'Carbapenem covering ESBL-producing Gram-negative bacilli' },
              { name: 'Vancomycin', dose: '15 - 20 mg/kg IV q8-12h (Target trough 15-20 mcg/mL)', note: 'Glycopeptide covering MRSA' }
            ],
            keySideEffect: 'Nephrotoxicity (Vancomycin + Zosyn combination synergy), C. difficile infection.',
            contraindication: 'Severe anaphylaxis to beta-lactams.'
          },
          {
            className: 'Vasoactive Inotropic & Vasopressor Therapy',
            mechanism: 'Alpha-1 vasoconstriction increases SVR & MAP; Beta-1 inotropy supports cardiac output.',
            drugs: [
              { name: 'Norepinephrine (Noradrenaline)', dose: '0.02 - 1.0 mcg/kg/min IV central line infusion', note: 'First-line vasopressor of choice for Septic Shock (Target MAP ≥ 65 mmHg)' },
              { name: 'Vasopressin', dose: '0.03 units/min fixed IV infusion', note: 'Second-line adjunct added to Norepinephrine' }
            ],
            keySideEffect: 'Peripheral digital ischemia / gangrene, myocardial ischemia, arrhythmias.',
            contraindication: 'Uncorrected hypovolemia (Must give fluid bolus first!).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Refractory Septic Shock', choice: 'Add IV Hydrocortisone 200mg/day continuous infusion if blood pressure remains unresponsive to fluid & vasopressors.' }
    ],
    drugInteractions: [
      'Vancomycin + Piperacillin/Tazobactam: Synergistic acute kidney injury risk compared to Vancomycin + Cefepime.',
      'Norepinephrine + MAO Inhibitors: Massive exaggerated hypertensive crisis.'
    ],
    monitoringParameters: [
      'Serial Serum Lactate clearance every 2-4 hours (Lactate clearance > 20% indicates improving tissue perfusion).',
      'Mean Arterial Pressure (MAP = DBP + 1/3[SBP-DBP]) target ≥ 65 mmHg & Urine Output ≥ 0.5 mL/kg/hr.'
    ],
    gpatMindMapTips: [
      'Norepinephrine is the FIRST-LINE vasopressor in Septic Shock because its dominant Alpha-1 vasoconstriction raises MAP with less tachycardia than Dopamine.',
      'Vancomycin mechanism: Binds D-alanyl-D-alanine terminus of cell wall peptidoglycan precursor, inhibiting transglycosylation.',
      'Vancomycin Flushing Syndrome ("Red Man Syndrome") is caused by rapid IV infusion triggering non-immunological histamine release (prevent by infusing over ≥ 60 mins).'
    ]
  },

  // -------------------------------------------------------------
  // 9. ONCOLOGY & HEMATOLOGY (CANCER)
  // -------------------------------------------------------------
  {
    id: 'cancer-chemotherapy',
    diseaseName: 'Oncology & Chemotherapy Toxicity Management',
    category: 'Oncology & Hematology',
    icdCode: 'C50 / C34',
    pathophysiology: 'Malignant neoplastic cellular proliferation characterized by uncontrolled mitosis, loss of contact inhibition, evasion of apoptosis, tumor angiogenesis, and metastatic invasion.',
    diagnosticCriteria: [
      'Histopathological Biopsy & Immunohistochemistry (IHC): Confirms malignancy type & grading',
      'Molecular Markers: HER2, EGFR, KRAS, BRAF V600E, PD-L1 expression',
      'TNM Staging System (Tumor size, Node involvement, Metastasis)'
    ],
    lifestyleInterventions: [
      'Neutropenic Diet (Avoid raw / unpasteurized foods during chemotherapy nadir)',
      'Hydration Protocol (2-3 L/day to prevent Cyclophosphamide hemorrhagic cystitis & Tumor Lysis Syndrome)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Cytotoxic Chemotherapy & Antiemetic / Toxicity Support',
        recommendation: 'Cycle-specific antineoplastic regimens + 3-drug CINV antiemetic prophylaxis.',
        drugClasses: [
          {
            className: 'Classic Antineoplastic Cytotoxic Classes',
            mechanism: 'Alkylates DNA, cross-links strands, or inhibits topoisomerase / microtubule dynamics.',
            drugs: [
              { name: 'Cisplatin / Carboplatin', dose: '50 - 100 mg/m2 IV q3-4w', note: 'Platinum alkylating agent; highly emetogenic & nephrotoxic' },
              { name: 'Doxorubicin', dose: '60 mg/m2 IV q3w', note: 'Anthracycline topoisomerase II inhibitor; lifetime cumulative cardiotoxicity limit 550 mg/m2' },
              { name: 'Paclitaxel', dose: '175 mg/m2 IV q3w', note: 'Taxane microtubule stabilizer (prevents depolymerization)' },
              { name: 'Cyclophosphamide', dose: '500 - 1000 mg/m2 IV', note: 'Must co-prescribe MESNA to neutralize toxic Acrolein metabolite' }
            ],
            keySideEffect: 'Cisplatin: Severe nephrotoxicity & ototoxicity. Doxorubicin: Dilated cardiomyopathy. Paclitaxel: Peripheral neuropathy. Cyclophosphamide: Hemorrhagic cystitis.',
            contraindication: 'Severe bone marrow depression (ANC < 1000/mm3, Platelets < 50,000/mm3).'
          },
          {
            className: 'High-Emetogenic Chemotherapy Antiemetic Protocol (CINV)',
            mechanism: 'Dual NK1 receptor + 5-HT3 receptor + Corticosteroid blockade in chemoreceptor trigger zone (CTZ).',
            drugs: [
              { name: 'Ondansetron / Palonosetron', dose: '8 mg IV or 0.25 mg IV stat', note: '5-HT3 receptor antagonist' },
              { name: 'Aprepitant / Fosaprepitant', dose: '125 mg Oral Day 1, then 80 mg Days 2-3', note: 'Neurokinin-1 (NK1) receptor antagonist' },
              { name: 'Dexamethasone', dose: '12 mg IV Day 1, then 8 mg daily', note: 'Synergistic antiemetic steroid' }
            ],
            keySideEffect: 'Constipation, QT prolongation (ondansetron), headache.',
            contraindication: 'Hypersensitivity.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Febrile Neutropenia (ANC < 500 + Temp > 38.3 C)', choice: 'Medical Emergency! Immediate empiric IV Antipseudomonal Beta-lactam (Cefepime / Piperacillin-Tazobactam / Meropenem) within 1 hour.' },
      { condition: 'Tumor Lysis Syndrome Prevention', choice: 'IV Hydration + Rasburicase (Recombinant Urate Oxidase) or High-dose Allopurinol.' }
    ],
    drugInteractions: [
      'Doxorubicin + Trastuzumab (Herceptin): Severe synergistic irreversible cardiotoxicity / heart failure.',
      'Cisplatin + Aminoglycosides / Furosemide: Massive synergistic ototoxicity and acute tubular necrosis.'
    ],
    monitoringParameters: [
      'Complete Blood Count (CBC) with ANC baseline & Day 10-14 nadir check.',
      'Echocardiogram (LVEF baseline & cumulative dose tracking) for Doxorubicin.',
      'Serum Creatinine & Audiogram for Cisplatin; Urine dipstick for blood (Cyclophosphamide).'
    ],
    gpatMindMapTips: [
      'Doxorubicin cardiotoxicity antidote: Dexrazoxane (iron chelator that prevents free radical formation).',
      'Cyclophosphamide causes Hemorrhagic Cystitis due to its toxic urothelial metabolite Acrolein; prevented by MESNA (2-mercaptoethane sulfonate sodium).',
      'Vincristine mechanism: Binds tubulin and inhibits microtubule assembly (spindle poison); causes peripheral neuropathy and is STRICTLY FATAL IF GIVEN INTRATHECALLY (IV only!).',
      'Paclitaxel mechanism: Binds tubulin and STABILIZES microtubules, preventing depolymerization.'
    ]
  },
  {
    id: 'anemia-hematology',
    diseaseName: 'Anemias (Iron Deficiency & Megaloblastic)',
    category: 'Oncology & Hematology',
    icdCode: 'D50 / D51 / D52',
    pathophysiology: 'Iron Deficiency Anemia (IDA): Microcytic hypochromic anemia caused by inadequate iron for hemoglobin synthesis. Megaloblastic Anemia: Macrocytic anemia caused by Vitamin B12 (cobalamin) or Folic Acid deficiency impairing nuclear DNA synthesis.',
    diagnosticCriteria: [
      'Iron Deficiency (Microcytic MCV < 80 fL): Low Serum Ferritin (< 30 mcg/L - most sensitive), Low Transferrin Saturation (< 20%), High TIBC',
      'Vitamin B12 Deficiency (Macrocytic MCV > 100 fL): Low Serum B12 (< 200 pg/mL) + High Methylmalonic Acid (MMA) + High Homocysteine + Pernicious Anemia Anti-Intrinsic Factor Antibodies',
      'Folate Deficiency (Macrocytic MCV > 100 fL): Low Serum Folate (< 3 ng/mL) + High Homocysteine + NORMAL Methylmalonic Acid (MMA)'
    ],
    lifestyleInterventions: [
      'Iron-rich Foods: Red meat, spinach, legumes; Consume Vitamin C (Ascorbic Acid) alongside iron to enhance absorption',
      'Avoid Tea / Coffee with meals (Tannins and Phytates bind non-heme iron and reduce absorption by 60%)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Targeted Replacement Therapy',
        recommendation: 'Oral Ferrous salts for IDA; Parenteral Hydroxocobalamin for B12; Oral Folic Acid for Folate deficiency.',
        drugClasses: [
          {
            className: 'Oral & Parenteral Elemental Iron Preparation',
            mechanism: 'Provides elemental iron for heme ring incorporation in erythrocyte hemoglobin.',
            drugs: [
              { name: 'Ferrous Sulfate', dose: '200 mg (65mg elemental iron) 1-3 times daily on empty stomach', note: 'Gold-standard oral iron. Continue 3-6 months post-Hb normalization to replenish stores' },
              { name: 'Iron Sucrose / Ferric Carboxymaltose', dose: '500 - 1000 mg IV infusion', note: 'Parenteral iron for oral intolerance or severe IBD / CKD blood loss' }
            ],
            keySideEffect: 'Black tarry stools, constipation, epigastric pain, metallic taste, IV anaphylaxis.',
            contraindication: 'Hemochromatosis, hemosiderosis, active peptic ulcer.'
          },
          {
            className: 'Vitamin B12 & Folic Acid Replacement',
            mechanism: 'Essential coenzymes for methionine synthesis, myelin sheath preservation, and thymidylate DNA synthesis.',
            drugs: [
              { name: 'Cyanocobalamin / Hydroxocobalamin (B12)', dose: '1000 mcg IM daily x 1 week, then weekly x 4w, then monthly for life', note: 'Mandatory IM route for Pernicious Anemia (lack of intrinsic factor)' },
              { name: 'Folic Acid (Vitamin B9)', dose: '1 - 5 mg daily oral', note: 'ALWAYS rule out Vitamin B12 deficiency BEFORE giving Folic Acid alone!' }
            ],
            keySideEffect: 'Hypokalemia during initial rapid erythropoiesis surge.',
            contraindication: 'Folic Acid monotherapy in undiagnosed B12 deficiency (corrects anemia but allows subacute combined spinal cord degeneration to progress!).'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Pregnancy Neural Tube Defect Prevention', choice: 'Folic Acid 0.4 mg daily (4 mg daily if high risk / prior neural tube defect) starting 3 months prior to conception.' }
    ],
    drugInteractions: [
      'Oral Iron + Fluoroquinolones / Tetracyclines / Levothyroxine: Chelation binding in stomach; separate administration by at least 2-3 hours.',
      'Oral Iron + PPIs / Antacids: Reduced gastric acid impairs ferric (Fe3+) to ferrous (Fe2+) conversion, decreasing iron absorption.'
    ],
    monitoringParameters: [
      'Reticulocyte Count surge at 7-10 days (first sign of response).',
      'Hemoglobin rise by ~1 g/dL every 2-3 weeks.',
      'Serum Ferritin & Vitamin B12 levels.'
    ],
    gpatMindMapTips: [
      'Ascorbic Acid (Vitamin C) maintains iron in the soluble Ferrous (Fe2+) state, dramatically boosting intestinal absorption.',
      'CRITICAL WARNING: Administering Folic Acid alone in Vitamin B12 deficiency corrects the hematological anemia BUT causes irreversible Subacute Combined Degeneration (SCD) of the spinal cord!',
      'Deferoxamine (Desferrioxamine) is the specific chelating antidote for acute Iron Toxicity / Overdose (turns urine vin-rosé red).'
    ]
  },

  // -------------------------------------------------------------
  // 10. DERMATOLOGY & IMMUNOLOGY
  // -------------------------------------------------------------
  {
    id: 'psoriasis-dermatitis',
    diseaseName: 'Psoriasis & Atopic Dermatitis',
    category: 'Dermatology & Immunology',
    icdCode: 'L40 / L20',
    pathophysiology: 'Psoriasis: Autoimmune T-cell mediated hyperproliferation of epidermal keratinocytes driven by IL-23/IL-17 cytokine axis, producing silvery scaly erythematous plaques. Atopic Dermatitis: Type I hypersensitivity allergic skin breakdown associated with Filaggrin (FLG) gene mutations.',
    diagnosticCriteria: [
      'Clinical Psoriasis Auspitz Sign: Pinpoint bleeding points upon scraping silvery psoriatic scales',
      'PASI Score (Psoriasis Area and Severity Index)',
      'Elevated Serum IgE & Eosinophilia in Atopic Dermatitis'
    ],
    lifestyleInterventions: [
      'Emollient Moisturizers: Apply within 3 minutes post-bathing to lock in skin barrier moisture',
      'Phototherapy (Narrowband UVB 311nm light therapy)'
    ],
    treatmentAlgorithm: [
      {
        step: 1,
        stage: 'Topical & Systemic Biologic Escalation Therapy',
        recommendation: 'Topical Corticosteroid + Vitamin D3 analog for mild disease; Biologics for moderate-to-severe.',
        drugClasses: [
          {
            className: 'Topical Corticosteroids & Vitamin D3 Analogs',
            mechanism: 'Suppresses inflammatory gene transcription; Calcipotriol inhibits keratinocyte proliferation.',
            drugs: [
              { name: 'Clobetasol Propionate 0.05%', dose: 'Apply BD to plaques (max 2-4 consecutive weeks)', note: 'Super-high potency topical steroid' },
              { name: 'Calcipotriol (Calcipotriene)', dose: 'Apply BD to plaques', note: 'Synthetic Vitamin D3 analog' }
            ],
            keySideEffect: 'Skin atrophy (thinning), striae, telangiectasia, systemic HPA axis suppression if overused.',
            contraindication: 'Viral / fungal skin infections (Herpes, Tinea).'
          },
          {
            className: 'Targeted Interleukin Biologics (Moderate-to-Severe Psoriasis)',
            mechanism: 'Monoclonal antibodies neutralizing IL-17A or IL-23 cytokines.',
            drugs: [
              { name: 'Secukinumab', dose: '300 mg SC at weeks 0, 1, 2, 3, 4, then monthly', note: 'Anti-IL-17A human monoclonal antibody; near-complete skin clearance (PASI 90/100)' },
              { name: 'Ustekinumab', dose: '45 mg SC at weeks 0, 4, then q12w', note: 'Anti-IL-12/23 p40 subunit mAb' },
              { name: 'Dupilumab (Atopic Dermatitis)', dose: '600 mg SC loading, then 300 mg q2w', note: 'Anti-IL-4R-alpha mAb for severe Eczema' }
            ],
            keySideEffect: 'Upper respiratory infections, Candida fungal infections (Secukinumab), conjunctivitis (Dupilumab).',
            contraindication: 'Active severe infection or active Tuberculosis.'
          }
        ]
      }
    ],
    specialPopulations: [
      { condition: 'Severe Refractory Psoriasis (Non-Biologic)', choice: 'Oral Acitretin (Retinoid) or Cyclosporine or Methotrexate.' }
    ],
    drugInteractions: [
      'Acitretin + Alcohol: Alcohol converts Acitretin into Etretinate, which has an extremely long half-life (~168 days). Strict pregnancy avoidance required for 3 YEARS after stopping Acitretin!'
    ],
    monitoringParameters: [
      'PASI / EASI symptom scores.',
      'Pregnancy testing & LFTs / Lipid panel for oral Acitretin.'
    ],
    gpatMindMapTips: [
      'Acitretin is a 2nd generation oral retinoid that is strictly teratogenic; female patients must NOT become pregnant for 3 YEARS after stopping treatment due to micro-formation of Etretinate with alcohol.',
      'Calcipotriol (Calcipotriene) is a synthetic analog of 1,25-dihydroxyvitamin D3 used topically in psoriasis to inhibit keratinocyte differentiation without hypercalcemia.'
    ]
  }
];

// GET /api/disease-maps - Get all disease maps
router.get('/', (req, res) => {
  res.json(DISEASE_MAPS_DATABASE);
});

// GET /api/disease-maps/:id - Get specific disease map details
router.get('/:id', (req, res) => {
  const mapItem = DISEASE_MAPS_DATABASE.find(d => d.id === req.params.id);
  if (!mapItem) {
    return res.status(404).json({ error: 'Disease learning map not found.' });
  }
  res.json(mapItem);
});

module.exports = router;
