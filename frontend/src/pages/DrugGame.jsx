import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Trophy, Zap, Clock, RotateCcw, CheckCircle2, 
  XCircle, Flame, Award, Brain, Atom, Sparkles, ArrowRight, 
  ShieldAlert, RefreshCw, Layers, Eye, Compass, Dna, Box,
  ArrowUp, ArrowDown, MoveVertical, HelpCircle, AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

// 3D Canvas Visualizer Component using HTML5 3D WebGL Projection
function MoleculeCanvas3D({ drugName, isChecked, isAllCorrect }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.width = canvas.parentElement?.clientWidth || 600;
    const height = canvas.height = 300;

    let angleX = 0.01;
    let angleY = 0.02;
    
    // Atoms for 3D Molecule
    const atoms = [
      { x: 0, y: 0, z: 0, element: 'C', radius: 18, color: '#38bdf8' },
      { x: 45, y: -25, z: 20, element: 'N', radius: 15, color: '#818cf8' },
      { x: -45, y: 30, z: -20, element: 'O', radius: 16, color: '#f43f5e' },
      { x: 30, y: 50, z: 35, element: 'C', radius: 17, color: '#38bdf8' },
      { x: -35, y: -45, z: -30, element: 'F', radius: 14, color: '#34d399' },
      { x: 60, y: 25, z: -25, element: 'O', radius: 15, color: '#fbbf24' },
      { x: -60, y: -15, z: 40, element: 'C', radius: 16, color: '#a7f3d0' }
    ];

    const bonds = [
      [0, 1], [0, 2], [0, 3], [1, 5], [2, 4], [1, 6], [3, 5]
    ];

    const particles = Array.from({ length: 30 }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * 300 - 150,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.5 + 0.2
    }));

    const project3D = (x, y, z, fov = 300) => {
      const scale = fov / (fov + z + 180);
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
        scale,
        z
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width / 1.2);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.6, '#090d16');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
      ctx.lineWidth = 1;
      for (let i = -width; i < width * 2; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, height);
        ctx.lineTo(width / 2 + (i - width / 2) * 0.2, height / 2);
        ctx.stroke();
      }

      angleX += 0.008;
      angleY += 0.012;

      particles.forEach(p => {
        p.z -= p.speed;
        if (p.z < -150) p.z = 150;
        const proj = project3D(p.x, p.y, p.z);
        ctx.fillStyle = isChecked ? (isAllCorrect ? 'rgba(52, 211, 153, 0.5)' : 'rgba(244, 63, 94, 0.4)') : 'rgba(148, 163, 184, 0.3)';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      const projectedAtoms = atoms.map(atom => {
        let x1 = atom.x * Math.cos(angleY) - atom.z * Math.sin(angleY);
        let z1 = atom.z * Math.cos(angleY) + atom.x * Math.sin(angleY);
        let y2 = atom.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = z1 * Math.cos(angleX) + atom.y * Math.sin(angleX);

        return {
          ...project3D(x1, y2, z2),
          element: atom.element,
          radius: atom.radius,
          color: atom.color,
          origZ: z2
        };
      });

      projectedAtoms.sort((a, b) => a.z - b.z);

      bonds.forEach(([i, j]) => {
        const a1 = projectedAtoms.find(a => atoms[i].element === a.element && Math.abs(a.origZ) > 0) || projectedAtoms[i];
        const a2 = projectedAtoms.find(a => atoms[j].element === a.element && Math.abs(a.origZ) > 0) || projectedAtoms[j];
        if (a1 && a2) {
          ctx.strokeStyle = isChecked ? (isAllCorrect ? 'rgba(52, 211, 153, 0.8)' : 'rgba(244, 63, 94, 0.6)') : 'rgba(203, 213, 225, 0.5)';
          ctx.lineWidth = Math.max(2, 4 * ((a1.scale + a2.scale) / 2));
          ctx.beginPath();
          ctx.moveTo(a1.x, a1.y);
          ctx.lineTo(a2.x, a2.y);
          ctx.stroke();
        }
      });

      projectedAtoms.forEach(atom => {
        const r = Math.max(4, atom.radius * atom.scale);
        const grad = ctx.createRadialGradient(
          atom.x - r * 0.3, atom.y - r * 0.3, r * 0.1,
          atom.x, atom.y, r
        );
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.4, isChecked ? (isAllCorrect ? '#34d399' : '#f43f5e') : atom.color);
        grad.addColorStop(1, '#020617');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(9, Math.round(11 * atom.scale))}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(atom.element, atom.x, atom.y);
      });

      // HUD Title
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`3D MOLECULAR MECHANISM STAGE: ${drugName.toUpperCase()}`, 16, 24);

      ctx.fillStyle = isChecked ? (isAllCorrect ? '#34d399' : '#f43f5e') : '#60a5fa';
      ctx.fillText(
        isChecked 
          ? (isAllCorrect ? 'SEQUENCE VERIFIED: 100% CORRECT MOA PATHWAY' : 'SEQUENCE ERROR: MISPLACED MECHANISM STEPS') 
          : 'REORDER STEPS TO FORM THE CORRECT PATHWAY SEQUENCE', 
        16, 42
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [drugName, isChecked, isAllCorrect]);

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
      <canvas ref={canvasRef} className="w-full h-72 block" />
      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
        <Box className="w-3 h-3 text-cyan-400 animate-spin" /> Live 3D Mechanism Render
      </div>
    </div>
  );
}

// Master MoA Sequence Puzzle Bank
const MOA_PUZZLE_BANK = [
  {
    id: 'omeprazole',
    drug: 'Omeprazole (Omez / Pan-40)',
    class: 'Proton Pump Inhibitor (PPI)',
    target: 'Gastric Parietal H+/K+-ATPase Pump',
    correctSequence: [
      'Orally administered prodrug passes un-ionized into acidic parietal cell canaliculus',
      'Protonation transforms drug into reactive, trapped sulfenamide active intermediate',
      'Sulfenamide forms covalent disulfide bond with Cys-813 of H+/K+-ATPase pump',
      'Irreversibly inhibits H+ ion transport into stomach, suppressing gastric acid'
    ],
    explanation: 'Omeprazole is a weak base prodrug that concentrates in acidic secretory canaliculi of parietal cells. Protonation forms a active sulfenamide that covalently inactivates H+/K+-ATPase, suppressing acid until new enzyme is synthesized.'
  },
  {
    id: 'amlodipine',
    drug: 'Amlodipine (Stamlo 5)',
    class: 'Dihydropyridine Calcium Channel Blocker',
    target: 'L-type Voltage-Gated Ca2+ Channels',
    correctSequence: [
      'Selectively binds to L-type Ca2+ channels in arterial vascular smooth muscle',
      'Inhibits transmembrane calcium ion influx during cell depolarization',
      'Decreases intracellular Ca2+ concentration and calmodulin complexing',
      'Inhibits Myosin Light Chain Kinase (MLCK), causing arterial vasodilation'
    ],
    explanation: 'Amlodipine inhibits L-type calcium channels, reducing intracellular calcium available for smooth muscle contraction, leading to peripheral arterial relaxation and lowered blood pressure.'
  },
  {
    id: 'amoxicillin',
    drug: 'Amoxicillin (Mox 500)',
    class: 'Beta-Lactam Antibiotic',
    target: 'Penicillin-Binding Proteins (PBPs)',
    correctSequence: [
      'Diffuses across bacterial cell membrane via outer membrane porin channels',
      'Binds Penicillin-Binding Proteins (PBPs / Transpeptidases) with high affinity',
      'Prevents transpeptidation cross-linking of linear peptidoglycan strands',
      'Activates bacterial autolysins, leading to cell wall weakening and osmotic lysis'
    ],
    explanation: 'Amoxicillin inhibits bacterial cell wall synthesis by binding PBPs, blocking peptidoglycan cross-linking and causing cell lysis.'
  },
  {
    id: 'metformin',
    drug: 'Metformin (Glycomet 500)',
    class: 'Biguanide Antidiabetic',
    target: 'Mitochondrial Complex I & AMPK',
    correctSequence: [
      'Enters hepatocytes via Organic Cation Transporter 1 (OCT1)',
      'Inhibits Mitochondrial Complex I, lowering cellular ATP/AMP ratio',
      'Activates AMP-Activated Protein Kinase (AMPK) enzyme pathways',
      'Suppresses hepatic gluconeogenesis and increases GLUT4 insulin sensitivity'
    ],
    explanation: 'Metformin lowers hepatic glucose production by inhibiting mitochondrial Complex I and activating AMPK, enhancing insulin sensitivity without causing hypoglycemia.'
  },
  {
    id: 'atorvastatin',
    drug: 'Atorvastatin (Atorva 10)',
    class: 'HMG-CoA Reductase Inhibitor (Statin)',
    target: 'HMG-CoA Reductase Enzyme',
    correctSequence: [
      'Competitively inhibits HMG-CoA reductase in hepatic parenchymal cells',
      'Blocks conversion of HMG-CoA into mevalonate (cholesterol precursor)',
      'Decreases intracellular hepatic cholesterol pool, sensing low cholesterol',
      'Upregulates cell-surface LDL receptors, increasing plasma LDL clearance'
    ],
    explanation: 'Statins inhibit HMG-CoA reductase to reduce hepatic cholesterol synthesis, triggering SREBP-2 cleavage and LDL receptor upregulation to clear circulating LDL.'
  },
  {
    id: 'paracetamol',
    drug: 'Paracetamol / Acetaminophen (Dolo 650)',
    class: 'Analgesic & Antipyretic',
    target: 'Central Cyclooxygenase (COX-3/Peroxidase)',
    correctSequence: [
      'Crosses blood-brain barrier into central nervous system (CNS)',
      'Inhibits central peroxidase site of COX-1/COX-2 and central COX-3 pathways',
      'Reduces prostaglandin E2 (PGE2) synthesis in hypothalamic heat center',
      'Induces cutaneous vasodilation and sweating to lower fever and relieve pain'
    ],
    explanation: 'Paracetamol acts centrally by inhibiting peroxidase-dependent prostaglandin synthesis in the CNS, acting on the hypothalamic thermoregulatory center.'
  },
  {
    id: 'clopidogrel',
    drug: 'Clopidogrel (Clavix / Deplatt)',
    class: 'P2Y12 Antiplatelet Agent',
    target: 'Platelet P2Y12 ADP Receptor',
    correctSequence: [
      'Hepatic CYP2C19 converts prodrug into active thiol metabolite',
      'Active metabolite irreversibly binds platelet P2Y12 ADP purinergic receptor',
      'Inhibits ADP-induced adenylyl cyclase inhibition, raising intracellular cAMP',
      'Blocks activation of Glycoprotein IIb/IIIa receptor complex, preventing aggregation'
    ],
    explanation: 'Clopidogrel is a prodrug bioactivated by CYP2C19. Its active thiol metabolite irreversibly locks the P2Y12 receptor, preventing fibrinogen-mediated platelet crosslinking.'
  }
];

// Helper to shuffle array items
const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export default function DrugGame() {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userSequence, setUserSequence] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isAllCorrect, setIsAllCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentPuzzle = MOA_PUZZLE_BANK[puzzleIndex];

  // Initialize or re-shuffle puzzle steps
  useEffect(() => {
    if (currentPuzzle) {
      setUserSequence(shuffleArray(currentPuzzle.correctSequence));
      setIsChecked(false);
      setIsAllCorrect(false);
      setTimeLeft(30);
    }
  }, [puzzleIndex]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (!isChecked && !isGameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isChecked, isGameOver, timeLeft]);

  // Swap item positions up/down
  const handleMoveStep = (fromIndex, direction) => {
    if (isChecked) return;
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= userSequence.length) return;

    const newSeq = [...userSequence];
    const temp = newSeq[fromIndex];
    newSeq[fromIndex] = newSeq[toIndex];
    newSeq[toIndex] = temp;
    setUserSequence(newSeq);
  };

  // Verify arrangement correctness
  const handleCheckSequence = () => {
    if (isChecked) return;

    const correctSeq = currentPuzzle.correctSequence;
    let correctCount = 0;

    userSequence.forEach((step, idx) => {
      if (step === correctSeq[idx]) {
        correctCount++;
      }
    });

    const isPerfect = correctCount === correctSeq.length;
    setIsChecked(true);
    setIsAllCorrect(isPerfect);

    if (isPerfect) {
      const timeBonus = Math.max(1, timeLeft);
      const points = 100 + timeBonus * 10;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextPuzzle = () => {
    if (puzzleIndex + 1 < MOA_PUZZLE_BANK.length) {
      setPuzzleIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setPuzzleIndex(0);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setUserSequence(shuffleArray(MOA_PUZZLE_BANK[0].correctSequence));
    setIsChecked(false);
    setIsAllCorrect(false);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950/80 to-slate-950 pt-12 pb-10 px-6 lg:px-12 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-2 inline-flex">
              <Zap className="w-4 h-4 text-cyan-400 animate-bounce" /> Mechanism of Action (MoA) Step Sequence Puzzle
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Drug MoA Sequence Puzzle
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Arrange the step-by-step biological cascade into the exact chronological order of action for each prescription drug!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-700 backdrop-blur-md shrink-0 shadow-2xl">
            <div className="text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Score</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{score} XP</span>
            </div>
            <div className="w-px h-8 bg-slate-800"></div>
            <div className="text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Streak</span>
              <span className="text-2xl font-black text-emerald-400 flex items-center gap-1 font-mono">
                <Flame className="w-5 h-5 text-orange-400 animate-bounce" /> {streak}x
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-8">

        {!isGameOver && currentPuzzle && (
          <div className="space-y-6">

            {/* 3D WebGL Canvas Stage */}
            <MoleculeCanvas3D
              drugName={currentPuzzle.drug}
              isChecked={isChecked}
              isAllCorrect={isAllCorrect}
            />

            {/* Target Drug HUD Header */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950 px-3 py-1 rounded-md border border-cyan-800">
                  Target Drug: {currentPuzzle.class}
                </span>
                <h3 className="text-2xl font-black text-white">{currentPuzzle.drug}</h3>
                <p className="text-xs text-slate-400 font-mono">Primary Molecular Target: <strong className="text-cyan-300">{currentPuzzle.target}</strong></p>
              </div>

              {/* Timer & Puzzle Counter */}
              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <span className="text-[10px] text-slate-400 uppercase block">Puzzle</span>
                  <span className="text-sm font-bold text-slate-200">{puzzleIndex + 1} / {MOA_PUZZLE_BANK.length}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-ping' : 'text-slate-400'}`} />
                  <span className={`font-mono text-sm font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-slate-200'}`}>{timeLeft}s</span>
                </div>
              </div>
            </div>

            {/* Step Ordering Interactive Area */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <MoveVertical className="w-4 h-4 text-cyan-400" /> Arrange Steps in Chronological Order (Step 1 to Step {userSequence.length}):
                </h4>
                <span className="text-xs text-slate-400 hidden sm:inline">Use Up/Down buttons to reorder</span>
              </div>

              {/* Dynamic Reorderable Step Cards */}
              <div className="space-y-3">
                {userSequence.map((stepText, idx) => {
                  const isPosCorrect = isChecked && stepText === currentPuzzle.correctSequence[idx];
                  let cardBorder = 'border-slate-800 bg-slate-950 text-slate-200';
                  
                  if (isChecked) {
                    cardBorder = isPosCorrect 
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-100' 
                      : 'border-red-500 bg-red-950/40 text-red-100';
                  }

                  return (
                    <motion.div
                      key={stepText}
                      layout
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-4 transition-all shadow-md ${cardBorder}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Step Number Badge */}
                        <div className={`w-8 h-8 rounded-xl font-mono font-black text-xs flex items-center justify-center shrink-0 border ${isChecked ? (isPosCorrect ? 'bg-emerald-900 border-emerald-500 text-emerald-200' : 'bg-red-900 border-red-500 text-red-200') : 'bg-slate-800 border-slate-700 text-cyan-400'}`}>
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm font-medium leading-snug">
                          {stepText}
                        </p>
                      </div>

                      {/* Controls / Status Icons */}
                      <div className="flex items-center gap-1 shrink-0">
                        {isChecked ? (
                          isPosCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )
                        ) : (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleMoveStep(idx, -1)}
                              disabled={idx === 0}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${idx === 0 ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-40' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-400'}`}
                              title="Move Step Up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveStep(idx, 1)}
                              disabled={idx === userSequence.length - 1}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${idx === userSequence.length - 1 ? 'bg-slate-900 border-slate-800 text-slate-600 opacity-40' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-cyan-400'}`}
                              title="Move Step Down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Verification Button & Explanation Modal */}
              <div className="pt-2">
                {!isChecked ? (
                  <button
                    onClick={handleCheckSequence}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Check Mechanism Sequence
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border ${isAllCorrect ? 'bg-emerald-950/80 border-emerald-800 text-emerald-100' : 'bg-amber-950/80 border-amber-800 text-amber-100'} space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      {isAllCorrect ? (
                        <span className="font-extrabold text-sm text-emerald-300 flex items-center gap-1.5 font-mono">
                          <CheckCircle2 className="w-4 h-4" /> PERFECT SEQUENCE! +{100 + timeLeft * 10} XP
                        </span>
                      ) : (
                        <span className="font-extrabold text-sm text-amber-300 flex items-center gap-1.5 font-mono">
                          <AlertCircle className="w-4 h-4" /> MISPLACED STEPS IN MOA CASCADE
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                      <strong>Pharmacological Pathway Analysis:</strong> {currentPuzzle.explanation}
                    </p>

                    <button
                      onClick={handleNextPuzzle}
                      className="mt-2 px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 ml-auto cursor-pointer"
                    >
                      <span>Next Drug Puzzle</span> <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>

            </div>

          </div>
        )}

        {/* STEP 3: GAME OVER SUMMARY */}
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-8 md:p-12 text-center space-y-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-cyan-500/30 mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-800">
                MoA Puzzle Master Challenge Completed
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white font-mono">
                Total Score: {score} XP
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                Consecutive Perfect MoA Sequences: <strong className="text-emerald-400 font-mono">{streak}</strong>
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-mono font-bold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Replay MoA Sequence Puzzles
              </button>
              <Link
                to="/semesters"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 border border-slate-700"
              >
                <Layers className="w-4 h-4" /> Return to Subject Notes
              </Link>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
