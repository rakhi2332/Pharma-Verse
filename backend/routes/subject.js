const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');

const PCI_SEMESTER_SUBJECTS = {
  1: [
    { _id: 'bp101t', code: 'BP101T', name: 'Human Anatomy and Physiology I', type: 'Theory', credits: 4, description: 'Study of cell, tissues, skeletal system, joints, blood, lymphatic system, peripheral nervous system & special senses.' },
    { _id: 'bp102t', code: 'BP102T', name: 'Pharmaceutical Analysis I', type: 'Theory', credits: 4, description: 'Volumetric analysis, acid-base titrations, non-aqueous, precipitation, complexometric & redox titrations.' },
    { _id: 'bp103t', code: 'BP103T', name: 'Pharmaceutics I', type: 'Theory', credits: 4, description: 'History of pharmacy, pharmacopoeias, dosage forms, posology, pharmaceutical calculations, monophasic/biphasic liquids & semisolids.' },
    { _id: 'bp104t', code: 'BP104T', name: 'Pharmaceutical Inorganic Chemistry', type: 'Theory', credits: 4, description: 'Impurities in pharmaceuticals, gastrointestinal agents, topical agents, dental products & radiopharmaceuticals.' }
  ],
  2: [
    { _id: 'bp201t', code: 'BP201T', name: 'Human Anatomy and Physiology II', type: 'Theory', credits: 4, description: 'Nervous system, digestive system, respiratory system, endocrine system, urinary system & reproductive system.' },
    { _id: 'bp202t', code: 'BP202T', name: 'Pharmaceutical Organic Chemistry I', type: 'Theory', credits: 4, description: 'Isomerism, alkanes, alkenes, conjugated dienes, alkyl halides, alcohols, carbonyl compounds & carboxylic acids.' },
    { _id: 'bp203t', code: 'BP203T', name: 'Biochemistry', type: 'Theory', credits: 4, description: 'Biomolecules, bioenergetics, carbohydrate metabolism, lipid metabolism, amino acid metabolism & nucleic acids.' },
    { _id: 'bp204t', code: 'BP204T', name: 'Pathophysiology', type: 'Theory', credits: 4, description: 'Basic mechanisms of cell injury, inflammation, cardiovascular, endocrine, respiratory, renal & infectious diseases.' }
  ],
  3: [
    { _id: 'bp301t', code: 'BP301T', name: 'Pharmaceutical Organic Chemistry II', type: 'Theory', credits: 4, description: 'Benzene & derivatives, aromatic amines, fats & oils, polynuclear hydrocarbons & cycloalkanes.' },
    { _id: 'bp302t', code: 'BP302T', name: 'Physical Pharmaceutics I', type: 'Theory', credits: 4, description: 'Solubility of drugs, states of matter, surface & interfacial tension, complexation & buffer solutions.' },
    { _id: 'bp303t', code: 'BP303T', name: 'Pharmaceutical Microbiology', type: 'Theory', credits: 4, description: 'Morphology of bacteria & fungi, staining, sterilization, disinfectant evaluation & aseptic area layout.' },
    { _id: 'bp304t', code: 'BP304T', name: 'Pharmaceutical Engineering', type: 'Theory', credits: 4, description: 'Flow of fluids, size reduction, filtration, evaporation, distillation, drying, mixing & corrosion control.' }
  ],
  4: [
    { _id: 'bp401t', code: 'BP401T', name: 'Pharmaceutical Organic Chemistry III', type: 'Theory', credits: 4, description: 'Stereoisomerism, optical activity, geometrical isomerism, heterocyclic chemistry & reactions.' },
    { _id: 'bp402t', code: 'BP402T', name: 'Medicinal Chemistry I', type: 'Theory', credits: 4, description: 'Physicochemical parameters, autonomic nervous system agents, sedatives, hypnotics, NSAIDs & anesthetics.' },
    { _id: 'bp403t', code: 'BP403T', name: 'Physical Pharmaceutics II', type: 'Theory', credits: 4, description: 'Colloidal dispersions, rheology, coarse dispersions (suspensions/emulsions) & micromeritics.' },
    { _id: 'bp404t', code: 'BP404T', name: 'Pharmacology I', type: 'Theory', credits: 4, description: 'General pharmacology principles, ADME pharmacokinetics, pharmacodynamics, neurohumoral transmission & ANS drugs.' },
    { _id: 'bp405t', code: 'BP405T', name: 'Pharmacognosy and Phytochemistry I', type: 'Theory', credits: 4, description: 'Cultivation, collection, classification of crude drugs, plant tissue culture, primary & secondary metabolites.' }
  ],
  5: [
    { _id: 'bp501t', code: 'BP501T', name: 'Medicinal Chemistry II', type: 'Theory', credits: 4, description: 'Antihistamines, antineoplastic agents, cardiovascular drugs, antianginal, antiarrhythmics, antihypertensives & diuretics.' },
    { _id: 'bp502t', code: 'BP502T', name: 'Industrial Pharmacy I', type: 'Theory', credits: 4, description: 'Preformulation, tablets, liquid dosage forms, capsules, parenterals, ophthalmic preparations & cosmetics.' },
    { _id: 'bp503t', code: 'BP503T', name: 'Pharmacology II', type: 'Theory', credits: 4, description: 'Cardiovascular drugs, autacoids, endocrine pharmacology, oral hypoglycemics, bioassay principles & NSAIDs.' },
    { _id: 'bp504t', code: 'BP504T', name: 'Pharmacognosy and Phytochemistry II', type: 'Theory', credits: 4, description: 'Metabolic pathways (shikimic/acetate), isolation & identification of alkaloids, steroids, glycosides & resins.' },
    { _id: 'bp505t', code: 'BP505T', name: 'Pharmaceutical Jurisprudence', type: 'Theory', credits: 4, description: 'Drugs and Cosmetics Act 1940, Pharmacy Act, Narcotic Drugs Act, Medicinal & Toilet Preparations Act.' }
  ],
  6: [
    { _id: 'bp601t', code: 'BP601T', name: 'Medicinal Chemistry III', type: 'Theory', credits: 4, description: 'Beta-lactam antibiotics, macrolides, quinolones, antimalarials, antitubercular, anti-HIV & SAR of anti-infectives.' },
    { _id: 'bp602t', code: 'BP602T', name: 'Pharmacology III', type: 'Theory', credits: 4, description: 'Chemotherapy of infectious diseases, cancer chemotherapy, immunopharmacology & toxicology principles.' },
    { _id: 'bp603t', code: 'BP603T', name: 'Herbal Drug Technology', type: 'Theory', credits: 4, description: 'Herbal medicine, nutraceuticals, herbal cosmetics, standardization of WHO herbal guidelines & patenting.' },
    { _id: 'bp604t', code: 'BP604T', name: 'Biopharmaceutics and Pharmacokinetics', type: 'Theory', credits: 4, description: 'Absorption, distribution, elimination kinetics, compartment models, bioavailability & bioequivalence studies.' },
    { _id: 'bp605t', code: 'BP605T', name: 'Pharmaceutical Biotechnology', type: 'Theory', credits: 4, description: 'Recombinant DNA technology, monoclonal antibodies, enzyme immobilization, biosensors & vaccines.' },
    { _id: 'bp606t', code: 'BP606T', name: 'Pharmaceutical Quality Assurance', type: 'Theory', credits: 4, description: 'cGMP principles, GLP, ISO 9000 quality management, ICH guidelines & pharmaceutical validation.' }
  ],
  7: [
    { _id: 'bp701t', code: 'BP701T', name: 'Instrumental Methods of Analysis', type: 'Theory', credits: 4, description: 'UV-Visible spectroscopy, IR, NMR, Mass spectrometry, Fluorimetry, HPLC, GC, Column & Thin Layer Chromatography.' },
    { _id: 'bp702t', code: 'BP702T', name: 'Industrial Pharmacy II', type: 'Theory', credits: 4, description: 'Pilot plant scale-up techniques, technology transfer, SUPAC guidelines, regulatory affairs & ISO 14000.' },
    { _id: 'bp703t', code: 'BP703T', name: 'Pharmacy Practice', type: 'Theory', credits: 4, description: 'Hospital pharmacy, community pharmacy, ADR monitoring, drug information services, patient counseling & TDM.' },
    { _id: 'bp704t', code: 'BP704T', name: 'Novel Drug Delivery Systems (NDDS)', type: 'Theory', credits: 4, description: 'Controlled release polymers, microencapsulation, liposomes, niosomes, transdermal patches, targeted drug delivery.' }
  ],
  8: [
    { _id: 'bp801t', code: 'BP801T', name: 'Biostatistics and Research Methodology', type: 'Theory', credits: 4, description: 'Parametric & non-parametric tests, t-test, ANOVA, Chi-square, regression analysis, DOE & research design.' },
    { _id: 'bp802t', code: 'BP802T', name: 'Social and Preventive Pharmacy', type: 'Theory', credits: 4, description: 'Public health programs, WHO disease prevention, nutrition, hygiene, maternal & child health care.' },
    { _id: 'bp803et', code: 'BP803ET', name: 'Pharmaceutical Marketing Management', type: 'Theory', credits: 4, description: 'Pharma market analysis, product management, pricing policies, promotional channels, detailing & sales force.' },
    { _id: 'bp804et', code: 'BP804ET', name: 'Pharmaceutical Regulatory Science', type: 'Theory', credits: 4, description: 'USFDA, EMA, CDSCO regulatory approval process, IND, NDA, ANDA filings & Orange Book specifications.' }
  ]
};

// Get single subject by ID
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const dbSubj = await Subject.findById(req.params.id);
      if (dbSubj) return res.json(dbSubj);
    }
    const key = String(req.params.id).toLowerCase();
    for (const semNum in PCI_SEMESTER_SUBJECTS) {
      const match = PCI_SEMESTER_SUBJECTS[semNum].find(s => s._id === key || s.code.toLowerCase() === key);
      if (match) return res.json(match);
    }
    return res.json(PCI_SEMESTER_SUBJECTS[1][0]);
  } catch (err) {
    return res.json(PCI_SEMESTER_SUBJECTS[1][0]);
  }
});

// Get subjects by semester
router.get('/semester/:semesterId', async (req, res) => {
  const cleanNum = parseInt(String(req.params.semesterId).replace(/\D/g, '')) || 1;
  const fallbackSubjects = PCI_SEMESTER_SUBJECTS[cleanNum] || PCI_SEMESTER_SUBJECTS[1];

  try {
    if (mongoose.connection.readyState === 1) {
      const dbSubjects = await Subject.find({ semester: req.params.semesterId });
      if (dbSubjects && dbSubjects.length > 0) {
        return res.json(dbSubjects);
      }
    }
    return res.json(fallbackSubjects);
  } catch (err) {
    return res.json(fallbackSubjects);
  }
});

// Create subject
router.post('/', async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    semester: req.body.semesterId,
    description: req.body.description,
    code: req.body.code
  });
  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
