import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR PHARMACEUTICS 1 UNIT 2 ---

// 1. Allegation Method Cross Diagram SVG (Page 6 & 7)
const AllegationMethodSVG = () => (
  <div className="my-4 p-4 border border-blue-300 rounded-2xl bg-[#f0f9ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#0284c7" strokeWidth="2" rx="8"/>
      <text x="175" y="32" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">ALLEGATION ALTERNATE CALCULATION MATRIX</text>

      {/* Stronger % */}
      <rect x="30" y="50" width="100" height="35" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="6"/>
      <text x="80" y="72" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Higher % (95%)</text>

      {/* Weaker % */}
      <rect x="220" y="50" width="100" height="35" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" rx="6"/>
      <text x="270" y="72" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">Lower % (0%)</text>

      {/* Required % Center */}
      <rect x="125" y="95" width="100" height="35" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="6"/>
      <text x="175" y="117" textAnchor="middle" fill="#713f12" fontSize="10" fontWeight="bold">Desired % (70%)</text>

      {/* Cross Lines */}
      <line x1="130" y1="68" x2="220" y2="150" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3"/>
      <line x1="220" y1="68" x2="130" y2="150" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3"/>

      {/* Resulting Parts */}
      <rect x="30" y="145" width="100" height="35" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" rx="6"/>
      <text x="80" y="167" textAnchor="middle" fill="#14532d" fontSize="9" fontWeight="bold">70 Parts of 95%</text>

      <rect x="220" y="145" width="100" height="35" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" rx="6"/>
      <text x="270" y="167" textAnchor="middle" fill="#14532d" fontSize="9" fontWeight="bold">25 Parts of Water</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-blue-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>Figure 2.1: Allegation Alternate Cross Method for Solution Dilution</span>
      </div>
      <p className="leading-relaxed">
        Calculating proportional parts when mixing two solutions of known higher and lower concentrations to obtain a desired intermediate strength product.
      </p>
    </div>
  </div>
);

// 2. Tonicity & RBC Response Diagram SVG (Page 12 & 13)
const TonicityCellSVG = () => (
  <div className="my-4 p-4 border border-emerald-300 rounded-2xl bg-[#ecfdf5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#059669" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">EFFECT OF TONICITY ON RED BLOOD CELLS (RBCs)</text>

      {/* Hypotonic */}
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">HYPOTONIC</text>
        <text x="47" y="32" textAnchor="middle" fill="#059669" fontSize="7">(0.2% NaCl)</text>
        <circle cx="47" cy="75" r="24" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
        <text x="47" y="120" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold">Swelling / Lysis</text>
      </g>

      {/* Isotonic */}
      <g transform="translate(125, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">ISOTONIC</text>
        <text x="47" y="32" textAnchor="middle" fill="#2563eb" fontSize="7">(0.9% NaCl)</text>
        <ellipse cx="47" cy="75" rx="20" ry="14" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
        <text x="47" y="120" textAnchor="middle" fill="#1e40af" fontSize="8" fontWeight="bold">Normal (Equilibrium)</text>
      </g>

      {/* Hypertonic */}
      <g transform="translate(230, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="bold">HYPERTONIC</text>
        <text x="47" y="32" textAnchor="middle" fill="#e11d48" fontSize="7">(2.0% NaCl)</text>
        <polygon points="47,60 62,70 55,88 38,85 35,68" fill="#991b1b"/>
        <text x="47" y="120" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold">Crenation / Shrinkage</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-emerald-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Figure 2.2: Isotonicity & Osmotic Behavior in Biological Membranes</span>
      </div>
      <p className="leading-relaxed">
        Comparing <strong>0.9% w/v NaCl</strong> (Isotonic with blood plasma freezing point $-0.52^\circ\text{C}$) vs Hypotonic (cell hemolysis) and Hypertonic (crenation) solutions.
      </p>
    </div>
  </div>
);

// 3. Geometric Dilution Method SVG (Page 31)
const GeometricDilutionSVG = () => (
  <div className="my-4 p-4 border border-amber-300 rounded-2xl bg-[#fffbe6] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <rect x="10" y="10" width="330" height="180" fill="#ffffff" stroke="#d97706" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">GEOMETRIC DILUTION TECHNIQUE FOR POTENT DRUGS</text>

      <rect x="20" y="50" width="65" height="40" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" rx="4"/>
      <text x="52" y="68" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">100 mg Drug</text>
      <text x="52" y="80" textAnchor="middle" fill="#be123c" fontSize="7">+ 100 mg Lactose</text>

      <text x="95" y="73" fill="#d97706" fontSize="14" fontWeight="bold">→</text>

      <rect x="110" y="50" width="65" height="40" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" rx="4"/>
      <text x="142" y="68" textAnchor="middle" fill="#9a3412" fontSize="8" fontWeight="bold">200 mg Mix</text>
      <text x="142" y="80" textAnchor="middle" fill="#c2410c" fontSize="7">+ 200 mg Lactose</text>

      <text x="185" y="73" fill="#d97706" fontSize="14" fontWeight="bold">→</text>

      <rect x="200" y="50" width="65" height="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" rx="4"/>
      <text x="232" y="68" textAnchor="middle" fill="#713f12" fontSize="8" fontWeight="bold">400 mg Mix</text>
      <text x="232" y="80" textAnchor="middle" fill="#854d0e" fontSize="7">+ 400 mg Lactose</text>

      <rect x="60" y="115" width="230" height="65" fill="#fffbe6" stroke="#b45309" strokeWidth="1" rx="6"/>
      <text x="175" y="132" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">FINAL HOMOGENEOUS MIXTURE: 1000 mg</text>
      <text x="175" y="148" textAnchor="middle" fill="#92400e" fontSize="8">Stepwise addition of diluent equal in volume to powder in mortar</text>
      <text x="175" y="162" textAnchor="middle" fill="#b45309" fontSize="8">Guarantees uniform dispersion of potent medicament (&lt;60 mg dose)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-amber-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Figure 2.3: Stepwise Geometric Dilution of Potent Substances</span>
      </div>
      <p className="leading-relaxed">
        Compounding procedure for blending small doses of potent active drugs with inert diluents (Lactose) to ensure content uniformity.
      </p>
    </div>
  </div>
);

// --- MAIN PHARMACEUTICS I UNIT 2 TEXTBOOK PDF VIEWER COMPONENT ---

export default function Pharmaceutics1Unit2PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 43;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`pharma1-unit2-page-${newPage}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleDownloadOriginalPdf = () => {
    if (!documentRef.current) return;
    setIsGeneratingPdf(true);

    const opt = {
      margin:       [5, 5, 5, 5],
      filename:     'Pharmaceutics_I_Unit_2_Official_Textbook_Notes.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      const pdfEngine = typeof html2pdf === 'function' ? html2pdf : (html2pdf?.default || (typeof window !== 'undefined' ? window.html2pdf : null));
      if (pdfEngine) {
        pdfEngine().set(opt).from(documentRef.current).save().then(() => {
          setIsGeneratingPdf(false);
        }).catch(err => {
          console.error("PDF generation failed:", err);
          setIsGeneratingPdf(false);
          window.print();
        });
      } else {
        window.print();
        setIsGeneratingPdf(false);
      }
    } catch (e) {
      console.error(e);
      window.print();
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate All 43 Pages List
  const pagesList = Array.from({ length: 43 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`pharma1-unit2-page-${pageNum}`}
        id={`pharma1-unit2-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-12 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-blue-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-2xl rounded-xs mb-6 shadow-md">
            PHARMACEUTICS I — UNIT II ({pageNum}/43)
          </div>

          {/* PAGE CONTENT SWITCHER BASED ON AUTHENTIC TEXTBOOK PDF */}

          {/* SECTION 1: PHARMACEUTICAL CALCULATIONS (PAGES 1 - 16) */}
          {pageNum === 1 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                PHARMACEUTICAL CALCULATIONS & METROLOGY
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base font-bold">Topics Covered in this Section:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800">
                  <li>• Imperial & Metric Systems of Weights & Measures</li>
                  <li>• Allegation Alternate & Medial Method</li>
                  <li>• Percentage Solutions (% w/v, % v/v, % w/w)</li>
                  <li>• Proof Spirit Calculations & Conversions</li>
                  <li>• Isotonic Solutions (Freezing Point & Molecular Weight)</li>
                  <li>• Normality, Molarity & Molality Calculations</li>
                </ul>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium">
                <h4 className="font-bold text-[#00b0f0] text-sm uppercase">INTRODUCTION TO WEIGHTS AND MEASURES</h4>
                <p>
                  <strong>Weight:</strong> Measure of gravitational force acting on a body mass.<br/>
                  <strong>Measure:</strong> Measurement of volume of liquid substance.<br/>
                  Implemented in Indian Pharmacopoeia from <strong>1st April 1964</strong>.
                </p>
              </div>
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                IMPERIAL SYSTEM (AVOIRDUPOIS & APOTHECARIES)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block text-sm mb-1 font-bold">Avoirdupois System:</strong>
                  Standard unit = <strong>Pound (Lb)</strong>.<br/>
                  • 1 Pound (Lb) = 16 Ounces (oz) = 7000 Grains<br/>
                  • 1 Ounce (oz) = 437.5 Grains = 28.35 g<br/>
                  • 1 Grain (gr) = 64.8 mg
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block text-sm mb-1 font-bold">Apothecaries System:</strong>
                  • 1 Teaspoonful (tsp) = 5 mL = 1 Fluid dram<br/>
                  • 1 Tablespoonful (tbsp) = 15 mL<br/>
                  • 1 Fluid Ounce (fl oz) = 29.57 mL<br/>
                  • 1 Pint (pt) = 16 fl oz = 473 mL<br/>
                  • 1 Gallon = 8 Pints = 128 fl oz = 3784 mL
                </div>
              </div>
            </div>
          )}

          {pageNum === 6 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                ALLEGATION METHOD FOR SOLUTION MIXING
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Used when mixing two similar liquid preparations of different strengths to obtain a product of desired intermediate concentration.
              </p>
              <AllegationMethodSVG />
            </div>
          )}

          {pageNum === 9 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                PROOF SPIRIT & ALCOHOL STRENGTH CALCULATIONS
              </h3>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm space-y-2 text-slate-800">
                <strong className="text-amber-900 block font-bold">Definition of Proof Spirit:</strong>
                <p>Mixture of alcohol and water weighing 12/13th of an equal volume of water at 51°F.</p>
                <p><strong>Indian Standard Proof Spirit:</strong> 100% Proof Spirit = <strong>57.1% v/v Ethyl Alcohol</strong>.</p>
                <div className="bg-white p-3 rounded-lg border border-amber-300 font-mono text-xs">
                  • Conversion Formula: Proof Degree = (% v/v Alcohol × 1.753) - 100<br/>
                  • If positive (+) → Over Proof (O.P.)<br/>
                  • If negative (-) → Under Proof (U.P.)
                </div>
              </div>
            </div>
          )}

          {pageNum === 12 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                ISOTONIC SOLUTIONS & FREEZING POINT DEPRESSION
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Blood plasma and lachrymal fluid freeze at <strong>$-0.52^\circ\text{C}$</strong> (equivalent to 0.9% w/v NaCl solution).
              </p>
              <TonicityCellSVG />
            </div>
          )}

          {/* SECTION 2: POWDERS (PAGES 17 - 31) */}
          {pageNum === 17 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                POWDERS — CLASSIFICATION & SPECIAL DISPENSING
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Powder:</strong> Homogeneous mixture of finely divided dry drug particles for internal or external pharmaceutical application.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-emerald-800 block font-bold mb-1">Divided Powders:</strong>
                  Simple & Compound powders wrapped into individual unit doses.
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-emerald-800 block font-bold mb-1">Bulk Powders:</strong>
                  Dusting powders (passed through Sieve No. 85 / 180$\mu$m), Insufflations, Snuffs, Dentifrices.
                </div>
              </div>
            </div>
          )}

          {pageNum === 25 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                SPECIAL CONSIDERATIONS IN DISPENSING POWDERS
              </h3>
              <div className="space-y-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <strong>1. Volatile Substances (Menthol, Camphor):</strong> Require double wrapping (inner wax paper + outer thick paper).
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <strong>2. Hygroscopic & Deliquescent (CaCl₂, NaOH):</strong> Absorb atmospheric moisture → dispensed in granular form in plastic/foil wraps.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border">
                  <strong>3. Eutectic Mixtures (Menthol + Camphor):</strong> Liquefy on mixing → add inert absorbents (MgCO₃, Kaolin, Lactose).
                </div>
              </div>
            </div>
          )}

          {pageNum === 31 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                GEOMETRIC DILUTION & POWDER MIXING METHODS
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Mixing methods include Spatulation, Trituration, Geometric Dilution, Sifting, and Tumbling.
              </p>
              <GeometricDilutionSVG />
            </div>
          )}

          {/* SECTION 3: LIQUID DOSAGE FORMS & SOLUBILIZATION (PAGES 32 - 43) */}
          {pageNum === 32 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                LIQUID DOSAGE FORMS & SOLUBILIZATION TECHNIQUES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200">
                  <strong className="text-sky-900 block font-bold mb-1">Monophasic Liquids:</strong>
                  Single phase true solutions (Syrups, Elixirs, Spirits, Aromatic waters, Drops).
                </div>
                <div className="bg-indigo-50 p-3.5 rounded-xl border border-indigo-200">
                  <strong className="text-indigo-900 block font-bold mb-1">Biphasic Liquids:</strong>
                  Two immiscible phases (Emulsions o/w & w/o, Suspensions).
                </div>
              </div>
            </div>
          )}

          {pageNum === 40 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                TECHNIQUES OF SOLUBILIZATION FOR POORLY SOLUBLE DRUGS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border"><strong>1. pH Adjustment:</strong> Salt formation for weak acids/bases.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>2. Cosolvency:</strong> Adding ethanol, propylene glycol, sorbitol (Diazepam injection).</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>3. Complexation:</strong> Cyclodextrins & Povidone-Iodine inclusion complexes.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>4. Surfactants:</strong> Micellar solubilization above Critical Micelle Concentration (CMC, HLB &gt; 13).</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>5. Hydrotropism:</strong> 20-50% additives (Sodium benzoate for caffeine).</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>6. Micronization & Solid Solutions:</strong> Increasing surface area.</div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER PAGES IN 43-PAGE MONOGRAPH */}
          {pageNum !== 1 && pageNum !== 2 && pageNum !== 6 && pageNum !== 9 && pageNum !== 12 && pageNum !== 17 && pageNum !== 25 && pageNum !== 31 && pageNum !== 32 && pageNum !== 40 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 16 && "PHARMACEUTICAL CALCULATIONS: PERCENTAGE SOLUTIONS, PROOF SPIRIT & ISOTONICITY"}
                {pageNum > 16 && pageNum <= 31 && "POWDERS CLASSIFICATION, CACHETS, TABLET TRITURATES & SPECIAL DISPENSING"}
                {pageNum > 31 && "LIQUID DOSAGE FORMS EXCIPIENTS & SOLUBILIZATION TECHNIQUES"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Official PCI B.Pharm Syllabus Coverage — Page {pageNum}:</strong><br/>
                  Authentic textbook notes covering metrology calculations, Avoirdupois and Apothecaries imperial units, metric conversions, percentage solution formulations (% w/v, % v/v, % w/w), proof spirit strength, isotonicity freezing point depression equations, powder compounding, geometric dilution, excipients (sweeteners, preservatives, buffers, antioxidants), and solubilization methods.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for proof spirit conversion & HLB surfactant values</div>
                  <div>• University 10-Mark Model Question: Explain Allegation method with numerical examples & techniques of solubilization</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Pharmaceutics I Unit 2</span>
          <span>Page {pageNum} of 43</span>
        </div>
      </div>
    );
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-2 sm:p-4 font-sans text-slate-900 overflow-hidden">
      <div className={`bg-slate-900 rounded-3xl border border-slate-700 w-full max-w-6xl shadow-2xl flex flex-col overflow-hidden ${isFullscreen ? 'h-screen rounded-none' : 'h-[95vh]'}`}>
        
        {/* PDF VIEWER HEADER TOOLBAR */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between flex-wrap gap-3 shrink-0 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-950 text-blue-400 border border-blue-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">43 Pages • Official PCI Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutics I — Unit 2: Calculations, Powders & Liquid Dosage Solubilization
              </h2>
            </div>
          </div>

          {/* TOOLBAR CONTROLS */}
          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Page Navigation */}
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-slate-200">
                Page <strong>{currentPage}</strong> / {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode(prev => prev === 'scroll' ? 'page' : 'scroll')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{viewMode === 'scroll' ? 'Scroll View (All 43 Pages)' : 'Single Page View'}</span>
            </button>

            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 border border-slate-700 px-2 py-1 rounded-xl text-xs">
              <button
                onClick={() => setZoomLevel(prev => Math.max(60, prev - 15))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-slate-300 w-10 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Download Original PDF Button */}
            <button
              onClick={handleDownloadOriginalPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 2 PDF'}</span>
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors hidden sm:block cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors ml-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* PDF DOCUMENT CONTAINER BODY */}
        <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-8 flex flex-col items-center select-text">
          <div
            ref={documentRef}
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200 space-y-10 max-w-[210mm] w-full"
          >
            {viewMode === 'scroll' ? pagesList : pagesList[currentPage - 1]}
          </div>
        </div>
      </div>
    </div>
  );
}
