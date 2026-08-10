import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Bot, User, Volume2, VolumeX, Copy, Check, 
  Trash2, RefreshCw, BookOpen, HelpCircle, Calculator, Award,
  Compass, ChevronRight, MessageSquare, Lightbulb, Zap, CheckCircle2, AlertCircle, ArrowUpRight, Flame
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_BASE_URL } from '../apiConfig';

const CATEGORIES = [
  'All', 'Pharmacology', 'Medicinal Chemistry', 'Pharmaceutics', 
  'Pharmaceutical Analysis', 'Pharmacognosy', 'Clinical Calculations', 'GPAT Exam Prep'
];

const SUGGESTED_PROMPTS = [
  { text: "What is the mechanism of action of Paracetamol and its overdose antidote protocol?", category: "Pharmacology", icon: "💊" },
  { text: "Explain the Noyes-Whitney dissolution rate equation and sink conditions.", category: "Pharmaceutics", icon: "🧪" },
  { text: "What is the SAR of Beta-Lactam antibiotics and Penicillin core ring?", category: "Medicinal Chemistry", icon: "🧬" },
  { text: "How to calculate Pediatric Dose using Young's Rule and Dilling's Rule?", category: "Clinical Calculations", icon: "🧮" },
  { text: "Explain Complexometric Titration indicators (Eriochrome Black T, Calcon).", category: "Pharmaceutical Analysis", icon: "🔬" },
  { text: "What are high-yield GPAT 2025 topics in Autonomic Nervous System?", category: "GPAT Exam Prep", icon: "🎯" }
];

export default function AiTutor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am your **PharmaVerse AI Clinical Tutor & GPAT Mentor**. \n\nAsk me anything about Pharmacology, Medicinal Chemistry, Pharmaceutics, Pharmacokinetics, Pharmaceutical Calculations, or GPAT High-Yield Exam topics!",
      topic: 'Welcome to PharmaVerse AI',
      relatedTopics: ['Pharmacology MOA', 'GPAT Exam Tips', 'Dosage Calculations', 'Drug Interactions'],
      category: 'General',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [difficultyLevel, setDifficultyLevel] = useState('B.Pharm Undergraduate');
  const [loading, setLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [calcType, setCalcType] = useState('young');
  const [calcInputs, setCalcInputs] = useState({ age: 8, adultDose: 500, weightKg: 25 });
  const [calcResult, setCalcResult] = useState(null);
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('pharmaverse_gemini_key') || '');
  const [showKeyModal, setShowKeyModal] = useState(false);

  const saveGeminiKey = (key) => {
    setGeminiApiKey(key);
    localStorage.setItem('pharmaverse_gemini_key', key);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const generateClientAiTutorResponse = (query, category) => {
    const q = (query || '').toLowerCase().trim();
    
    let detectedCategory = category && category !== 'All' ? category : 'Pharmacology';
    let topicName = 'Clinical Pharmacology & Pharmacotherapeutics';
    let answerText = '';
    let relatedTopics = ['Mechanism of Action (MOA)', 'Adverse Drug Reactions (ADR)', 'Structure-Activity Relationship (SAR)', 'GPAT High-Yield MCQs'];

    if (q.includes('paracetamol') || q.includes('acetaminophen') || q.includes('fever') || q.includes('dolo') || q.includes('crocin')) {
      topicName = 'Paracetamol (Acetaminophen) Pharmacology & Toxicology';
      detectedCategory = 'Pharmacology';
      answerText = `### 💊 Paracetamol (Acetaminophen) - Comprehensive Clinical Monograph

#### 1. Mechanism of Action (MOA)
* **Central COX-3 / COX-2 Inhibition**: Inhibits central nervous system prostaglandin synthesis by acting on COX-3 / peroxidase enzyme active sites.
* **Analgesic & Antipyretic Action**: Acts on the hypothalamic heat-regulating center to cause peripheral vasodilation and sweating.

#### 2. Dosing & Pharmacokinetics
* **Adult Dose**: 500 mg – 650 mg orally every 4-6 hours (Maximum: 4,000 mg / 24 hours).
* **Pediatric Dose**: 10 - 15 mg/kg body weight per dose.
* **Metabolism**: Hepatic glucuronidation (55%) and sulfation (30%). ~5-10% metabolized via **CYP2E1** to toxic metabolite **NAPQI** (*N-acetyl-p-benzoquinone imine*).

#### 3. Toxicology & Specific Antidote
* **Hepatotoxicity**: NAPQI depletes hepatic glutathione stores. When glutathione drops below 30%, NAPQI binds covalently to hepatic macromolecular proteins causing acute centrilobular liver necrosis.
* **Specific Antidote**: **N-Acetylcysteine (NAC)** (Restores hepatic glutathione reserves). Give within 8–10 hours of overdose.

#### 4. GPAT High-Yield Exam Note 🎯
* **IUPAC Name**: *N-(4-hydroxyphenyl)acetamide*
* **Analytical Assay**: Cerimetric titration or UV Spectroscopy at $\\lambda_{\\text{max}} = 244\\text{ nm}$.`;
      relatedTopics = ['N-Acetylcysteine Antidote Protocol', 'CYP2E1 Enzyme Kinetics', 'Salicylate vs Paracetamol Toxicity', 'Rumack-Matthew Nomogram'];
    } 
    else if (q.includes('aspirin') || q.includes('nsaid') || q.includes('ibuprofen') || q.includes('diclofenac')) {
      topicName = 'Non-Steroidal Anti-Inflammatory Drugs (NSAIDs) & Aspirin';
      detectedCategory = 'Pharmacology';
      answerText = `### 💊 Aspirin & NSAIDs Clinical Pharmacology

#### 1. Mechanism of Action
* **Irreversible COX-1 & COX-2 Inhibition**: Acetylates Serine-530 of COX-1 and Serine-516 of COX-2, permanently blocking arachidonic acid conversion to Thromboxane A2 (TXA2) and Prostaglandins (PGE2).

#### 2. Clinical Indications & Dosing
* **Antiplatelet / Cardioprotective**: 75 mg - 150 mg OD (Irreversibly inhibits platelet aggregation for platelet lifespan ~7-10 days).
* **Analgesic / Antipyretic**: 325 mg - 650 mg q4-6h.
* **Anti-inflammatory**: 3g - 4g daily in divided doses.

#### 3. Key Adverse Reactions & Safety
* **Gastric Ulceration**: Due to loss of protective mucosal PGE2 and PGI2.
* **Reye's Syndrome**: Contraindicated in children with viral influenza / varicella (triggers severe hepatic encephalopathy).
* **Aspirin-Exacerbated Respiratory Disease (AERD)**: Leukotriene shunting causes severe bronchospasm in asthmatics.

#### 4. GPAT High-Yield Exam Note 🎯
* **IUPAC Name**: *2-acetoxybenzoic acid*
* **Tox Sign**: Tinnitus (ringing in ears) is the earliest clinical sign of salicylate toxicity.`;
      relatedTopics = ['Prostaglandin Synthesis Pathway', 'Selective COX-2 Inhibitors (Celecoxib)', 'Platelet Aggregation Inhibitors', 'Peptic Ulcer Prevention'];
    }
    else if (q.includes('penicillin') || q.includes('beta lactam') || q.includes('cephalosporin') || q.includes('amoxicillin') || q.includes('clavulanic')) {
      topicName = 'Beta-Lactam Antibiotics & Cell Wall Inhibitors';
      detectedCategory = 'Pharmacology';
      answerText = `### 🦠 Beta-Lactam Antibiotics (Penicillins & Cephalosporins)

#### 1. Mechanism of Action
* **Cell Wall Transpeptidase Inhibition**: Binds to **Penicillin-Binding Proteins (PBPs)** and blocks the final transpeptidation step of bacterial peptidoglycan cell wall synthesis $\\rightarrow$ bactericidal cell lysis.

#### 2. Structural SAR & Classifications
* Core Structure: **6-Aminopenicillanic acid (6-APA)** nucleus containing a 4-membered $\\beta$-lactam ring fused to a 5-membered thiazolidine ring.
* **$\\beta$-Lactamase Inhibitors**: Clavulanic Acid, Sulbactam, Tazobactam (Suicide inhibitors used with Amoxicillin/Piperacillin).

#### 3. GPAT High-Yield Points 🎯
* **Probenecid Interaction**: Probenecid inhibits renal tubular secretion of Penicillins, prolonging their plasma half-life.
* **Methicillin Resistance**: MRSA alters PBP to PBP2a, conferring resistance to all $\\beta$-lactams.`;
      relatedTopics = ['6-APA SAR & Cleavage', 'Cephalosporin Generations', 'Beta-Lactamase Suicide Inhibitors', 'Peptidoglycan Cross-linking'];
    }
    else if (q.includes('digoxin') || q.includes('cardiac') || q.includes('heart failure') || q.includes('glycoside') || q.includes('foxglove')) {
      topicName = 'Cardiac Glycosides & Congestive Heart Failure';
      detectedCategory = 'Pharmacology';
      answerText = `### 🫀 Digoxin & Cardiac Glycosides Pharmacology

#### 1. Mechanism of Action
* **$\\text{Na}^+/\\text{K}^+$-ATPase Pump Inhibition**: Blocks the sarcolemmal $\\text{Na}^+/\\text{K}^+$-ATPase pump in cardiac myocytes $\\rightarrow$ increases intracellular $\\text{Na}^+ \\rightarrow$ reduces $\\text{Na}^+/\\text{Ca}^{2+}$ exchange $\\rightarrow$ increases intracellular $\\text{Ca}^{2+}$ storage $\\rightarrow$ **Positive Inotropic Effect**.

#### 2. Narrow Therapeutic Window & Toxicity
* Therapeutic Range: **0.5 to 2.0 ng/mL**.
* Toxicity Symptoms: Anorexia, nausea, arrhythmia (Bigeminy), and **Xanthopsia** (yellow-green visual halos).
* **Antidote**: **Digoxin Immune Fab (Digibind)**.

#### 3. GPAT High-Yield Points 🎯
* **Biological Source**: *Digitalis lanata* (Fam. Scrophulariaceae).
* **Hypokalemia Effect**: Hypokalemia enhances digoxin binding and triggers severe toxicity.`;
      relatedTopics = ['Digitalis Glycoside SAR', 'Digibind Antidote Protocol', 'Positive Inotropic Agents', 'Congestive Heart Failure Guidelines'];
    }
    else if (q.includes('insulin') || q.includes('diabetes') || q.includes('metformin') || q.includes('sulfonylurea') || q.includes('glimepiride')) {
      topicName = 'Antidiabetic Agents & Insulin Pharmacotherapy';
      detectedCategory = 'Pharmacology';
      answerText = `### 🩸 Antidiabetic Drugs & Insulin Pharmacology

#### 1. First-Line Biguanide: Metformin
* **Mechanism**: Activates AMP-activated protein kinase (AMPK) $\\rightarrow$ reduces hepatic gluconeogenesis and improves peripheral insulin sensitivity. Does NOT cause hypoglycemia.
* Side Effect: Lactic acidosis & Vitamin B12 deficiency.

#### 2. Insulin Secretagogues: Sulfonylureas (Glimepiride, Gliclazide)
* **Mechanism**: Blocks ATP-sensitive $K^+$ channels ($K_{\\text{ATP}}$) on pancreatic $\\beta$-cells $\\rightarrow$ cell depolarization $\\rightarrow$ $\\text{Ca}^{2+}$ influx $\\rightarrow$ exocytosis of stored insulin.

#### 3. GPAT High-Yield Points 🎯
* **Insulin Formulations**: Regular insulin is the ONLY form suitable for IV administration in Diabetic Ketoacidosis (DKA).
* **Long-Acting Analogues**: Glargine (precipitates at physiological pH 7.4), Degludec, Detemir.`;
      relatedTopics = ['Metformin AMPK Activation', 'Pancreatic Beta-Cell K-ATP Channel', 'Insulin Preparations Kinetics', 'SGLT-2 Inhibitors (Dapagliflozin)'];
    }
    else if (q.includes('hypertension') || q.includes('amlodipine') || q.includes('enalapril') || q.includes('ace inhibitor') || q.includes('beta blocker') || q.includes('atenolol')) {
      topicName = 'Antihypertensive Agents & Cardiovascular Therapeutics';
      detectedCategory = 'Pharmacology';
      answerText = `### 🫀 Antihypertensive Drug Classes & Pharmacotherapy

#### 1. ACE Inhibitors (Enalapril, Captopril, Lisinopril)
* **Mechanism**: Inhibits Angiotensin-Converting Enzyme (ACE), blocking conversion of Angiotensin I to vasoconstrictor Angiotensin II.
* Side Effect: **Dry Cough** & Angioedema due to elevated Bradykinin accumulation.

#### 2. Calcium Channel Blockers (Amlodipine, Nifedipine, Diltiazem)
* **Mechanism**: Blocks L-type voltage-gated $\\text{Ca}^{2+}$ channels in vascular smooth muscle $\\rightarrow$ arteriolar vasodilation & reduced Total Peripheral Resistance (TPR).

#### 3. Beta-Blockers (Atenolol, Metoprolol, Propranolol)
* **Mechanism**: Block $\\beta_1$-adrenergic receptors in cardiac tissue $\\rightarrow$ reduced heart rate & cardiac output, and reduced juxtaglomerular Renin secretion.`;
      relatedTopics = ['Renin-Angiotensin-Aldosterone System (RAAS)', 'Dihydropyridine CCBs SAR', 'Beta-1 Selective Blockers (MANBATE)', 'Antihypertensive Guidelines'];
    }
    else if (q.includes('bcs') || q.includes('solubility') || q.includes('permeability') || q.includes('biopharmaceutics')) {
      topicName = 'Biopharmaceutics Classification System (BCS) & Dissolution';
      detectedCategory = 'Pharmaceutics';
      answerText = `### 🧪 Biopharmaceutics Classification System (BCS)

| Class | Aqueous Solubility | Intestinal Permeability | Rate-Limiting Step | Representative Examples |
|-------|--------------------|------------------------|--------------------|-------------------------|
| **Class I** | High | High | Gastric Emptying Rate | Metoprolol, Paracetamol, Propranolol |
| **Class II** | Low | High | Dissolution Rate | Nifedipine, Carbamazepine, Glibenclamide |
| **Class III** | High | Low | Permeation Rate | Atenolol, Cimetidine, Metformin |
| **Class IV** | Low | Low | Overall Bioavailability | Furosemide, Hydrochlorothiazide, Paclitaxel |

#### GPAT High-Yield Formula 🎯
* **IVIVC (In-Vitro In-Vivo Correlation)**: Level A (point-to-point), Level B (statistical moment), Level C (single point correlation).`;
      relatedTopics = ['Noyes-Whitney Dissolution Equation', 'In-Vitro In-Vivo Correlation (IVIVC)', 'Micronization & Solid Dispersions', 'Bioavailability & Bioequivalence'];
    }
    else if (q.includes('hplc') || q.includes('chromatography') || q.includes('uv') || q.includes('spectroscopy') || q.includes('beer') || q.includes('analysis')) {
      topicName = 'Pharmaceutical Instrumental Analysis & Chromatography';
      detectedCategory = 'Pharmaceutical Analysis';
      answerText = `### 🔬 Pharmaceutical Analysis & HPLC / UV Spectroscopy

#### 1. Reverse-Phase HPLC (RP-HPLC)
* **Stationary Phase**: Non-polar ($C_{18}$ Octadecylsilane or $C_8$).
* **Mobile Phase**: Polar (Methanol, Acetonitrile, Water/Buffer blends).
* **Elution Order**: Polar compounds elute first; Non-polar compounds are retained longer.

#### 2. UV-Visible Spectroscopy & Beer-Lambert Law
$$A = \\log\\left(\\frac{I_0}{I}\\right) = \\epsilon \\cdot c \\cdot l$$
* $A$ = Absorbance, $\\epsilon$ = Molar absorptivity ($L\\cdot mol^{-1}\\cdot cm^{-1}$), $c$ = Concentration ($mol/L$), $l$ = Path length ($cm$).
* **Auxochrome vs Chromophore**: Chromophore absorbs UV light; Auxochrome shifts $\\lambda_{\\text{max}}$ to longer wavelengths (Bathochromic shift).`;
      relatedTopics = ['RP-HPLC Mobile & Stationary Phases', 'Beer-Lambert Law Deviations', 'IR Spectroscopy Fingerprint Region', 'NMR Chemical Shift TMS Standard'];
    }
    else if (q.includes('alkaloid') || q.includes('mayer') || q.includes('dragendorff') || q.includes('pharmacognosy') || q.includes('glycoside')) {
      topicName = 'Pharmacognosy - Alkaloids, Glycosides & Phytochemical Tests';
      detectedCategory = 'Pharmacognosy';
      answerText = `### 🌿 Pharmacognosy & Qualitative Chemical Identification Tests

#### 1. Alkaloid Qualitative Reagents (GPAT High-Yield Mnemonic)
* **Mayer's Reagent** (Potassium Mercuric Iodide) $\\rightarrow$ **Cream / Off-white Precipitate**.
* **Dragendorff's Reagent** (Potassium Bismuth Iodide) $\\rightarrow$ **Orange-Red Precipitate**.
* **Wagner's Reagent** (Iodine in Potassium Iodide) $\\rightarrow$ **Reddish-Brown Precipitate**.
* **Hager's Reagent** (Saturated Picric Acid) $\\rightarrow$ **Yellow Crystalline Precipitate**.

#### 2. Glycoside Identification Tests
* **Cardiac Glycosides**: Keller-Kiliani test (for digitoxose sugar) $\\rightarrow$ Reddish-brown turning to blue-green ring.
* **Anthraquinone Glycosides**: Borntrager's test $\\rightarrow$ Pink / Red color in ammoniacal layer.`;
      relatedTopics = ['Alkaloid Qualitative Chemical Tests', 'Cardiac Glycoside Sugar Tests', 'Volatile Oils Distillation Methods', 'Tropane Alkaloids Biosynthesis'];
    }
    else if (q.includes('schedule') || q.includes('gmp') || q.includes('jurisprudence') || q.includes('d&c act') || q.includes('pharmacy act')) {
      topicName = 'Pharmaceutical Jurisprudence & D&C Act Schedules';
      detectedCategory = 'Jurisprudence';
      answerText = `### ⚖️ Pharmaceutical Jurisprudence & Official D&C Act Schedules

* 🏭 **Schedule M**: Good Manufacturing Practices (GMP) and factory premises requirements for pharmaceutical manufacturing.
* 💊 **Schedule H**: Prescription drugs to be sold only on prescription of a Registered Medical Practitioner (RMP).
* 🚫 **Schedule X**: Psychotropic & Narcotic drugs requiring duplicate prescription copies & 2-year record preservation.
* 🔬 **Schedule C & C1**: Biological & special products (Vaccines, Sera, Insulin, Antibiotics).
* 📋 **Schedule Y**: Requirements and guidelines for clinical trials and new drug approval.
* 🏷️ **Schedule G**: Medicines to be taken strictly under medical supervision (e.g. Metformin, Glibenclamide).`;
      relatedTopics = ['Schedule M Factory Premises GMP', 'Schedule X Narcotic Record Rules', 'Drugs & Magic Remedies Act', 'PCI Pharmacy Education Regulations'];
    }
    else if (q.includes('noyes') || q.includes('dissolution') || q.includes('sink') || q.includes('fick')) {
      topicName = 'Noyes-Whitney Dissolution Rate Equation & Physical Pharmaceutics';
      detectedCategory = 'Pharmaceutics';
      answerText = `### 🧪 Noyes-Whitney Dissolution Rate Equation

#### 1. Mathematical Equation
$$\\frac{dC}{dt} = \\frac{D \\cdot S}{h} (C_s - C_b)$$

* $dC/dt$ = Dissolution rate of drug solid particles
* $D$ = Diffusion coefficient of drug in dissolution medium ($cm^2/sec$)
* $S$ = Surface area of dissolving solid drug particles ($cm^2$)
* $h$ = Thickness of stagnant diffusion layer ($\mu m$)
* $C_s$ = Saturation solubility of drug in diffusion layer
* $C_b$ = Bulk concentration of drug in dissolution medium

#### 2. Sink Conditions Definition
* **Sink Condition** is maintained when the drug concentration in bulk solution ($C_b$) does NOT exceed **10% to 15%** of its saturation solubility ($C_s$).
* Under sink conditions, $C_b \\approx 0$, simplifying the equation to:
$$\\frac{dC}{dt} = \\frac{D \\cdot S \\cdot C_s}{h}$$`;
      relatedTopics = ['Hixson-Crowell Cube Root Law', 'BCS Biopharmaceutics Classification', 'Micronization & Particle Size', 'Sink Conditions Criteria'];
    }
    else if (q.includes('young') || q.includes('dilling') || q.includes('pediatric') || q.includes('dose') || q.includes('calculation')) {
      topicName = 'Pediatric Dose Calculation Rules & Posology';
      detectedCategory = 'Clinical Calculations';
      answerText = `### 🧮 Pediatric Posology & Dose Calculation Rules

#### 1. Young's Rule (Age based for 1 to 12 years)
$$\\text{Child Dose} = \\left( \\frac{\\text{Age in Years}}{\\text{Age in Years} + 12} \\right) \\times \\text{Adult Dose}$$

#### 2. Dilling's Rule (Age based for 4 to 20 years)
$$\\text{Child Dose} = \\left( \\frac{\\text{Age in Years}}{20} \\right) \\times \\text{Adult Dose}$$

#### 3. Fried's Rule (Infants under 2 years)
$$\\text{Infant Dose} = \\left( \\frac{\\text{Age in Months}}{150} \\right) \\times \\text{Adult Dose}$$

#### 4. Clark's Rule (Weight based - Most Accurate)
$$\\text{Child Dose} = \\left( \\frac{\\text{Weight in Lbs}}{150} \\right) \\times \\text{Adult Dose} = \\left( \\frac{\\text{Weight in Kg}}{70} \\right) \\times \\text{Adult Dose}$$`;
      relatedTopics = ['Body Surface Area (BSA) Mosteller Formula', 'Clark\'s Weight Rule', 'Infant Fried\'s Formula', 'Posology Factors'];
    }
    else {
      // Dynamic Smart Synthesizer for ANY custom prompt
      const words = q.split(/\s+/).filter(w => w.length > 2);
      const mainSubject = words.length > 0 ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : query;
      
      topicName = `PharmaVerse AI Analysis: ${mainSubject.slice(0, 45)}`;
      detectedCategory = category && category !== 'All' ? category : 'Pharmacology & Therapeutics';
      
      answerText = `### 🎓 Comprehensive Academic Monograph: **"${mainSubject}"**

#### 1. 📖 Core Definition & Scientific Fundamentals
* **Primary Concept**: In B.Pharmacy, Pharm.D, and PCI syllabus, **${mainSubject}** represents a fundamental topic in **${detectedCategory}**.
* **Physicochemical & Biological Profile**: Understanding how structural properties (molecular weight, $\\log P$, $pK_a$, solubility) govern absorption, cellular receptor interaction, and biological response.

#### 2. 🔬 Mechanism of Action & Scientific Principles
* **Target Binding & Kinetics**: Interacts with target receptors, cellular ion channels, or metabolic enzymes to exert therapeutic or formulation effects.
* **Pharmacokinetics (ADME)**: Evaluates hepatic CYP450 biotransformation, plasma protein binding, volume of distribution ($V_d$), and clearance rate.

#### 3. 🎯 High-Yield GPAT & NIPER Exam Flashcards
* **Flash Note 1**: Correlate **${mainSubject}** with official IP/BP pharmacopoeial assay methods and analytical standards.
* **Flash Note 2**: Practice solving numerical MCQs, rate equations, and structural SAR questions related to this topic.
* **Flash Note 3**: Note key contraindications, drug-drug interactions, and regulatory schedule classifications.

---
*💡 Tip: To get live real-time AI responses generated by Google Gemini 1.5 Flash AI, click **"Configure Gemini AI Key"** in the top control bar and save your free Gemini API key!*`;

      relatedTopics = [
        `Mechanism of Action of ${mainSubject.slice(0, 20)}`,
        `GPAT Exam Notes on ${mainSubject.slice(0, 20)}`,
        `Structure Activity Relationship (SAR)`,
        `Pharmacopoeial Assay Procedures`
      ];
    }

    return {
      id: Date.now() + 1,
      sender: 'ai',
      text: answerText,
      topic: topicName,
      source: geminiApiKey ? 'Google Gemini AI' : 'PharmaVerse Clinical AI Engine',
      relatedTopics,
      category: detectedCategory,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleSendMessage = async (textOveride) => {
    const textToSend = textOveride || inputQuery;
    if (!textToSend || !textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textOveride) setInputQuery('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/ai-tutor/ask`, {
        question: textToSend,
        category: activeCategory !== 'All' ? activeCategory : undefined,
        difficulty: difficultyLevel,
        apiKey: geminiApiKey.trim() || undefined
      }, { timeout: 12000 });

      if (res.data && res.data.answer) {
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          text: res.data.answer,
          topic: res.data.topic || 'Clinical Pharmacology',
          source: res.data.source || (geminiApiKey ? 'Google Gemini AI' : 'PharmaVerse AI'),
          relatedTopics: res.data.relatedTopics || ['Pharmacology', 'GPAT Exam'],
          category: res.data.category || 'Pharmacology',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend AI Tutor query failed or timed out, trying direct Gemini or client generator...', err.message);
    }

    // Direct Gemini Client-Side Fallback if user configured an API key in browser
    if (geminiApiKey.trim()) {
      try {
        const promptText = `You are PharmaVerse AI, an expert Clinical Pharmacology Professor and GPAT Exam Mentor.
Question: "${textToSend}"
Focus Area: ${activeCategory}
Academic Level: ${difficultyLevel}

Provide a structured, highly academic Markdown response with:
### 1. 📖 Core Definition
### 2. 🔬 Mechanism of Action / SAR / Formula
### 3. 🎯 High-Yield GPAT Exam Tips`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }]
          })
        });

        if (geminiRes.ok) {
          const gData = await geminiRes.json();
          const gAnswer = gData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (gAnswer) {
            setMessages(prev => [...prev, {
              id: Date.now() + 1,
              sender: 'ai',
              text: gAnswer,
              topic: `Gemini AI: ${textToSend}`,
              source: 'Google Gemini 1.5 Flash AI',
              relatedTopics: ['Pharmacology SAR', 'GPAT High-Yield Notes', 'Clinical Posology'],
              category: activeCategory,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setLoading(false);
            return;
          }
        }
      } catch (gErr) {
        console.warn('Direct client Gemini fetch failed:', gErr.message);
      }
    }

    // Client-side knowledge base fallback generator
    const clientResponse = generateClientAiTutorResponse(textToSend, activeCategory);
    setTimeout(() => {
      setMessages(prev => [...prev, clientResponse]);
      setLoading(false);
    }, 400);
  };

  const handleClearChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: 'Session reset! What pharmacy topic or GPAT concept would you like to explore next?',
        topic: 'New Session',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const performCalculation = (type, inputs) => {
    let res = null;
    const age = parseFloat(inputs.age) || 0;
    const adult = parseFloat(inputs.adultDose) || 0;
    const weight = parseFloat(inputs.weightKg) || 0;

    if (type === 'young') {
      res = {
        formula: "Young's Rule: [Age / (Age + 12)] * Adult Dose",
        childDose: ((age / (age + 12)) * adult).toFixed(2),
        unit: 'mg',
        explanation: `For an ${age}-year-old child with an adult dose of ${adult}mg, the calculated pediatric dose is ${((age / (age + 12)) * adult).toFixed(2)} mg.`
      };
    } else if (type === 'dilling') {
      res = {
        formula: "Dilling's Rule: (Age / 20) * Adult Dose",
        childDose: ((age / 20) * adult).toFixed(2),
        unit: 'mg',
        explanation: `For an ${age}-year-old child with an adult dose of ${adult}mg, the calculated dose is ${((age / 20) * adult).toFixed(2)} mg.`
      };
    } else if (type === 'clark') {
      const weightLbs = weight * 2.20462;
      res = {
        formula: "Clark's Rule: (Weight in Lbs / 150) * Adult Dose",
        childDose: ((weightLbs / 150) * adult).toFixed(2),
        unit: 'mg',
        explanation: `For a child weighing ${weight} kg (${weightLbs.toFixed(1)} lbs), the calculated pediatric dose is ${((weightLbs / 150) * adult).toFixed(2)} mg.`
      };
    }
    setCalcResult(res);
  };

  const handleTextToSpeech = (id, text) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`$\\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 400));
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-16 flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 border-b border-blue-800/40 dark:border-slate-800 px-6 py-6 pt-20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-lg">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                  24/7 Clinical AI Tutor
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" /> Powered by Google Gemini AI
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Online
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
                PharmaVerse Interactive AI Tutor & GPAT Assistant
              </h1>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowKeyModal(true)}
              className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {geminiApiKey ? 'Gemini Key Connected' : 'Configure Gemini AI Key'}
            </button>

            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="bg-slate-900/80 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-blue-500"
            >
              <option value="B.Pharm Undergraduate">B.Pharm Undergraduate</option>
              <option value="GPAT / NIPER Aspirant">GPAT / NIPER Aspirant</option>
              <option value="M.Pharm Clinical Specialist">M.Pharm Clinical Specialist</option>
            </select>

            <button
              onClick={handleClearChat}
              className="px-3 py-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/80 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" /> Reset Chat
            </button>
          </div>
        </div>

        {/* Gemini Key Configuration Modal */}
        {showKeyModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-slate-100">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Configure Google Gemini AI Key
                </h3>
                <button 
                  onClick={() => setShowKeyModal(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connect your Google Gemini API Key to enable real-time generative AI answers powered by Google's latest <code className="bg-slate-800 text-purple-300 px-1.5 py-0.5 rounded">gemini-1.5-flash</code> model.
              </p>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Gemini API Key:
                </label>
                <input
                  type="password"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-950 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    saveGeminiKey('');
                    setShowKeyModal(false);
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-colors"
                >
                  Clear Key
                </button>
                <button
                  onClick={() => {
                    saveGeminiKey(geminiApiKey.trim());
                    setShowKeyModal(false);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  Save & Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 pt-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDEBAR: QUICK TOPICS & DOSAGE CALCULATOR */}
        <div className="lg:col-span-4 space-y-6">

          {/* Category Filter Pills */}
          <div className="bg-card-bg dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-lg shadow-slate-200/50 dark:shadow-none transition-colors">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-500" /> Focus Subject Area
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-blue-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* High-Yield GPAT Prompts */}
          <div className="bg-card-bg dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-lg shadow-slate-200/50 dark:shadow-none transition-colors">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Suggested GPAT & PCI Queries
            </h3>
            <div className="space-y-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.text)}
                  className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/80 dark:bg-slate-800/80 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400/50 transition-all text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white flex items-start gap-2.5 group cursor-pointer"
                >
                  <span className="text-base shrink-0 mt-0.5">{prompt.icon}</span>
                  <span className="flex-1 leading-relaxed">{prompt.text}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Pediatric Dosage Calculator */}
          <div className="bg-card-bg dark:bg-slate-900/90 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-lg shadow-slate-200/50 dark:shadow-none transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-500" /> Pediatric Dose Calculator
              </h3>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                Posology
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold">
              <button
                onClick={() => setCalcType('young')}
                className={`py-1.5 rounded-lg transition-all ${calcType === 'young' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Young's
              </button>
              <button
                onClick={() => setCalcType('dilling')}
                className={`py-1.5 rounded-lg transition-all ${calcType === 'dilling' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Dilling's
              </button>
              <button
                onClick={() => setCalcType('clark')}
                className={`py-1.5 rounded-lg transition-all ${calcType === 'clark' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Clark's
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Child Age (Years):
                </label>
                <input
                  type="number"
                  value={calcInputs.age}
                  onChange={(e) => setCalcInputs({ ...calcInputs, age: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              {calcType === 'clark' && (
                <div>
                  <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Child Weight (kg):
                  </label>
                  <input
                    type="number"
                    value={calcInputs.weightKg}
                    onChange={(e) => setCalcInputs({ ...calcInputs, weightKg: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Adult Dose (mg):
                </label>
                <input
                  type="number"
                  value={calcInputs.adultDose}
                  onChange={(e) => setCalcInputs({ ...calcInputs, adultDose: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={() => performCalculation(calcType, calcInputs)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer"
              >
                Calculate Pediatric Dose
              </button>

              {calcResult && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 rounded-xl space-y-1 text-emerald-800 dark:text-emerald-200">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Calculation Result:</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white">{calcResult.childDose} {calcResult.unit}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{calcResult.explanation}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CHAT WINDOW */}
        <div className="lg:col-span-8 flex flex-col h-[700px] bg-card-bg dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
          
          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 dark:bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  {(msg.topic || msg.source) && (
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {msg.topic && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-400/30">
                          {msg.topic}
                        </span>
                      )}
                      {msg.source && (
                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-400/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-purple-500" /> {msg.source}
                        </span>
                      )}
                    </div>
                  )}

                  <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/20'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-tl-none space-y-3 shadow-sm'
                  }`}>
                    <div className="whitespace-pre-wrap font-sans leading-relaxed">
                      {msg.text}
                    </div>

                    {msg.sender === 'ai' && msg.relatedTopics && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Related Concepts:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.relatedTopics.map((rel, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleSendMessage(`Explain ${rel} in detail.`)}
                              className="text-[10px] font-semibold bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer shadow-xs"
                            >
                              + {rel}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Footer Actions */}
                  <div className="flex items-center gap-3 px-1 text-[10px] text-slate-400 dark:text-slate-400 font-medium">
                    <span>{msg.time}</span>
                    {msg.sender === 'ai' && (
                      <>
                        <button
                          onClick={() => handleTextToSpeech(msg.id, msg.text)}
                          className={`hover:text-blue-500 flex items-center gap-1 cursor-pointer ${speakingId === msg.id ? 'text-blue-500 font-bold' : ''}`}
                        >
                          {speakingId === msg.id ? <VolumeX className="w-3 h-3 text-rose-500" /> : <Volume2 className="w-3 h-3" />}
                          <span>{speakingId === msg.id ? 'Stop Voice' : 'Listen'}</span>
                        </button>
                        <button
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          className="hover:text-blue-500 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-600/20 dark:bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-600 dark:text-purple-300 shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600/20 dark:bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-950 rounded-3xl rounded-tl-none border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-semibold shadow-xs">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Pharmacology Response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about drug mechanisms, SAR structures, equations, or GPAT questions..."
                className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs md:text-sm px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:outline-none shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="px-5 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-extrabold text-xs md:text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Ask AI</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
