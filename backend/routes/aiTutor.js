const express = require('express');
const router = express.Router();

// Extensive Knowledge Base & Concept Repository for B.Pharm, Pharm.D & GPAT
const knowledgeTopics = [
  // PHARMACOLOGY DRUGS & CONCEPTS
  {
    keywords: ['nsaid', 'nsaids', 'aspirin', 'ibuprofen', 'cox', 'cyclooxygenase', 'diclofenac', 'paracetamol', 'naproxen', 'celecoxib'],
    topic: 'Pharmacology - NSAIDs & Non-Opioid Analgesics',
    category: 'Pharmacology',
    response: `**Non-Steroidal Anti-Inflammatory Drugs (NSAIDs)** work by inhibiting **Cyclooxygenase (COX-1 & COX-2)** enzymes, preventing Arachidonic Acid conversion into Prostaglandins (PGE2, PGI2) and Thromboxane A2 (TXA2).

### 1. Classification & Selectivity:
- **Irreversible Non-Selective COX Inhibitor:** Aspirin (acetylates serine-530 of COX-1).
- **Non-Selective COX Inhibitors:** Ibuprofen, Naproxen, Diclofenac, Indomethacin, Piroxicam.
- **Preferential COX-2 Inhibitors:** Nimesulide, Meloxicam, Nabumetone.
- **Selective COX-2 Inhibitors:** Celecoxib, Etoricoxib, Parecoxib (*reduced GI ulceration, but risk of thrombotic CV events*).
- **Analgesic-Antipyretic with Poor Anti-Inflammatory Activity:** Paracetamol (Acetaminophen) — acts on central COX-3/peroxidase enzymes.

### 2. Mechanism & Pharmacokinetics:
- Inhibits PGE2 (which normally sensitizes nociceptors to pain and raises hypothalamic set-point in fever).
- Inhibits TXA2 in platelets (Aspirin at low doses 75-150 mg produces antiplatelet effect for platelet lifespan ~8-11 days).

### 3. GPAT & Clinical High-Yield Notes:
- ⚠️ **Aspirin Toxicity:** Causes Salicylism, Tinnitus, Metabolic Acidosis + Respiratory Alkalosis. Antidote: **Sodium Bicarbonate** (alkalinizes urine to promote ion trapping & renal clearance).
- ⚠️ **Paracetamol Overdose:** Depletes hepatic glutathione $\\rightarrow$ toxic metabolite **NAPQI** causes hepatic necrosis. Antidote: **N-Acetylcysteine (NAC)** IV/oral within 8-12 hours.`
  },
  {
    keywords: ['digoxin', 'cardiac glycoside', 'heart failure', 'foxglove', 'sodium potassium pump', 'na/k atpase', 'digitoxin'],
    topic: 'Pharmacology - Cardiac Glycosides (Digoxin)',
    category: 'Pharmacology',
    response: `**Digoxin** is a cardiac glycoside isolated from *Digitalis lanata* (Foxglove) used in heart failure and atrial fibrillation.

### 1. Mechanism of Action:
- Inhibits membrane-bound **$\\text{Na}^+/\\text{K}^+$-ATPase pump** in cardiomyocytes.
- Increases intracellular $\\text{Na}^+ \\rightarrow$ decreases $\\text{Na}^+/\\text{Ca}^{2+}$ exchanger activity $\\rightarrow$ increases intracellular $\\text{Ca}^{2+}$.
- Result: **Positive Inotropic Effect** (increased force of contraction) + **Negative Chronotropic Effect** (decreased heart rate via vagal stimulation).

### 2. Clinical & GPAT Points:
- **Narrow Therapeutic Index:** 0.5 - 2.0 ng/mL. Toxicity occurs above 2 ng/mL.
- **Toxicity Symptoms:** Anorexia, Nausea, Xanthopsia (yellow-green vision halo), Bigeminy, AV block.
- **Hypokalemia** potentiates Digoxin toxicity because $K^+$ competes with Digoxin for binding site on $\\text{Na}^+/\\text{K}^+$-ATPase.
- **Antidote for Severe Toxicity:** **Digoxin Immune Fab (Digibind)** antibodies.`
  },
  {
    keywords: ['penicillin', 'beta lactam', 'beta-lactam', 'cephalosporin', 'amoxicillin', 'ampicillin', 'clavulanic acid', 'cell wall'],
    topic: 'Pharmacology & Med Chem - Beta-Lactam Antibiotics',
    category: 'Pharmacology',
    response: `**Beta-Lactam Antibiotics** (Penicillins, Cephalosporins, Carbapenems, Monobactams) contain a four-membered **$\\beta$-lactam ring** essential for antibacterial activity.

### 1. Mechanism of Action:
- Binds to **Penicillin-Binding Proteins (PBPs)** (transpeptidases).
- Inhibits the final **cross-linking step of peptidoglycan synthesis** in bacterial cell walls $\\rightarrow$ osmotic lysis (Bactericidal action).

### 2. Classification & Spectrum:
- **Natural Penicillins:** Penicillin G (IV), Penicillin V (Oral).
- **Penicillinase-Resistant:** Oxacillin, Cloxacillin, Methicillin.
- **Extended Spectrum:** Ampicillin, Amoxicillin (Aminopenicillins).
- **Antipseudomonal:** Piperacillin, Ticarcillin.
- **$\\beta$-Lactamase Inhibitors:** Clavulanic Acid, Sulbactam, Tazobactam (Suicide inhibitors with a $\\beta$-lactam ring).

### 3. Structure-Activity Relationship (SAR):
- The 6-aminopenicillanic acid (6-APA) nucleus is essential.
- Acylation of the amino group at C-6 determines spectrum & resistance to gastric acid/enzymes.`
  },
  {
    keywords: ['opioid', 'morphine', 'codeine', 'fentanyl', 'methadone', 'naloxone', 'mu receptor', 'analgesic'],
    topic: 'Pharmacology - Opioid Analgesics & Antagonists',
    category: 'Pharmacology',
    response: `**Opioid Analgesics** act on G-protein coupled opioid receptors ($\\mu$, $\\kappa$, $\\delta$) in the central nervous system.

### 1. Receptor Types & Effects:
- **$\\mu$ (Mu) Receptor:** Analgesia, Respiratory depression, Euphoria, Sedation, Miosis (pinpoint pupils), Constipation, Dependence.
- **$\\kappa$ (Kappa) Receptor:** Spinal analgesia, Dysphoria, Sedation, Psychotomimetic effects.
- **$\\delta$ (Delta) Receptor:** Analgesia, Immunomodulation.

### 2. Key Opioid Agents:
- **Natural Alkaloids:** Morphine, Codeine (from *Papaver somniferum*).
- **Semi-Synthetic:** Heroin, Oxycodone, Hydrocodone.
- **Synthetic:** Fentanyl (100x more potent than morphine), Methadone (long half-life, used in opioid withdrawal detox), Tramadol.

### 3. Opioid Antagonists (GPAT High-Yield):
- **Naloxone:** Pure competitive opioid antagonist (Short $t_{1/2} \\approx 30-90$ mins). Used in acute opioid overdose triad (Coma, Pinpoint pupils, Respiratory depression).
- **Naltrexone:** Long-acting oral antagonist used in opioid & alcohol dependence maintenance.`
  },
  {
    keywords: ['insulin', 'diabetes', 'metformin', 'sulfonylurea', 'glimepiride', 'hba1c', 'sglt2', 'glp-1', 'diabetic'],
    topic: 'Pharmacology - Antidiabetic Drugs & Insulin',
    category: 'Pharmacology',
    response: `**Antidiabetic Agents** treat Type 1 and Type 2 Diabetes Mellitus to lower blood glucose and prevent micro/macrovascular complications.

### 1. Classification & Mechanisms:
- **Biguanides (First-line for T2DM):** **Metformin** — Activates AMP-activated protein kinase (AMPK) $\\rightarrow$ decreases hepatic gluconeogenesis, increases peripheral insulin sensitivity. Does NOT cause hypoglycemia. Side effect: Lactic acidosis.
- **Sulfonylureas:** Glimepiride, Gliclazide, Glibenclamide — Block ATP-sensitive $K^+$ channels in pancreatic $\\beta$-cells $\\rightarrow$ depolarization $\\rightarrow$ $\\text{Ca}^{2+}$ influx $\\rightarrow$ insulin secretion.
- **DPP-4 Inhibitors:** Sitagliptin, Vildagliptin — Prevent degradation of endogenous GLP-1/GIP.
- **SGLT-2 Inhibitors:** Empagliflozin, Dapagliflozin — Block glucose reabsorption in proximal renal tubules $\\rightarrow$ glucosuria.
- **GLP-1 Receptor Agonists:** Semaglutide, Liraglutide — Increase glucose-dependent insulin secretion, slow gastric emptying.

### 2. Insulin Preparations:
- **Rapid-Acting:** Lispro, Aspart, Glulisine.
- **Short-Acting:** Regular Insulin (only one given IV in Diabetic Ketoacidosis).
- **Intermediate-Acting:** NPH (Isophane Insulin).
- **Long-Acting:** Glargine, Detemir, Degludec.`
  },
  {
    keywords: ['bcs', 'biopharmaceutics', 'solubility', 'permeability', 'classification', 'dissolution', 'noyes whitney'],
    topic: 'Pharmaceutics - BCS System & Dissolution Kinetics',
    category: 'Pharmaceutics',
    response: `**Biopharmaceutics Classification System (BCS)** categorizes drug substances based on aqueous solubility and intestinal permeability:

| Class | Solubility | Permeability | Rate-Limiting Step | Representative Examples |
|-------|------------|--------------|---------------------|--------------------------|
| **Class I** | High | High | Gastric Emptying | Metoprolol, Paracetamol, Propranolol |
| **Class II** | Low | High | Dissolution Rate | Nifedipine, Glibenclamide, Carbamazepine |
| **Class III** | High | Low | Permeation Rate | Atenolol, Cimetidine, Metformin |
| **Class IV** | Low | Low | Overall Bioavailability | Hydrochlorothiazide, Furosemide, Paclitaxel |

### GPAT Formula Tip:
**Noyes-Whitney Equation for Dissolution Rate:**
$$\\frac{dC}{dt} = \\frac{D \\cdot A \\cdot (C_s - C)}{h}$$
- $D$ = Diffusion coefficient, $A$ = Surface area, $C_s$ = Saturation solubility, $h$ = Diffusion layer thickness.`
  },
  {
    keywords: ['emulsion', 'suspension', 'rheology', 'thixotropy', 'surfactant', 'hlb', 'stokes law', 'creaming', 'flocculation'],
    topic: 'Pharmaceutics - Suspensions, Emulsions & Physical Pharmacy',
    category: 'Pharmaceutics',
    response: `**Coarse Dispersions (Suspensions & Emulsions)** are biphasic pharmaceutical liquid dosage forms.

### 1. Suspensions & Stokes' Law:
Sedimentation velocity ($v$) is governed by **Stokes' Law**:
$$v = \\frac{2 r^2 (\\rho_s - \rho_o) g}{9 \\eta}$$
- To reduce sedimentation: Reduce particle size ($r$), increase vehicle viscosity ($\\eta$), or decrease density difference $(\\rho_s - \\rho_o)$.
- **Flocculated Suspensions:** Clear supernatant, rapid sedimentation, loose flocs, **easily redispersible**, no caking.
- **Deflocculated Suspensions:** Turbid supernatant, slow sedimentation, tight packing $\\rightarrow$ **hard cake formation**.

### 2. Emulsion Instabilities:
- **Creaming:** Reversible upward or downward movement of droplets.
- **Flocculation:** Reversible aggregation of droplets without loss of individual identity.
- **Coalescence / Cracking:** Irreversible merging of droplets into a continuous phase (Destruction of emulsion).
- **Phase Inversion:** Change from O/W to W/O or vice versa.`
  },
  {
    keywords: ['hplc', 'chromatography', 'uv-vis', 'beer lambert', 'spectrophotometry', 'nmr', 'infrared', 'ir', 'mass spec'],
    topic: 'Pharmaceutical Analysis - Instrumental Methods & Spectroscopy',
    category: 'Medicinal Chemistry',
    response: `**Instrumental Pharmaceutical Analysis** quantifies and identifies drug substances.

### 1. Spectroscopy Summary:
- **UV-Visible Spectroscopy:** Based on electronic transitions ($\\pi \\rightarrow \\pi^*$, $n \\rightarrow \\pi^*$). Governed by **Beer-Lambert Law**:
  $$A = \\epsilon \\cdot c \\cdot l$$
- **IR Spectroscopy:** Based on molecular vibrations (stretching & bending). **Fingerprint Region:** $1450 - 600 \\text{ cm}^{-1}$. (Carbonyl group $C=O$ peak $\\approx 1700 \\text{ cm}^{-1}$).
- **NMR Spectroscopy:** Based on nuclear spin transitions in a magnetic field. Uses chemical shift ($\\delta$ ppm) relative to **Tetramethylsilane (TMS)**.

### 2. High-Performance Liquid Chromatography (HPLC):
- **Reverse-Phase HPLC (RP-HPLC):** Stationary phase is **non-polar** ($C_{18}$ / Octadecylsilane), Mobile phase is **polar** (Water/Methanol/Acetonitrile). Non-polar compounds elute last!`
  },
  {
    keywords: ['schedule m', 'schedule h', 'schedule x', 'schedule c', 'd&c act', 'jurisprudence', 'pharmacy act', 'gmp', 'dcur'],
    topic: 'Pharmaceutical Jurisprudence - Drug Schedules & Regulations',
    category: 'GPAT Tips',
    response: `**Drugs & Cosmetics Act 1940 & Rules 1945** regulates manufacture, sale, and distribution of drugs in India.

### Key Official Schedules (GPAT High-Yield):
- 🏢 **Schedule M:** Good Manufacturing Practices (GMP) and factory premises requirements.
- 💊 **Schedule H:** Prescription drugs to be sold only on prescription of a Registered Medical Practitioner (RMP).
- 🚫 **Schedule X:** Psychotropic & Narcotic drugs requiring duplicate prescription copies & 2-year record retention.
- 🔬 **Schedule C & C1:** Biological and special products (Vaccines, Sera, Insulin, Antibiotics).
- 📋 **Schedule Y:** Requirements and guidelines for clinical trials and new drug approval.
- 🧪 **Schedule V:** Standards for patent or proprietary medicines.
- 🏷️ **Schedule G:** Drugs to be taken under medical supervision (e.g., Metformin, Glibenclamide).`
  }
];

// Helper: Intelligent Dynamic Answer Builder for unlisted queries
function buildSmartDynamicAnswer(question, category, difficulty) {
  const qClean = question.trim();
  const qLower = qClean.toLowerCase();

  // Domain Classifier
  let inferredCategory = category && category !== 'All' ? category : 'Pharmacology & Pharmaceutics';
  if (qLower.includes('structure') || qLower.includes('sar') || qLower.includes('iupac') || qLower.includes('synthesis') || qLower.includes('reaction') || qLower.includes('reagent')) {
    inferredCategory = 'Medicinal Chemistry';
  } else if (qLower.includes('formulation') || qLower.includes('tablet') || qLower.includes('capsule') || qLower.includes('emulsion') || qLower.includes('bcs') || qLower.includes('kinetics') || qLower.includes('dose')) {
    inferredCategory = 'Pharmaceutics';
  } else if (qLower.includes('plant') || qLower.includes('extract') || qLower.includes('alkaloid') || qLower.includes('glycoside') || qLower.includes('biological source')) {
    inferredCategory = 'Pharmacognosy';
  } else if (qLower.includes('schedule') || qLower.includes('act') || qLower.includes('law') || qLower.includes('gmp') || qLower.includes('rule')) {
    inferredCategory = 'Jurisprudence';
  }

  return {
    topic: `${inferredCategory} - ${qClean}`,
    category: inferredCategory,
    answer: `## Academic & GPAT Analysis: **"${qClean}"**

### 1. 📖 Core Definition & Scientific Concept
In Pharmaceutical Sciences and the B.Pharm/Pharm.D curriculum, **${qClean}** represents a key concept within **${inferredCategory}**.

- **Primary Focus:** Understanding the underlying molecular mechanisms, physicochemical parameters, and clinical/formulation significance.
- **Target Knowledge Level:** Prepared for ${difficulty || 'GPAT Focus'} examination depth.

---

### 2. 🔬 Key Mechanism / Scientific Principles
When evaluating **${qClean}**, consider the following core principles:

1. **Structure-Activity & ADME Profile:** Chemical substitutions directly influence lipophilicity ($\\log P$), plasma protein binding, CYP450 metabolism, and elimination half-life ($t_{1/2}$).
2. **Physicochemical Properties:** Aqueous solubility, ionization constant ($pK_a$), molecular weight, and crystal polymorphism dictate formulation behavior and bioavailability.
3. **Receptor / Pharmacodynamic Kinetics:** Target selectivity, intrinsic activity (affinity vs efficacy), and signal transduction pathways.

---

### 3. 🎯 GPAT & NIPER Exam High-Yield Flashcard Tips
- **Flash Note 1:** Always correlate the chemical nucleus/functional groups with official analytical test methods (e.g. UV $\\lambda_{max}$, IR absorption peaks, or specific colorimetric reagents).
- **Flash Note 2:** Memorize key rate-limiting steps, standard unit conversions, and regulatory guidelines under the Drugs & Cosmetics Act.
- **Flash Note 3:** Practice solving previous year GPAT MCQs related to **${qClean}** to build speed and accuracy.

---

*💡 Need more specifics? Try asking: "Explain mechanism of action of ${qClean}", "What is the SAR of ${qClean}?", or switch to **GPAT MCQ Quiz** or **Calculations** mode!*`
  };
}

// Helper: Call Google Gemini AI REST API
async function getGeminiAiResponse(question, category, difficulty, userApiKey) {
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return null; // Fallback to local knowledge engine if key is not configured
  }

  const promptText = `You are PharmaVerse AI, an expert Clinical Pharmacology Professor, B.Pharm/Pharm.D Educator, and GPAT Exam Mentor.
Answer the following B.Pharmacy / GPAT question with utmost academic precision and formatting in Markdown:

Question: "${question}"
Focus Area: ${category || 'General B.Pharm & Clinical Sciences'}
Target Academic Level: ${difficulty || 'B.Pharm Undergraduate'}

Structure your response into clear Markdown sections:
### 1. 📖 Core Definition & Scientific Concept
### 2. 🔬 Mechanism of Action / SAR / Formulation / Equations (with equations in LaTeX if needed)
### 3. 🎯 High-Yield GPAT & NIPER Exam Tips (Key points, flashcards, antidotes, or rate-limiting steps)
### 4. 💊 Clinical Relevance & PCI Syllabus Takeaways

Keep the tone encouraging, highly educational, structured, and easy to study.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API Error (${response.status}): ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!answerText) {
    throw new Error('Gemini API returned an empty response.');
  }

  return {
    source: 'Google Gemini 1.5 Flash AI',
    topic: `Gemini AI: ${question}`,
    category: category || 'Pharmacology',
    answer: answerText,
    relatedTopics: [
      `Gemini High-Yield Study Notes on ${question}`,
      'Pharmacology Drug Classification',
      'GPAT Exam MCQs & Solutions'
    ]
  };
}

// POST /api/ai-tutor/ask
router.post('/ask', async (req, res) => {
  try {
    const { question, category, difficulty, apiKey } = req.body;
    if (!question || question.trim() === '') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // 1. Try Google Gemini AI first if key exists
    try {
      const geminiResult = await getGeminiAiResponse(question, category, difficulty, apiKey);
      if (geminiResult) {
        return res.json({
          success: true,
          ...geminiResult
        });
      }
    } catch (geminiErr) {
      console.warn('Google Gemini API call failed, falling back to built-in knowledge base:', geminiErr.message);
    }

    // 2. Fallback: Find best match in built-in knowledge base
    const queryLower = question.toLowerCase().trim();
    const match = knowledgeTopics.find(item => 
      item.keywords.some(keyword => queryLower.includes(keyword))
    );

    if (match) {
      return res.json({
        success: true,
        source: 'PharmaVerse Knowledge Engine',
        topic: match.topic,
        category: match.category,
        answer: match.response,
        relatedTopics: [
          'Mechanism of action & Receptor kinetics',
          'GPAT previous year questions on this topic',
          'Clinical dosage, SAR and contraindications'
        ]
      });
    }

    // 3. Fallback: Dynamic smart answer generator
    const generated = buildSmartDynamicAnswer(question, category, difficulty);

    res.json({
      success: true,
      source: 'PharmaVerse Knowledge Engine',
      topic: generated.topic,
      category: generated.category,
      answer: generated.answer,
      relatedTopics: [
        `GPAT High-Yield Notes on ${question}`,
        'Pharmacology Drug Classification',
        'Physical Pharmaceutics Formulations'
      ]
    });
  } catch (err) {
    console.error('AI Tutor error:', err);
    res.status(500).json({ error: 'Server error processing AI question' });
  }
});

// GET /api/ai-tutor/quiz
router.get('/quiz', (req, res) => {
  try {
    const { category } = req.query;
    let questions = [
      {
        id: 1,
        category: 'Pharmacology',
        question: 'Which enzyme is irreversibly inhibited by Aspirin via covalent acetylation of serine-530 residue?',
        options: ['Cyclooxygenase (COX-1/COX-2)', 'Lipoxygenase (LOX)', 'Phospholipase A2', 'Thromboxane Synthase'],
        correctIndex: 0,
        explanation: 'Aspirin binds irreversibly to Cyclooxygenase (COX-1/COX-2) by transfer of acetyl group to Serine-530 residue.'
      },
      {
        id: 2,
        category: 'Pharmaceutics',
        question: 'According to the BCS classification, a drug with Low Solubility and High Permeability belongs to:',
        options: ['Class I', 'Class II', 'Class III', 'Class IV'],
        correctIndex: 1,
        explanation: 'Class II drugs have low aqueous solubility but high membrane permeability (e.g., Nifedipine, Glibenclamide, Carbamazepine).'
      },
      {
        id: 3,
        category: 'Medicinal Chemistry',
        question: 'Mayer\'s reagent used for alkaloid identification yields which characteristic colored precipitate?',
        options: ['Reddish-brown', 'Yellow', 'Cream / Off-white', 'Blue-green'],
        correctIndex: 2,
        explanation: 'Mayer\'s reagent (Potassium Mercuric Iodide) yields a cream/off-white precipitate with basic alkaloids.'
      },
      {
        id: 4,
        category: 'Pharmacology',
        question: 'Which of the following is an ultra-short acting Beta-1 selective adrenergic blocker ($t_{1/2} \\approx 9$ mins)?',
        options: ['Atenolol', 'Propranolol', 'Esmolol', 'Labetalol'],
        correctIndex: 2,
        explanation: 'Esmolol has an ultra-short half-life of ~9 minutes due to rapid hydrolysis by red blood cell esterases.'
      },
      {
        id: 5,
        category: 'Pharmaceutics',
        question: 'According to Young\'s rule, what is the formula for calculating child dosage for a 6-year-old child?',
        options: ['[Age / (Age + 12)] * Adult Dose', '[Weight in lbs / 150] * Adult Dose', '[Age in Months / 150] * Adult Dose', '[Age / 20] * Adult Dose'],
        correctIndex: 0,
        explanation: 'Young\'s rule is used for children aged 1-12 years: Child Dose = [Age / (Age + 12)] * Adult Dose.'
      },
      {
        id: 6,
        category: 'Jurisprudence',
        question: 'Good Manufacturing Practices (GMP) and requirements of factory premises for drugs are prescribed under:',
        options: ['Schedule H', 'Schedule M', 'Schedule X', 'Schedule C'],
        correctIndex: 1,
        explanation: 'Schedule M of Drugs & Cosmetics Act 1940 prescribes Good Manufacturing Practices (GMP) and factory premises layout.'
      }
    ];

    if (category && category !== 'All') {
      const filtered = questions.filter(q => q.category === category);
      if (filtered.length > 0) questions = filtered;
    }

    res.json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

// GET /api/ai-tutor/mnemonics
router.get('/mnemonics', (req, res) => {
  try {
    const mnemonicsLibrary = [
      {
        title: 'Alkaloid Reagents Test Colors',
        category: 'Medicinal Chemistry',
        mnemonic: 'Mayer Is Creamy, Dragendorff Is Orange-Red, Wagner Is Red-Brown, Hager Is Yellow!',
        explanation: 'Mayer (Cream), Dragendorff (Orange-Red), Wagner (Reddish-Brown), Hager (Yellow Picrate).'
      },
      {
        title: 'Essential Amino Acids',
        category: 'Pharmacology',
        mnemonic: 'PVT TIM HALL',
        explanation: 'Phenylalanine, Valine, Threonine, Tryptophan, Isoleucine, Methionine, Histidine, Arginine, Leucine, Lysine.'
      },
      {
        title: 'Cardioselective Beta Blockers (Beta-1)',
        category: 'Pharmacology',
        mnemonic: 'MANBATE',
        explanation: 'Metoprolol, Atenolol, Nebivolol, Bisoprolol, Acebutolol, Timolol (cardioselective forms), Esmolol.'
      },
      {
        title: 'Drug Schedules (D&C Act Rules)',
        category: 'Jurisprudence',
        mnemonic: 'Schedule H = Prescription, Schedule X = Narcotics, Schedule M = GMP, Schedule C = Biologicals.',
        explanation: 'Quick memory rules for official Indian D&C Act Schedules.'
      }
    ];
    res.json({ success: true, mnemonics: mnemonicsLibrary });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mnemonics' });
  }
});

// POST /api/ai-tutor/calculate
router.post('/calculate', (req, res) => {
  try {
    const { type, age, adultDose, weightLbs, ageMonths, highConc, lowConc, targetConc, weightA, hlbA, weightB, hlbB, ethanolVv } = req.body;
    let result = {};

    if (type === 'youngsRule') {
      const a = parseFloat(age) || 0;
      const d = parseFloat(adultDose) || 0;
      const childDose = (a / (a + 12)) * d;
      result = {
        title: "Young's Rule Pediatric Calculation",
        formula: "Child Dose = [Age (yrs) / (Age + 12)] * Adult Dose",
        calculation: `[${a} / (${a} + 12)] * ${d} mg`,
        resultValue: childDose.toFixed(2),
        unit: 'mg',
        summary: `For a ${a}-year-old child with an adult dose of ${d} mg, the calculated pediatric dose is ${childDose.toFixed(2)} mg.`
      };
    } else if (type === 'clarksRule') {
      const w = parseFloat(weightLbs) || 0;
      const d = parseFloat(adultDose) || 0;
      const childDose = (w / 150) * d;
      result = {
        title: "Clark's Rule Weight-Based Calculation",
        formula: "Child Dose = [Weight in lbs / 150] * Adult Dose",
        calculation: `[${w} lbs / 150] * ${d} mg`,
        resultValue: childDose.toFixed(2),
        unit: 'mg',
        summary: `For a child weighing ${w} lbs with an adult dose of ${d} mg, the calculated pediatric dose is ${childDose.toFixed(2)} mg.`
      };
    } else if (type === 'friedsRule') {
      const m = parseFloat(ageMonths) || 0;
      const d = parseFloat(adultDose) || 0;
      const infantDose = (m / 150) * d;
      result = {
        title: "Fried's Rule Infant Calculation (< 1 year)",
        formula: "Infant Dose = [Age in Months / 150] * Adult Dose",
        calculation: `[${m} months / 150] * ${d} mg`,
        resultValue: infantDose.toFixed(2),
        unit: 'mg',
        summary: `For a ${m}-month-old infant with an adult dose of ${d} mg, the calculated infant dose is ${infantDose.toFixed(2)} mg.`
      };
    } else if (type === 'dillingsRule') {
      const a = parseFloat(age) || 0;
      const d = parseFloat(adultDose) || 0;
      const childDose = (a / 20) * d;
      result = {
        title: "Dilling's Rule Calculation (4-20 years)",
        formula: "Child Dose = [Age (yrs) / 20] * Adult Dose",
        calculation: `[${a} / 20] * ${d} mg`,
        resultValue: childDose.toFixed(2),
        unit: 'mg',
        summary: `For a ${a}-year-old with an adult dose of ${d} mg, the calculated dose according to Dilling's Rule is ${childDose.toFixed(2)} mg.`
      };
    } else if (type === 'alligation') {
      const H = parseFloat(highConc) || 0;
      const L = parseFloat(lowConc) || 0;
      const D = parseFloat(targetConc) || 0;

      if (D <= L || D >= H) {
        return res.status(400).json({ error: 'Target concentration must be strictly between High and Low concentrations.' });
      }

      const partsHigh = D - L;
      const partsLow = H - D;
      const totalParts = partsHigh + partsLow;
      const highPercent = ((partsHigh / totalParts) * 100).toFixed(1);
      const lowPercent = ((partsLow / totalParts) * 100).toFixed(1);

      result = {
        title: "Alligation Alternate Solution Proportions",
        formula: "Parts of High Conc = Target - Low Conc | Parts of Low Conc = High Conc - Target",
        calculation: `High Parts: ${D} - ${L} = ${partsHigh} parts | Low Parts: ${H} - ${D} = ${partsLow} parts`,
        resultValue: `${partsHigh} : ${partsLow}`,
        unit: 'Ratio (High : Low Parts)',
        highParts: partsHigh,
        lowParts: partsLow,
        totalParts: totalParts,
        highPercent,
        lowPercent,
        summary: `Mix ${partsHigh} parts of ${H}% solution with ${partsLow} parts of ${L}% solution (Total: ${totalParts} parts) to obtain a ${D}% solution (${highPercent}% of High, ${lowPercent}% of Low).`
      };
    } else if (type === 'hlbValue') {
      const wA = parseFloat(weightA) || 0;
      const hA = parseFloat(hlbA) || 0;
      const wB = parseFloat(weightB) || 0;
      const hB = parseFloat(hlbB) || 0;
      const totalW = wA + wB;
      const hlbBlend = totalW > 0 ? ((wA * hA) + (wB * hB)) / totalW : 0;

      result = {
        title: "HLB Value of Surfactant Blend",
        formula: "HLB Blend = [(Weight A * HLB A) + (Weight B * HLB B)] / Total Weight",
        calculation: `[(${wA}g * ${hA}) + (${wB}g * ${hB})] / ${totalW}g`,
        resultValue: hlbBlend.toFixed(2),
        unit: 'HLB Units',
        summary: `The resulting HLB value of the surfactant blend is ${hlbBlend.toFixed(2)} (${hlbBlend < 9 ? 'W/O Emulsifier' : 'O/W Emulsifier'}).`
      };
    } else if (type === 'proofSpirit') {
      const v = parseFloat(ethanolVv) || 0;
      const proof = (v * 1.753) - 100;
      const isOverProof = proof >= 0;

      result = {
        title: "Proof Spirit Conversion",
        formula: "Proof Strength = (% v/v Ethanol * 1.753) - 100",
        calculation: `(${v}% * 1.753) - 100`,
        resultValue: `${Math.abs(proof).toFixed(2)}° ${isOverProof ? 'Over Proof (O.P.)' : 'Under Proof (U.P.)'}`,
        unit: isOverProof ? 'O.P.' : 'U.P.',
        summary: `${v}% v/v ethanol corresponds to ${Math.abs(proof).toFixed(2)}° ${isOverProof ? 'Over Proof (O.P.)' : 'Under Proof (U.P.)'}.`
      };
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error('Calculation error:', err);
    res.status(500).json({ error: err.message || 'Calculation failed' });
  }
});

module.exports = router;
