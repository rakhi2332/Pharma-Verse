import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, Beaker, Play, RotateCcw, CheckCircle2, 
  Sparkles, Info, Award, Clock, ArrowRight, ShieldCheck, Thermometer, Droplet
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function VirtualLabSimulator() {
  const [activeExp, setActiveExp] = useState('titration'); // 'titration', 'limit_test', 'dt_test', 'syrup'

  // TITRATION EXPERIMENT STATES
  const [buretteVolume, setBuretteVolume] = useState(0.0); // mL added
  const [flaskColor, setFlaskColor] = useState('transparent');
  const [phValue, setPhValue] = useState(1.2);
  const [titrationComplete, setTitrationComplete] = useState(false);
  const [stirring, setStirring] = useState(true);

  // LIMIT TEST STATES
  const [sampleAdded, setSampleAdded] = useState(false);
  const [reagentAdded, setReagentAdded] = useState(false);
  const [turbidityTime, setTurbidityTime] = useState(0);
  const [limitTestDone, setLimitTestDone] = useState(false);

  // DT TEST STATES
  const [temp, setTemp] = useState(25); // Celsius
  const [dtRunning, setDtRunning] = useState(false);
  const [dtTimer, setDtTimer] = useState(0); // seconds
  const [tabletsDisintegrated, setTabletsDisintegrated] = useState(0);

  // Titration Calculation & Color logic
  useEffect(() => {
    // Equivalence point at 20.0 mL of 0.1M NaOH added to 20 mL 0.1M HCl
    if (buretteVolume < 19.5) {
      setFlaskColor('bg-cyan-50/20');
      // pH calculation before equivalence point
      const remH = (20 * 0.1 - buretteVolume * 0.1) / (20 + buretteVolume);
      const calculatedPh = remH > 0 ? -Math.log10(remH) : 7.0;
      setPhValue(calculatedPh.toFixed(2));
      setTitrationComplete(false);
    } else if (buretteVolume >= 19.5 && buretteVolume <= 20.2) {
      setFlaskColor('bg-pink-300/80'); // Pale permanent pink end point!
      setPhValue(8.3);
      setTitrationComplete(true);
    } else {
      setFlaskColor('bg-pink-500'); // Deep magenta over-titrated!
      setPhValue(11.5);
      setTitrationComplete(true);
    }
  }, [buretteVolume]);

  // DT Test Timer loop
  useEffect(() => {
    let interval = null;
    if (dtRunning) {
      interval = setInterval(() => {
        setDtTimer(prev => {
          const next = prev + 1;
          if (next >= 15 && tabletsDisintegrated < 6) {
            setTabletsDisintegrated(Math.min(6, Math.floor(next / 10)));
          }
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [dtRunning, tabletsDisintegrated]);

  // Titration Actions
  const addDrop = (amount) => {
    if (buretteVolume + amount <= 50) {
      setBuretteVolume(prev => parseFloat((prev + amount).toFixed(1)));
    }
  };

  const resetTitration = () => {
    setBuretteVolume(0.0);
    setFlaskColor('bg-cyan-50/20');
    setPhValue(1.2);
    setTitrationComplete(false);
  };

  // Limit Test Actions
  const runLimitTest = () => {
    setSampleAdded(true);
    setTimeout(() => setReagentAdded(true), 1000);
    setTimeout(() => {
      setTurbidityTime(5);
      setLimitTestDone(true);
    }, 2500);
  };

  const resetLimitTest = () => {
    setSampleAdded(false);
    setReagentAdded(false);
    setTurbidityTime(0);
    setLimitTestDone(false);
  };

  return (
    <div className="min-h-screen bg-background text-text-main pb-24">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-indigo-950 via-slate-900 to-background text-white pt-12 pb-12 px-6 lg:px-12 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-cyan-400" /> PCI Curriculum Interactive Virtual Pharmacy Lab
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Virtual Pharmaceutical Laboratory Simulator
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            Perform real-time B.Pharm practical experiments: Volumetric Acid-Base Titration, Pharmacopoeial Limit Test for Chloride (IP/BP), and Tablet Disintegration Time (DT) testing with animated apparatus and calculations.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-8 space-y-8">

        {/* EXPERIMENT SELECTOR TABS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveExp('titration')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeExp === 'titration'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            <FlaskConical className="w-5 h-5 mb-2 text-cyan-300" />
            <span className="font-extrabold text-xs block">1. Volumetric Titration</span>
            <span className="text-[10px] opacity-80 block">Assay of HCl using 0.1M NaOH</span>
          </button>

          <button
            onClick={() => setActiveExp('limit_test')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeExp === 'limit_test'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            <Beaker className="w-5 h-5 mb-2 text-teal-300" />
            <span className="font-extrabold text-xs block">2. Limit Test for Chloride</span>
            <span className="text-[10px] opacity-80 block">AgNO3 Opalescence IP Standard</span>
          </button>

          <button
            onClick={() => setActiveExp('dt_test')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeExp === 'dt_test'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            <Clock className="w-5 h-5 mb-2 text-amber-300" />
            <span className="font-extrabold text-xs block">3. Tablet DT Apparatus</span>
            <span className="text-[10px] opacity-80 block">Disintegration Time (37°C)</span>
          </button>

          <button
            onClick={() => setActiveExp('syrup')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeExp === 'syrup'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
            }`}
          >
            <Droplet className="w-5 h-5 mb-2 text-rose-300" />
            <span className="font-extrabold text-xs block">4. Simple Syrup IP</span>
            <span className="text-[11px] opacity-80 block">66.7% w/w Sucrose Monograph</span>
          </button>
        </div>

        {/* EXPERIMENT 1: VOLUMETRIC TITRATION */}
        {activeExp === 'titration' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* APPARATUS CANVAS SIMULATOR */}
            <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-cyan-400">APPARATUS: BURETTE & ERLENMEYER FLASK</span>
                <span className="text-xs font-mono bg-slate-800 text-emerald-400 px-3 py-1 rounded-full border border-slate-700">
                  pH Level: {phValue}
                </span>
              </div>

              {/* Graphical Burette & Flask Simulation */}
              <div className="relative my-8 flex flex-col items-center justify-center">
                
                {/* Stand & Clamp */}
                <div className="absolute -left-12 top-0 bottom-0 w-3 bg-slate-700 rounded-full"></div>
                <div className="absolute -left-12 top-16 w-16 h-2 bg-slate-600"></div>

                {/* Burette Tube */}
                <div className="w-8 h-56 bg-slate-800/90 border-2 border-slate-500 rounded-t-lg relative flex flex-col justify-end overflow-hidden shadow-inner">
                  {/* Titrant Liquid in Burette */}
                  <div
                    style={{ height: `${Math.max(0, 100 - (buretteVolume / 50) * 100)}%` }}
                    className="w-full bg-cyan-400/60 transition-all duration-300"
                  ></div>
                  <div className="absolute right-1 top-2 text-[9px] font-mono text-slate-400">0 mL</div>
                  <div className="absolute right-1 bottom-2 text-[9px] font-mono text-slate-400">50 mL</div>
                </div>

                {/* Stopcock Valve */}
                <div className="w-4 h-6 bg-amber-500 my-1 rounded flex items-center justify-center cursor-pointer hover:bg-amber-400">
                  <div className="w-6 h-1 bg-slate-900 rounded"></div>
                </div>

                {/* Falling Drops Stream */}
                {buretteVolume > 0 && buretteVolume < 50 && (
                  <div className="w-1 h-8 bg-cyan-400 animate-pulse my-1 rounded-full"></div>
                )}

                {/* Erlenmeyer Flask */}
                <div className="relative mt-2">
                  <div className="w-32 h-36 bg-slate-800/60 border-2 border-slate-400 rounded-b-full rounded-t-lg flex items-end justify-center overflow-hidden p-2 relative shadow-lg">
                    {/* Liquid inside Flask */}
                    <div
                      className={`w-full h-24 ${flaskColor} transition-colors duration-500 rounded-b-full flex items-center justify-center relative`}
                    >
                      {stirring && (
                        <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block text-center mt-2">20 mL 0.1M HCl + Phenolphthalein</span>
                </div>
              </div>

              {/* End Point Alert Banner */}
              {titrationComplete && (
                <div className="w-full bg-emerald-950 border border-emerald-500/60 p-4 rounded-2xl text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span><strong>End Point Achieved!</strong> Permanent pale pink color reached at {buretteVolume} mL 0.1M NaOH.</span>
                  </div>
                  <span className="font-mono font-bold bg-emerald-900 px-3 py-1 rounded-lg">Assay: 99.8% Purity</span>
                </div>
              )}
            </div>

            {/* CONTROLS & CALCULATIONS */}
            <div className="space-y-6">
              
              {/* Titrant Control Buttons */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Play className="w-4 h-4 text-indigo-600" />
                  Burette Valve Controls
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
                    <span>Volume Added:</span>
                    <span className="font-mono text-indigo-600 text-sm">{buretteVolume.toFixed(1)} / 50.0 mL</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(buretteVolume / 50) * 100}%` }}
                      className="bg-indigo-600 h-full transition-all"
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => addDrop(0.1)}
                    disabled={buretteVolume >= 50}
                    className="py-3 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                  >
                    + Add 0.1 mL Dropwise
                  </button>

                  <button
                    onClick={() => addDrop(1.0)}
                    disabled={buretteVolume >= 50}
                    className="py-3 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
                  >
                    + Add 1.0 mL Stream
                  </button>
                </div>

                <button
                  onClick={resetTitration}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Experiment
                </button>
              </div>

              {/* Titration Principle & Formula Card */}
              <div className="bg-indigo-950 text-white p-6 rounded-3xl border border-indigo-900 shadow-md space-y-3">
                <h4 className="font-bold text-sm text-cyan-300 font-mono">Assay Calculation Formula:</h4>
                <div className="bg-slate-900 p-4 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 space-y-2">
                  <p>M₁ × V₁ (HCl) = M₂ × V₂ (NaOH)</p>
                  <p className="text-emerald-400">• M₁ = (0.1M × {buretteVolume} mL) / 20.0 mL</p>
                  <p className="text-cyan-300">• Calculated HCl Molarity: <strong>{(0.1 * buretteVolume / 20).toFixed(4)} M</strong></p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* EXPERIMENT 2: LIMIT TEST FOR CHLORIDE */}
        {activeExp === 'limit_test' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[480px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-teal-400">IP STANDARD: LIMIT TEST FOR CHLORIDE</span>
                <span className="text-xs font-mono text-slate-400">Reagent: AgNO₃ + HNO₃</span>
              </div>

              {/* Nessler Cylinders Graphic */}
              <div className="flex items-center justify-around my-8">
                
                {/* Cylinder A: Test Solution */}
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-xs font-bold text-slate-300">Cylinder A (Test Solution)</span>
                  <div className="w-20 h-56 bg-slate-800 border-2 border-slate-500 rounded-b-2xl relative flex flex-col justify-end p-1 overflow-hidden shadow-xl">
                    <div
                      className={`w-full transition-all duration-700 ${
                        reagentAdded ? 'h-36 bg-slate-300/40 blur-sm' : (sampleAdded ? 'h-36 bg-cyan-900/40' : 'h-0')
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Test Sample + Dilute HNO₃</span>
                </div>

                {/* Cylinder B: Standard Solution */}
                <div className="flex flex-col items-center space-y-3">
                  <span className="text-xs font-bold text-teal-400">Cylinder B (Standard 10ppm Cl⁻)</span>
                  <div className="w-20 h-56 bg-slate-800 border-2 border-teal-500 rounded-b-2xl relative flex flex-col justify-end p-1 overflow-hidden shadow-xl">
                    <div
                      className={`w-full transition-all duration-700 ${
                        reagentAdded ? 'h-36 bg-slate-200/60 blur-md' : (sampleAdded ? 'h-36 bg-teal-900/40' : 'h-0')
                      }`}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono text-teal-300">Standard Solution (10 ppm)</span>
                </div>

              </div>

              {/* Result Comparison */}
              {limitTestDone && (
                <div className="bg-emerald-950 border border-emerald-600 p-4 rounded-2xl text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span><strong>Limit Test PASSES IP Standard:</strong> Test opalescence is LESS than standard solution!</span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-900">Limit Test Controls</h3>
                <button
                  onClick={runLimitTest}
                  disabled={limitTestDone}
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Run Chloride Reaction (AgNO₃)</span>
                </button>

                <button
                  onClick={resetLimitTest}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Cylinders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EXPERIMENT 3: TABLET DISINTEGRATION TIME (DT) APPARATUS */}
        {activeExp === 'dt_test' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[480px]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-amber-400">TABLET DISINTEGRATION TEST APPARATUS (IP)</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5" /> Temp: 37°C ± 2°C
                </span>
              </div>

              <div className="flex flex-col items-center justify-center my-8 space-y-4">
                {/* Oscillating Basket Assembly */}
                <div className={`w-40 h-44 bg-slate-800 border-2 border-amber-500 rounded-b-xl relative p-4 flex items-center justify-around ${dtRunning ? 'animate-bounce' : ''}`}>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {[1, 2, 3, 4, 5, 6].map(t => (
                      <div
                        key={t}
                        className={`w-6 h-6 rounded-full border border-amber-300 flex items-center justify-center text-[9px] font-bold ${
                          t <= tabletsDisintegrated ? 'bg-transparent text-slate-600 border-slate-700' : 'bg-amber-400 text-amber-950'
                        }`}
                      >
                        {t <= tabletsDisintegrated ? '✓' : 'T'}
                      </div>
                    ))}
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">Basket Rack Assembly (30 cycles/min)</span>
              </div>

              <div className="bg-slate-800 p-4 rounded-2xl text-xs flex justify-between font-mono">
                <span>Timer: <strong>{dtTimer} seconds</strong></span>
                <span>Disintegrated: <strong>{tabletsDisintegrated} / 6 Tablets</strong></span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <h3 className="text-base font-bold text-slate-900">DT Apparatus Controls</h3>
                <button
                  onClick={() => setDtRunning(!dtRunning)}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>{dtRunning ? 'Pause Oscillation' : 'Start DT Oscillation'}</span>
                </button>

                <button
                  onClick={() => { setDtRunning(false); setDtTimer(0); setTabletsDisintegrated(0); }}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Apparatus
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EXPERIMENT 4: SIMPLE SYRUP IP */}
        {activeExp === 'syrup' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-rose-600" />
              Preparation of Simple Syrup IP (66.7% w/w Sucrose)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simple Syrup IP is a concentrated aqueous solution of sucrose (66.7% w/w) having a high osmotic pressure that prevents microbial growth without added preservatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <strong className="text-indigo-900 block mb-1">Sucrose (Purified):</strong>
                <span>667 grams</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <strong className="text-indigo-900 block mb-1">Purified Water q.s.:</strong>
                <span>1000 grams</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <strong className="text-indigo-900 block mb-1">Specific Gravity:</strong>
                <span>1.313 g/mL (at 20°C)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
