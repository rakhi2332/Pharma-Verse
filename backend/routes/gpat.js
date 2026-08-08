const express = require('express');
const router = express.Router();

const gpatSubjects = [
  { id: 'all', name: 'All Subjects', icon: 'Sparkles', count: 45 },
  { id: 'pharmacology', name: 'Pharmacology', icon: 'Pill', count: 6 },
  { id: 'pharmaceutics', name: 'Pharmaceutics', icon: 'TestTube', count: 6 },
  { id: 'medchem', name: 'Medicinal Chemistry', icon: 'Atom', count: 6 },
  { id: 'pharmacognosy', name: 'Pharmacognosy', icon: 'Leaf', count: 5 },
  { id: 'analysis', name: 'Pharmaceutical Analysis', icon: 'Activity', count: 4 },
  { id: 'biochem', name: 'Biochemistry & Biotech', icon: 'Dna', count: 4 },
  { id: 'jurisprudence', name: 'Pharma Jurisprudence', icon: 'FileText', count: 4 },
  { id: 'microbiology', name: 'Microbiology', icon: 'ShieldAlert', count: 4 },
  { id: 'physical_pharmacy', name: 'Physical Pharmacy', icon: 'Flame', count: 3 },
  { id: 'pathophysiology', name: 'Pathophysiology & Clinical', icon: 'HeartPulse', count: 3 },
];

const gpatMcqs = [
  // PHARMACOLOGY
  {
    id: 1,
    subject: 'pharmacology',
    question: 'Which of the following NSAIDs causes IRREVERSIBLE inhibition of the Cyclooxygenase (COX) enzyme?',
    options: ['Ibuprofen', 'Aspirin', 'Diclofenac', 'Indomethacin'],
    correctAnswer: 1,
    explanation: 'Aspirin (Acetylsalicylic acid) acetylates the serine-530 residue of COX-1 and serine-516 of COX-2 irreversibly. Other NSAIDs are reversible competitive inhibitors.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 2,
    subject: 'pharmacology',
    question: 'Enalapril is an ACE inhibitor prodrug. What is its active metabolite form?',
    options: ['Enalaprilat', 'Enalapril Acid', 'Enalapril Lactone', 'Enalapril Glucuronide'],
    correctAnswer: 0,
    explanation: 'Enalapril is an ethyl ester prodrug which undergoes hepatic esterase hydrolysis to form Enalaprilat, the active ACE inhibitor.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  },
  {
    id: 7,
    subject: 'pharmacology',
    question: 'Which of the following beta-blockers has intrinsic sympathomimetic activity (ISA)?',
    options: ['Propranolol', 'Pindolol', 'Atenolol', 'Timolol'],
    correctAnswer: 1,
    explanation: 'Pindolol and Acebutolol possess partial agonist activity (ISA), producing less resting bradycardia compared to pure beta-blockers.',
    difficulty: 'Hard',
    year: 'GPAT 2023'
  },
  {
    id: 9,
    subject: 'pharmacology',
    question: 'In organophosphate insecticide poisoning, which specific reactivator is administered to regenerate acetylcholinesterase?',
    options: ['Atropine Sulfate', 'Pralidoxime (2-PAM)', 'Physostigmine', 'Neostigmine'],
    correctAnswer: 1,
    explanation: 'Pralidoxime (2-PAM) nucleophilically attacks organophosphate-inhibited acetylcholinesterase to regenerate the active enzyme before aging occurs.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 10,
    subject: 'pharmacology',
    question: 'Warfarin produces its anticoagulant effect by inhibiting which liver enzyme?',
    options: ['Factor Xa', 'Thrombin', 'Vitamin K Epoxide Reductase (VKORC1)', 'Cyclooxygenase'],
    correctAnswer: 2,
    explanation: 'Warfarin inhibits VKORC1, preventing conversion of inactive vitamin K epoxide to active reduced vitamin K, thereby blocking synthesis of Factors II, VII, IX, and X.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 11,
    subject: 'pharmacology',
    question: 'Methotrexate exerts its antineoplastic action by inhibiting which key enzyme in folate metabolism?',
    options: ['Dihydrofolate Reductase (DHFR)', 'Thymidylate Synthase', 'Ribonucleotide Reductase', 'DNA Polymerase'],
    correctAnswer: 0,
    explanation: 'Methotrexate competitively inhibits DHFR, preventing reduction of folic acid to tetrahydrofolate (THF), essential for purine and pyrimidine synthesis.',
    difficulty: 'Hard',
    year: 'GPAT 2020'
  },

  // PHARMACEUTICS
  {
    id: 3,
    subject: 'pharmaceutics',
    question: 'According to the BCS Classification, drugs belonging to Class II exhibit:',
    options: [
      'High Solubility, High Permeability',
      'Low Solubility, High Permeability',
      'High Solubility, Low Permeability',
      'Low Solubility, Low Permeability'
    ],
    correctAnswer: 1,
    explanation: 'BCS Class II drugs (e.g., Nifedipine, Carbamazepine) have low aqueous solubility but high intestinal permeability. Their absorption is limited by dissolution rate.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 4,
    subject: 'pharmaceutics',
    question: 'Which superdisintegrant is chemically known as Cross-linked Sodium Carboxymethyl Cellulose?',
    options: ['Crospovidone', 'Sodium Starch Glycolate', 'Croscarmellose Sodium', 'Avicel PH 102'],
    correctAnswer: 2,
    explanation: 'Croscarmellose Sodium (Ac-Di-Sol) is cross-linked sodium CMC, widely used as a superdisintegrant in solid oral dosage forms.',
    difficulty: 'Easy',
    year: 'GPAT 2020'
  },
  {
    id: 12,
    subject: 'pharmaceutics',
    question: 'According to USP, Apparatus 1 and Apparatus 2 for dissolution testing correspond to:',
    options: [
      'Basket Apparatus and Paddle Apparatus',
      'Paddle Apparatus and Basket Apparatus',
      'Reciprocating Cylinder and Flow-through Cell',
      'Paddle over Disk and Rotating Cylinder'
    ],
    correctAnswer: 0,
    explanation: 'USP Dissolution Apparatus 1 is the Rotating Basket, while USP Apparatus 2 is the Paddle Apparatus.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  },
  {
    id: 13,
    subject: 'pharmaceutics',
    question: 'What is the standard official moisture content specification for empty Hard Gelatin Capsule shells?',
    options: ['2% - 5%', '8% - 10%', '13% - 16%', '20% - 25%'],
    correctAnswer: 2,
    explanation: 'Empty Hard Gelatin Capsule shells contain 13% to 16% equilibrium moisture content. Less than 10% makes capsules brittle; above 18% makes them soft.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 14,
    subject: 'pharmaceutics',
    question: 'Avicel PH 102 is widely used in tablet manufacturing as a direct compression:',
    options: ['Binder and Diluent', 'Lubricant and Glidant', 'Superdisintegrant', 'Enteric Coating Polymer'],
    correctAnswer: 0,
    explanation: 'Avicel PH 102 (Microcrystalline Cellulose with average particle size 100 µm) exhibits excellent plastic deformation, acting as a direct compression binder-diluent.',
    difficulty: 'Easy',
    year: 'GPAT 2019'
  },
  {
    id: 15,
    subject: 'pharmaceutics',
    question: 'In aerosol formulation, Propellant 114 is chemically named:',
    options: ['Dichlorodifluoromethane', 'Dichlorotetrafluoroethane', 'Trichloromonofluoromethane', 'Monochlorodifluoromethane'],
    correctAnswer: 1,
    explanation: 'CFC Propellant 114 is 1,2-dichloro-1,1,2,2-tetrafluoroethane (Rule of 90: 114 + 90 = 204 -> 2 Carbons, 0 Hydrogens, 4 Fluorines, 2 Chlorines).',
    difficulty: 'Hard',
    year: 'GPAT 2020'
  },

  // MEDICINAL CHEMISTRY
  {
    id: 5,
    subject: 'medchem',
    question: 'Morphine belongs to which class of alkaloids based on its chemical skeleton?',
    options: ['Indole alkaloid', 'Phenanthrene alkaloid', 'Isoquinoline alkaloid', 'Tropane alkaloid'],
    correctAnswer: 1,
    explanation: 'Morphine, Codeine, and Thebaine contain a phenanthrene ring nucleus, classifying them as phenanthrene morphinan alkaloids.',
    difficulty: 'Medium',
    year: 'GPAT 2021'
  },
  {
    id: 8,
    subject: 'medchem',
    question: 'Omeprazole undergoes acid-catalyzed conversion in parietal cells to form active:',
    options: ['Sulfenamide intermediate', 'Sulfone derivative', 'Sulfide metabolite', 'Thiol conjugate'],
    correctAnswer: 0,
    explanation: 'Omeprazole is a prodrug activated at acidic pH (<4) into a reactive tetracyclic sulfenamide, which covalently binds to H+/K+ ATPase.',
    difficulty: 'Hard',
    year: 'GPAT 2022'
  },
  {
    id: 16,
    subject: 'medchem',
    question: 'Penicillins consist of a 4-membered beta-lactam ring fused to a 5-membered ring named:',
    options: ['Thiazolidine ring', 'Dihydrothiazine ring', 'Imidazolidine ring', 'Oxazolidine ring'],
    correctAnswer: 0,
    explanation: 'Penicillins possess a core 6-aminopenicillanic acid (6-APA) structure containing a beta-lactam ring fused to a saturated thiazolidine ring.',
    difficulty: 'Easy',
    year: 'GPAT 2023'
  },
  {
    id: 17,
    subject: 'medchem',
    question: 'Ciprofloxacin contains which essential substituents at position 6 and position 7 of its fluoroquinolone ring?',
    options: [
      'Position 6: Fluorine, Position 7: Piperazine',
      'Position 6: Chlorine, Position 7: Morpholine',
      'Position 6: Fluorine, Position 7: Pyrrolidine',
      'Position 6: Methyl, Position 7: Piperidine'
    ],
    correctAnswer: 0,
    explanation: 'Ciprofloxacin has a fluorine atom at C-6 (increases cell wall penetration and DNA gyrase inhibition) and a piperazinyl group at C-7 (broadens Gram-negative activity).',
    difficulty: 'Hard',
    year: 'GPAT 2021'
  },
  {
    id: 18,
    subject: 'medchem',
    question: 'Which active stereoisomer of Chloramphenicol exhibits antibacterial activity?',
    options: ['D-(-)-threo', 'L-(+)-threo', 'D-(-)-erythro', 'L-(+)-erythro'],
    correctAnswer: 0,
    explanation: 'Out of 4 possible optical isomers, only the 1R,2R-D-(-)-threo isomer of Chloramphenicol binds to 50S ribosomal subunit to inhibit protein synthesis.',
    difficulty: 'Hard',
    year: 'GPAT 2020'
  },
  {
    id: 19,
    subject: 'medchem',
    question: 'Lidocaine differs structurally from Procaine because Lidocaine contains an:',
    options: ['Amide linkage (resistant to plasma esterases)', 'Ester linkage', 'Ether linkage', 'Urethane linkage'],
    correctAnswer: 0,
    explanation: 'Lidocaine is an aminoamide local anesthetic (longer duration of action) whereas Procaine is an aminoester rapidly hydrolyzed by plasma pseudocholinesterase.',
    difficulty: 'Medium',
    year: 'GPAT 2019'
  },

  // PHARMACOGNOSY
  {
    id: 6,
    subject: 'pharmacognosy',
    question: 'Keller-Kiliani test is a specific color reaction test for identifying:',
    options: ['Anthraquinone glycosides', 'Digitoxose sugar in Cardiac glycosides', 'Tropane alkaloids', 'Flavonoids'],
    correctAnswer: 1,
    explanation: 'Keller-Kiliani test produces a reddish-brown ring turning blue-green at the junction, specific for 2-deoxy sugars like Digitoxose present in Digitalis cardiac glycosides.',
    difficulty: 'Hard',
    year: 'GPAT 2019'
  },
  {
    id: 20,
    subject: 'pharmacognosy',
    question: 'Vincristine and Vinblastine antineoplastic alkaloids are biosynthesized from which amino acid precursor?',
    options: ['L-Tryptophan', 'L-Tyrosine', 'L-Ornithine', 'L-Phenylalanine'],
    correctAnswer: 0,
    explanation: 'Vinca monoterpenoid indole alkaloids (Vincristine, Vinblastine) are biosynthesized from L-Tryptophan via tryptamine and secologanin precursors.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 21,
    subject: 'pharmacognosy',
    question: 'Borntrager test is used for the qualitative identification of:',
    options: ['Anthraquinone glycosides', 'Cyanogenetic glycosides', 'Saponin glycosides', 'Flavonoids'],
    correctAnswer: 0,
    explanation: 'Borntrager test (boiling drug with dilute H2SO4, extracting with organic solvent, and adding NH4OH) yields a rose-pink to red color in the ammoniacal layer for free anthraquinones.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  },
  {
    id: 22,
    subject: 'pharmacognosy',
    question: 'Tropane alkaloids (Atropine, Hyoscyamine, Scopolamine) are biosynthesized from which amino acid?',
    options: ['L-Ornithine', 'L-Lysine', 'L-Histidine', 'L-Methionine'],
    correctAnswer: 0,
    explanation: 'The pyrrolidine ring of tropane alkaloids in Solanaceae plants is derived from L-Ornithine, while Tropic acid is derived from L-Phenylalanine.',
    difficulty: 'Hard',
    year: 'GPAT 2020'
  },
  {
    id: 23,
    subject: 'pharmacognosy',
    question: 'Stomatal Index (S) formula in leaf quantitative microscopy is defined as:',
    options: [
      'S = (E * 100) / (P + E)',
      'S = (P * 100) / (P + E)',
      'S = (E * P) / 100',
      'S = (P + E) / E'
    ],
    correctAnswer: 0,
    explanation: 'Stomatal Index S = (E * 100) / (P + E), where E = Number of epidermal cells in given area, and P = Number of stomata in same area.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },

  // PHARMACEUTICAL ANALYSIS
  {
    id: 24,
    subject: 'analysis',
    question: 'Retention Factor (Rf) value in Thin Layer Chromatography (TLC) is calculated as:',
    options: [
      'Distance traveled by solute / Distance traveled by solvent front',
      'Distance traveled by solvent front / Distance traveled by solute',
      'Volume of mobile phase / Volume of stationary phase',
      'Retention time of peak 2 / Retention time of peak 1'
    ],
    correctAnswer: 0,
    explanation: 'Rf = Distance traveled by solute spot / Distance traveled by solvent front. Rf values range between 0.0 and 1.0.',
    difficulty: 'Easy',
    year: 'GPAT 2022'
  },
  {
    id: 25,
    subject: 'analysis',
    question: 'Karl Fischer reagent used for quantitative estimation of water/moisture consists of:',
    options: [
      'Iodine, Sulfur dioxide, Pyridine, and Methanol',
      'Potassium permanganate, Sulfuric acid, and Acetone',
      'Silver nitrate, Nitric acid, and Ethanol',
      'Sodium thiosulfate, Starch, and Chloroform'
    ],
    correctAnswer: 0,
    explanation: 'Karl Fischer reagent contains Iodine (I2), Sulfur dioxide (SO2), Pyridine (C5H5N), and anhydrous Methanol (CH3OH) for stoichiometry 1 H2O : 1 I2.',
    difficulty: 'Hard',
    year: 'GPAT 2021'
  },
  {
    id: 26,
    subject: 'analysis',
    question: 'An Auxochrome in UV-Visible spectroscopy is defined as a substituent that:',
    options: [
      'Does not absorb UV radiation itself, but shifts λmax to longer wavelength (bathochromic shift) and increases intensity',
      'Is directly responsible for color absorption in a molecule',
      'Shifts absorption to shorter wavelength (hypsochromic shift)',
      'Decreases molar absorptivity (hypochromic effect)'
    ],
    correctAnswer: 0,
    explanation: 'An auxochrome (e.g., -OH, -NH2, -SH) contains non-bonding lone pair electrons that extend conjugation when attached to a chromophore, causing a bathochromic (red) shift.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 27,
    subject: 'analysis',
    question: 'In Gas Chromatography (GC) with Thermal Conductivity Detector (TCD), which carrier gas offers highest sensitivity?',
    options: ['Helium or Hydrogen', 'Nitrogen', 'Carbon dioxide', 'Argon'],
    correctAnswer: 0,
    explanation: 'Helium and Hydrogen have significantly higher thermal conductivities than organic analytes, maximizing TCD response signals.',
    difficulty: 'Hard',
    year: 'GPAT 2020'
  },

  // BIOCHEMISTRY & BIOTECHNOLOGY
  {
    id: 28,
    subject: 'biochem',
    question: 'The Michaelis-Menten constant (Km) of an enzyme represents:',
    options: [
      'Substrate concentration at which reaction velocity is half of Vmax',
      'Maximum velocity of the enzymatic reaction',
      'Enzyme concentration at saturation',
      'Activation energy required for catalysis'
    ],
    correctAnswer: 0,
    explanation: 'Km is the substrate concentration at which the reaction velocity is half of maximum velocity (Vmax/2). A lower Km indicates higher enzyme-substrate affinity.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 29,
    subject: 'biochem',
    question: 'In competitive enzyme inhibition, how are Km and Vmax affected?',
    options: [
      'Km increases, Vmax remains unchanged',
      'Km decreases, Vmax decreases',
      'Km remains unchanged, Vmax decreases',
      'Both Km and Vmax increase'
    ],
    correctAnswer: 0,
    explanation: 'Competitive inhibitors bind to the active site, increasing apparent Km (requiring more substrate to reach Vmax/2) while Vmax remains unchanged at high substrate concentrations.',
    difficulty: 'Hard',
    year: 'GPAT 2022'
  },
  {
    id: 30,
    subject: 'biochem',
    question: 'In Polymerase Chain Reaction (PCR), what is the standard temperature required for DNA strand denaturation?',
    options: ['94°C - 95°C', '55°C - 60°C', '72°C', '37°C'],
    correctAnswer: 0,
    explanation: 'PCR denaturation occurs at 94-95°C to break hydrogen bonds between complementary strands. Annealing occurs at 55-65°C, and extension by Taq polymerase occurs at 72°C.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  },
  {
    id: 31,
    subject: 'biochem',
    question: 'Which enzyme serves as the primary rate-limiting regulatory step in Glycolysis?',
    options: ['Phosphofructokinase-1 (PFK-1)', 'Hexokinase', 'Pyruvate Kinase', 'Phosphoglycerate Mutase'],
    correctAnswer: 0,
    explanation: 'Phosphofructokinase-1 (PFK-1) converts Fructose-6-phosphate to Fructose-1,6-bisphosphate and is the key rate-limiting, irreversible committed step of Glycolysis.',
    difficulty: 'Medium',
    year: 'GPAT 2020'
  },

  // PHARMACEUTICAL JURISPRUDENCE
  {
    id: 32,
    subject: 'jurisprudence',
    question: 'The Pharmacy Act was enacted by the Parliament of India in which year?',
    options: ['1948', '1940', '1955', '1970'],
    correctAnswer: 0,
    explanation: 'The Pharmacy Act was enacted in 1948 to regulate the profession and practice of pharmacy and to constitute Pharmacy Council of India (PCI).',
    difficulty: 'Easy',
    year: 'GPAT 2022'
  },
  {
    id: 33,
    subject: 'jurisprudence',
    question: 'Under the Drugs and Cosmetics Act 1940, Schedule M specifies requirements for:',
    options: [
      'Good Manufacturing Practices (GMP) and factory premises',
      'Standards for patent or proprietary medicines',
      'List of prescription drugs',
      'Life period of drugs'
    ],
    correctAnswer: 0,
    explanation: 'Schedule M outlines Good Manufacturing Practices (GMP) and requirements of plant, equipment, and premises for pharmaceutical products.',
    difficulty: 'Easy',
    year: 'GPAT 2023'
  },
  {
    id: 34,
    subject: 'jurisprudence',
    question: 'Retail sale of Schedule X drugs (Narcotic & Psychotropic substances) requires preserving prescription records for at least:',
    options: ['2 Years', '1 Year', '5 Years', '6 Months'],
    correctAnswer: 0,
    explanation: 'Schedule X drug prescriptions must be issued in duplicate, with one copy preserved by the retail pharmacist for at least 2 years.',
    difficulty: 'Medium',
    year: 'GPAT 2021'
  },
  {
    id: 35,
    subject: 'jurisprudence',
    question: 'The Magic Remedies (Objectionable Advertisements) Act was passed in which year?',
    options: ['1954', '1948', '1970', '1985'],
    correctAnswer: 0,
    explanation: 'The Drugs and Magic Remedies (Objectionable Advertisements) Act was passed in 1954 to prohibit false claims for curing certain specified diseases.',
    difficulty: 'Hard',
    year: 'GPAT 2019'
  },

  // PHARMACEUTICAL MICROBIOLOGY
  {
    id: 36,
    subject: 'microbiology',
    question: 'What are the standard operational parameters for moist heat sterilization using an Autoclave?',
    options: [
      '121°C at 15 psi pressure for 15-20 minutes',
      '160°C for 2 hours',
      '100°C for 30 minutes',
      '72°C for 15 seconds'
    ],
    correctAnswer: 0,
    explanation: 'Autoclaving uses saturated steam under pressure at 121°C (15 lbs/sq inch pressure) for 15 to 20 minutes to destroy all vegetative bacteria and bacterial endospores.',
    difficulty: 'Easy',
    year: 'GPAT 2023'
  },
  {
    id: 37,
    subject: 'microbiology',
    question: 'Which biological indicator organism is officially used to validate Autoclave moist heat sterilization?',
    options: [
      'Geobacillus stearothermophilus spores',
      'Bacillus atrophaeus spores',
      'Clostridium tetani spores',
      'Escherichia coli'
    ],
    correctAnswer: 0,
    explanation: 'Geobacillus stearothermophilus (formerly B. stearothermophilus) spores exhibit high resistance to moist heat and are used to validate steam autoclaves.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 38,
    subject: 'microbiology',
    question: 'In Gram staining technique, what is the primary stain and counterstain used?',
    options: [
      'Primary: Crystal Violet, Counterstain: Safranin',
      'Primary: Methylene Blue, Counterstain: Eosin',
      'Primary: Carbol Fuchsin, Counterstain: Malachite Green',
      'Primary: Iodine, Counterstain: Crystal Violet'
    ],
    correctAnswer: 0,
    explanation: 'Gram staining uses Crystal Violet as primary stain, Gram’s Iodine as mordant, Alcohol/Acetone as decolorizer, and Safranin as counterstain (Gram-positive stain purple, Gram-negative stain pink/red).',
    difficulty: 'Easy',
    year: 'GPAT 2020'
  },
  {
    id: 39,
    subject: 'microbiology',
    question: 'Limulus Amebocyte Lysate (LAL) reagent used for bacterial endotoxin testing is derived from the blood of:',
    options: ['Horseshoe Crab (Limulus polyphemus)', 'Rabbit', 'Guinea Pig', 'Rhesus Monkey'],
    correctAnswer: 0,
    explanation: 'LAL reagent is extracted from blood amebocytes of the Horseshoe Crab (Limulus polyphemus). It coagulates in the presence of Gram-negative bacterial endotoxins (LPS).',
    difficulty: 'Medium',
    year: 'GPAT 2021'
  },

  // PHYSICAL PHARMACY
  {
    id: 40,
    subject: 'physical_pharmacy',
    question: 'Polymeric hydrocolloid solutions like Sodium CMC and Tragacanth exhibit which type of non-Newtonian flow behavior?',
    options: ['Pseudoplastic flow (Shear-thinning)', 'Dilatant flow (Shear-thickening)', 'Plastic flow (Bingham bodies)', 'Newtonian flow'],
    correctAnswer: 0,
    explanation: 'High molecular weight polymers exhibit Pseudoplastic flow (shear-thinning), where viscosity decreases with increasing shear rate as polymer chains align.',
    difficulty: 'Medium',
    year: 'GPAT 2023'
  },
  {
    id: 41,
    subject: 'physical_pharmacy',
    question: 'A pharmaceutical suspension is considered deflocculated and physically stable against rapid caking if its Zeta Potential is:',
    options: ['Greater than +30 mV or less than -30 mV', 'Between -5 mV and +5 mV', 'Zero', 'Exactly +10 mV'],
    correctAnswer: 0,
    explanation: 'Zeta potential values above +30 mV or below -30 mV provide sufficient electrostatic repulsion to prevent particle aggregation and flocculation.',
    difficulty: 'Hard',
    year: 'GPAT 2022'
  },
  {
    id: 42,
    subject: 'physical_pharmacy',
    question: 'Thixotropy is defined as an isothermal, slow, reversible structural breakdown from:',
    options: [
      'Gel-to-sol transition on shearing, with gradual sol-to-gel recovery at rest',
      'Sol-to-gel transition on shearing',
      'Liquid-to-solid crystallization',
      'Irreversible polymer degradation'
    ],
    correctAnswer: 0,
    explanation: 'Thixotropy is desirable in pharmaceutical suspensions and parenterals—shearing (shaking) thins the gel to a fluid sol for pouring/injection, which reverts to protective gel state at rest.',
    difficulty: 'Medium',
    year: 'GPAT 2021'
  },

  // PATHOPHYSIOLOGY & CLINICAL PHARMACY
  {
    id: 43,
    subject: 'pathophysiology',
    question: 'Type I Immediate Hypersensitivity allergic reactions (e.g., Anaphylaxis, Asthma) are mediated by:',
    options: ['IgE antibodies and Mast cell Histamine release', 'IgG antibodies and Complement activation', 'T-lymphocytes and Cytokines', 'IgM immune complexes'],
    correctAnswer: 0,
    explanation: 'Type I hypersensitivity involves antigen binding to IgE sensitized mast cells/basophils, triggering immediate degranulation and release of histamine, leukotrienes, and prostaglandins.',
    difficulty: 'Medium',
    year: 'GPAT 2022'
  },
  {
    id: 44,
    subject: 'pathophysiology',
    question: 'Which specific serum cardiac biomarker is considered the gold standard for diagnosing Acute Myocardial Infarction (MI)?',
    options: ['Cardiac Troponin I (cTnI) and Troponin T (cTnT)', 'Serum Creatinine', 'Alanine Aminotransferase (ALT)', 'Amylase'],
    correctAnswer: 0,
    explanation: 'Cardiac Troponins (cTnI and cTnT) are highly sensitive and specific cardiac regulatory proteins released into circulation following myocardial necrosis.',
    difficulty: 'Easy',
    year: 'GPAT 2023'
  },
  {
    id: 45,
    subject: 'pathophysiology',
    question: 'Therapeutic Drug Monitoring (TDM) is clinically essential for drugs possessing a:',
    options: ['Narrow Therapeutic Index (e.g., Digoxin, Theophylline, Lithium)', 'Wide Therapeutic Index (e.g., Penicillin)', 'High Oral Bioavailability', 'Short Half-life'],
    correctAnswer: 0,
    explanation: 'TDM measures serum drug levels for narrow therapeutic index drugs (Digoxin, Lithium, Theophylline, Phenytoin, Aminoglycosides) where therapeutic and toxic concentrations overlap closely.',
    difficulty: 'Easy',
    year: 'GPAT 2021'
  }
];

const gpatRevisionNotes = [
  {
    title: 'Noyes-Whitney Dissolution Rate Equation',
    subject: 'Pharmaceutics',
    formula: 'dC/dt = (D * A * (Cs - C)) / h',
    summary: 'Governs the rate of solid drug dissolution in biological fluids. D = Diffusion coefficient, A = Surface area of drug particles, Cs = Saturation solubility, C = Bulk concentration, h = Diffusion layer thickness.'
  },
  {
    title: 'Henderson-Hasselbalch Ionization Equation',
    subject: 'Biopharmaceutics & Physical Pharmacy',
    formula: 'pH = pKa + log([Ionized] / [Unionized]) (Weak Acids)',
    summary: 'Calculates the degree of ionization at physiological pH. Unionized drug lipid-soluble and absorbed across membranes. Weak acids ionize in basic media (pH > pKa); weak bases ionize in acidic media (pH < pKa).'
  },
  {
    title: 'Pharmacokinetic Clearance & Half-Life Formulas',
    subject: 'Pharmacology & Biopharmaceutics',
    formula: 'Cl = Vd * Kel  |  t1/2 = 0.693 / Kel = (0.693 * Vd) / Cl',
    summary: 'Clearance (Cl) measures volume of plasma cleared of drug per unit time. Elimination half-life (t1/2) is directly proportional to Volume of Distribution (Vd) and inversely proportional to Clearance (Cl).'
  },
  {
    title: 'Beer-Lambert Absorbance Spectrophotometry Law',
    subject: 'Pharmaceutical Analysis',
    formula: 'A = ε * b * c = A(1%, 1cm) * b * c',
    summary: 'Absorbance (A) is directly proportional to molar absorptivity (ε), cuvette path length (b in cm), and sample concentration (c). Used for UV-Vis assay calculations of active raw materials and finished tablets.'
  },
  {
    title: 'Young’s, Dilling’s & Fried’s Pediatric Dose Calculations',
    subject: 'Posology & Dispensing',
    formula: 'Young: Dose = (Age / (Age + 12)) * Adult Dose  |  Dilling: Dose = (Age / 20) * Adult Dose',
    summary: 'Classical mathematical formulas for adjusting adult dosages for pediatric patients based on age. Fried’s rule (Age in months / 150) applies specifically for infants under 1 year.'
  },
  {
    title: 'Griffin’s HLB Scale & Surfactant Emulsion Formula',
    subject: 'Physical Pharmaceutics',
    formula: 'Required HLB = (HLBa * Wta + HLBb * Wtb) / (Wta + Wtb)',
    summary: 'Hydrophile-Lipophile Balance scale (1-20). HLB 3-6 = W/O emulsifier, HLB 8-16 = O/W emulsifier, HLB 13-15 = Detergent, HLB 16-18 = Solubilizing agent.'
  },
  {
    title: 'Chromatographic Column Efficiency & Resolution',
    subject: 'Pharmaceutical Analysis',
    formula: 'N = 16 * (tR / W)^2  |  R = 2 * (tR2 - tR1) / (W1 + W2)',
    summary: 'N = Theoretical Plate Number (higher N indicates sharper peaks and higher column efficiency). R = Resolution between two HPLC peaks (R ≥ 1.5 indicates complete baseline separation).'
  },
  {
    title: 'Fick’s First Law of Transmembrane Passive Diffusion',
    subject: 'Biopharmaceutics',
    formula: 'J = -D * (dC / dx) = P * (C1 - C2)',
    summary: 'Governs passive drug absorption across mucosal membranes. Flux (J) is directly proportional to diffusion coefficient (D), membrane surface area, and concentration gradient (C1 - C2).'
  },
  {
    title: 'Arrhenius Accelerated Stability & Shelf-Life Equation',
    subject: 'Quality Assurance',
    formula: 'k = A * e^(-Ea / RT)  |  log(k2 / k1) = (Ea / 2.303R) * ((T2 - T1) / (T1 * T2))',
    summary: 'Calculates activation energy (Ea) and predicts drug shelf life (t90) at 25°C from short-term accelerated stability testing at elevated temperatures (40°C, 50°C, 60°C) per ICH Q1A guidelines.'
  },
  {
    title: 'Autonomic G-Protein Signal Transduction Pathways',
    subject: 'Pharmacology',
    formula: 'Alpha-1: Gq (IP3/DAG) | Alpha-2: Gi (↓cAMP) | Beta-1/2/3: Gs (↑cAMP)',
    summary: 'Signal transduction mechanisms for adrenergic and cholinergic receptor subtypes. Beta-1 acts on heart (Gs -> AC -> cAMP); Beta-2 acts on bronchial smooth muscle causing bronchodilation.'
  }
];

// GET /api/gpat/subjects
router.get('/subjects', (req, res) => {
  res.json({ success: true, subjects: gpatSubjects });
});

// GET /api/gpat/mcqs
router.get('/mcqs', (req, res) => {
  const { subject } = req.query;
  let filtered = gpatMcqs;
  if (subject && subject !== 'all') {
    filtered = gpatMcqs.filter(m => m.subject === subject);
  }
  res.json({ success: true, count: filtered.length, mcqs: filtered });
});

// POST /api/gpat/submit
router.post('/submit', (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedOption }
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid submission data' });
    }

    let score = 0;
    const totalQuestions = answers.length;
    const results = answers.map(item => {
      const q = gpatMcqs.find(m => m.id === item.questionId);
      if (!q) return null;

      const isCorrect = q.correctAnswer === item.selectedOption;
      if (isCorrect) score += 4; // Standard GPAT scoring: +4 for correct, -1 for wrong
      else if (item.selectedOption !== null && item.selectedOption !== undefined) score -= 1;

      return {
        questionId: q.id,
        question: q.question,
        userOption: item.selectedOption,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    }).filter(Boolean);

    const maxScore = totalQuestions * 4;
    const percentage = Math.max(0, Math.round((score / maxScore) * 100));

    res.json({
      success: true,
      score,
      maxScore,
      percentage,
      totalQuestions,
      results
    });
  } catch (err) {
    console.error('GPAT submit error:', err);
    res.status(500).json({ error: 'Server error processing test submission' });
  }
});

// GET /api/gpat/notes
router.get('/notes', (req, res) => {
  res.json({ success: true, notes: gpatRevisionNotes });
});

module.exports = router;
