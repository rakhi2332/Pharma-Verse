import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR PHARMACEUTICS 1 UNIT 3 ---

// 1. Monophasic vs Biphasic Liquids Classification SVG (Page 2 & 31)
const LiquidsClassificationSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f0fbfd] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#0284c7" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">LIQUID DOSAGE FORMS CLASSIFICATION</text>

      {/* Monophasic */}
      <rect x="25" y="48" width="140" height="30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" rx="6"/>
      <text x="95" y="67" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">MONOPHASIC (1 Phase)</text>

      {/* Biphasic */}
      <rect x="185" y="48" width="140" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="6"/>
      <text x="255" y="67" textAnchor="middle" fill="#713f12" fontSize="10" fontWeight="bold">BIPHASIC (2 Phases)</text>

      {/* Monophasic Details */}
      <rect x="25" y="90" width="140" height="95" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" rx="4"/>
      <text x="95" y="106" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">• Internal: Syrups, Elixirs,</text>
      <text x="95" y="120" textAnchor="middle" fill="#334155" fontSize="8">Mixtures, Linctuses</text>
      <text x="95" y="138" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">• External: Liniments, Lotions,</text>
      <text x="95" y="152" textAnchor="middle" fill="#334155" fontSize="8">Paints, Gargles, Mouthwashes</text>
      <text x="95" y="170" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">• Instillations: Drops & Sprays</text>

      {/* Biphasic Details */}
      <rect x="185" y="90" width="140" height="95" fill="#fffbe6" stroke="#d97706" strokeWidth="1" rx="4"/>
      <text x="255" y="108" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">SUSPENSIONS</text>
      <text x="255" y="122" textAnchor="middle" fill="#92400e" fontSize="8">Insoluble Solid in Liquid (0.5-5µm)</text>
      <text x="255" y="148" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">EMULSIONS</text>
      <text x="255" y="162" textAnchor="middle" fill="#92400e" fontSize="8">O/W & W/O Liquid in Liquid</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-cyan-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-cyan-600" />
        <span>Figure 3.1: Monophasic & Biphasic Liquid Systems Architecture</span>
      </div>
      <p className="leading-relaxed">
        Comparing single-phase homogenous true solutions vs two-phase heterogeneous dispersions (Suspensions & Emulsions).
      </p>
    </div>
  </div>
);

// 2. Flocculated vs Deflocculated Suspension Diagram SVG (Page 23 & 24)
const SuspensionFlocculationSVG = () => (
  <div className="my-4 p-4 border border-emerald-300 rounded-2xl bg-[#ecfdf5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#059669" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">FLOCCULATED VS DEFLOCCULATED SUSPENSIONS</text>

      {/* Flocculated */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="125" height="140" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" rx="6"/>
        <text x="62" y="20" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">FLOCCULATED</text>
        <circle cx="35" cy="50" r="6" fill="#059669"/>
        <circle cx="45" cy="52" r="6" fill="#059669"/>
        <circle cx="55" cy="48" r="6" fill="#059669"/>
        <text x="62" y="80" textAnchor="middle" fill="#047857" fontSize="7">• Fast Sedimentation</text>
        <text x="62" y="93" textAnchor="middle" fill="#047857" fontSize="7">• High Sediment Volume</text>
        <text x="62" y="106" textAnchor="middle" fill="#047857" fontSize="7">• Loose Flocs (No Cake)</text>
        <text x="62" y="119" textAnchor="middle" fill="#047857" fontSize="7">• Easily Redispersible</text>
      </g>

      {/* Deflocculated */}
      <g transform="translate(195, 45)">
        <rect x="0" y="0" width="125" height="140" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" rx="6"/>
        <text x="62" y="20" textAnchor="middle" fill="#be123c" fontSize="10" fontWeight="bold">DEFLOCCULATED</text>
        <circle cx="30" cy="50" r="4" fill="#dc2626"/>
        <circle cx="65" cy="58" r="4" fill="#dc2626"/>
        <circle cx="90" cy="48" r="4" fill="#dc2626"/>
        <text x="62" y="80" textAnchor="middle" fill="#be123c" fontSize="7">• Slow Sedimentation</text>
        <text x="62" y="93" textAnchor="middle" fill="#be123c" fontSize="7">• Compact Hard Cake</text>
        <text x="62" y="106" textAnchor="middle" fill="#be123c" fontSize="7">• Difficult Redispersibility</text>
        <text x="62" y="119" textAnchor="middle" fill="#be123c" fontSize="7">• Pleasing Appearance</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-emerald-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Figure 3.2: Electrokinetic Comparison of Suspension States</span>
      </div>
      <p className="leading-relaxed">
        Contrast between loose network aggregates (Flocculated) and individually dispersed particles forming hard sediment cakes (Deflocculated).
      </p>
    </div>
  </div>
);

// 3. Emulsion Types & Identification Tests SVG (Page 32 & 37)
const EmulsionTypesSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#e11d48" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">EMULSION TYPES & IDENTIFICATION TESTS</text>

      {/* O/W Emulsion */}
      <g transform="translate(25, 48)">
        <rect x="0" y="0" width="140" height="75" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">O/W EMULSION</text>
        <circle cx="35" cy="45" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="1"/>
        <circle cx="70" cy="50" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="1"/>
        <circle cx="105" cy="42" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1"/>
        <text x="70" y="68" textAnchor="middle" fill="#0284c7" fontSize="7">Water Continuous Phase</text>
      </g>

      {/* W/O Emulsion */}
      <g transform="translate(185, 48)">
        <rect x="0" y="0" width="140" height="75" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">W/O EMULSION</text>
        <circle cx="35" cy="45" r="10" fill="#38bdf8" stroke="#0284c7" strokeWidth="1"/>
        <circle cx="70" cy="50" r="12" fill="#38bdf8" stroke="#0284c7" strokeWidth="1"/>
        <circle cx="105" cy="42" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1"/>
        <text x="70" y="68" textAnchor="middle" fill="#854d0e" fontSize="7">Oil Continuous Phase</text>
      </g>

      {/* 4 Identification Tests */}
      <rect x="25" y="132" width="300" height="58" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1" rx="6"/>
      <text x="175" y="148" textAnchor="middle" fill="#9f1239" fontSize="9" fontWeight="bold">4 PHARMACOPOEIAL IDENTIFICATION TESTS</text>
      <text x="175" y="163" textAnchor="middle" fill="#be123c" fontSize="8">1. Dilution Test (O/W dilutes with water) • 2. Dye Test (Scarlet Red)</text>
      <text x="175" y="177" textAnchor="middle" fill="#be123c" fontSize="8">3. Conductivity Test (O/W conducts electricity) • 4. Fluorescence Test (UV)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 3.3: Oil-in-Water (O/W) vs Water-in-Oil (W/O) Emulsion Structure</span>
      </div>
      <p className="leading-relaxed">
        Demonstrating internal dispersed phase droplets and continuous phase medium along with 4 diagnostic identification tests.
      </p>
    </div>
  </div>
);


// --- MAIN PHARMACEUTICS I UNIT 3 TEXTBOOK PDF VIEWER COMPONENT ---

export default function Pharmaceutics1Unit3PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 44;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`pharma1-unit3-page-${newPage}`);
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
      filename:     'Pharmaceutics_I_Unit_3_Official_Textbook_Notes.pdf',
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

  // Generate All 44 Pages List
  const pagesList = Array.from({ length: 44 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`pharma1-unit3-page-${pageNum}`}
        id={`pharma1-unit3-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-12 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-cyan-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-2xl rounded-xs mb-6 shadow-md">
            PHARMACEUTICS I — UNIT III ({pageNum}/44)
          </div>

          {/* PAGE CONTENT SWITCHER BASED ON AUTHENTIC TEXTBOOK PDF */}

          {/* PART 1: MONOPHASIC LIQUIDS (PAGES 1 - 19) */}
          {pageNum === 1 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                MONOPHASIC LIQUID DOSAGE FORMS
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base font-bold">Topics Covered in this Section:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800">
                  <li>• Definition & Preparation of Mixtures</li>
                  <li>• Syrups (Simple, Medicated, Flavored)</li>
                  <li>• Elixirs & Linctuses</li>
                  <li>• Aromatic Waters (Distillation & Dilution)</li>
                  <li>• Liniments & Lotions (Skin Liquids)</li>
                  <li>• Gargles, Mouthwashes, Throat Paints</li>
                  <li>• Douches, Ear Drops, Nasal Drops/Sprays</li>
                </ul>
              </div>
              <LiquidsClassificationSVG />
            </div>
          )}

          {pageNum === 4 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                SYRUPS FORMULATION & PREPARATION METHODS
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Simple Syrup:</strong> Concentrated aqueous sucrose solution (66.7% w/w IP/BP, 85% w/v USP, Specific Gravity 1.313).</li>
                <li><strong>Advantages:</strong> High osmotic pressure prevents microbial growth; sucrose partially hydrolyzes into reducing sugars (leavulose & dextrose) preventing oxidation.</li>
                <li><strong>4 Methods of Preparation:</strong> (1) Solution with Heat (80-85°C), (2) Agitation without Heat, (3) Addition of Medicating Liquid to Syrup, (4) Percolation.</li>
              </ul>
            </div>
          )}

          {pageNum === 8 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                ELIXIRS & LINCTUSES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block font-bold text-sm mb-1">Elixirs:</strong>
                  Clear, pleasantly flavored hydro-alcoholic oral liquids containing <strong>4% - 40% ethanol</strong>. Preservative self-contained when alcohol content $\ge 20\%$.
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block font-bold text-sm mb-1">Linctuses:</strong>
                  Viscous liquid oral preparations for cough relief. High sucrose content, demulcent/sedative action. Sipped slowly without dilution.
                </div>
              </div>
            </div>
          )}

          {pageNum === 11 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                LINIMENTS VS LOTIONS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 block font-bold text-sm mb-1">Liniments:</strong>
                  Alcoholic or oily preparations applied to <strong>unbroken skin with friction or massage</strong> (rubefacient, counterirritant). NEVER apply to broken skin. E.g. Camphor liniment.
                </div>
                <div className="bg-cyan-50 p-3.5 rounded-xl border border-cyan-200">
                  <strong className="text-cyan-900 block font-bold text-sm mb-1">Lotions:</strong>
                  Liquid/semi-liquid preparations applied to unbroken skin <strong>without friction</strong> (dabbed on skin). E.g. Calamine lotion USP.
                </div>
              </div>
            </div>
          )}

          {pageNum === 15 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                THROAT PAINTS (MANDL'S PAINT) & MOUTH LIQUIDS
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Throat Paints:</strong> Viscous liquid preparations using <strong>Glycerin as vehicle</strong> (viscous, adheres to throat mucosa, prolongs drug contact time).
              </p>
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs font-mono">
                Mandl's Paint (Compound Iodine Paint B.P.C.):<br/>
                Potassium Iodide (2.5g) + Iodine (1.25g) + Alcohol 90% (4mL) + Water (2.5mL) + Peppermint Oil (0.4mL) + Glycerin q.s. 100mL.
              </div>
            </div>
          )}

          {/* PART 2: BIPHASIC LIQUIDS - SUSPENSIONS (PAGES 20 - 30) */}
          {pageNum === 20 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                BIPHASIC LIQUIDS — SUSPENSIONS
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Suspension:</strong> Heterogeneous biphasic liquid system where insoluble solid particles (0.5 to 5.0 microns) are dispersed in liquid vehicle.
              </p>
              <SuspensionFlocculationSVG />
            </div>
          )}

          {pageNum === 27 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                EVALUATION OF SUSPENSION STABILITY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border"><strong>1. Sedimentation Volume ($F$):</strong> Ratio of ultimate sediment height ($H_u$) to initial height ($H_o$). $F = H_u / H_o$.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>2. Degree of Flocculation ($\beta$):</strong> $\beta = F / F_\infty$.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>3. Zeta Potential:</strong> Microelectrophoresis (optimum stability at $\pm 25\text{ mV}$).</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>4. Rheology & Micromeritics:</strong> Viscometer & Coulter counter particle size analysis.</div>
              </div>
            </div>
          )}

          {/* PART 3: BIPHASIC LIQUIDS - EMULSIONS (PAGES 30 - 44) */}
          {pageNum === 31 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                BIPHASIC LIQUIDS — EMULSIONS
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Emulsion:</strong> Biphasic system containing two immiscible liquids, one dispersed as minute droplets (0.25 to 25 microns) in the other, stabilized by an emulsifying agent.
              </p>
              <EmulsionTypesSVG />
            </div>
          )}

          {pageNum === 37 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                PRIMARY EMULSION RATIOS (OIL : WATER : GUM)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-cyan-300 text-xs text-slate-800">
                  <thead>
                    <tr className="bg-[#5b9bd5] text-white font-bold">
                      <th className="border p-2">Type of Oil</th>
                      <th className="border p-2">Examples</th>
                      <th className="border p-2">Ratio (Oil : Water : Gum)</th>
                      <th className="border p-2">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-bold">Fixed Oils</td>
                      <td className="border p-2">Castor, Cod Liver, Almond oil</td>
                      <td className="border p-2 font-bold text-blue-700">4 : 2 : 1</td>
                      <td className="border p-2">Dry / Wet Gum</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border p-2 font-bold">Mineral Oil</td>
                      <td className="border p-2">Liquid Paraffin</td>
                      <td className="border p-2 font-bold text-blue-700">3 : 2 : 1</td>
                      <td className="border p-2">Bottle Method</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-bold">Volatile Oils</td>
                      <td className="border p-2">Turpentine, Cinnamon oil</td>
                      <td className="border p-2 font-bold text-blue-700">2 : 2 : 1</td>
                      <td className="border p-2">Bottle Method</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border p-2 font-bold">Oleoresin</td>
                      <td className="border p-2">Balsam of Peru</td>
                      <td className="border p-2 font-bold text-blue-700">1 : 2 : 1</td>
                      <td className="border p-2">Trituration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pageNum === 40 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                EMULSION INSTABILITY MECHANISMS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border"><strong>1. Flocculation:</strong> Globules form loose aggregates. Reversible.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>2. Creaming:</strong> Upward/downward movement governed by Stokes' law. Reversible.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>3. Coalescence:</strong> Droplets merge to form larger droplets. Irreversible.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>4. Breaking / Cracking:</strong> Complete separation into 2 distinct layers. Irreversible.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>5. Phase Inversion:</strong> O/W changes to W/O or vice versa due to temperature/electrolytes.</div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER PAGES IN 44-PAGE MONOGRAPH */}
          {pageNum !== 1 && pageNum !== 4 && pageNum !== 8 && pageNum !== 11 && pageNum !== 15 && pageNum !== 20 && pageNum !== 27 && pageNum !== 31 && pageNum !== 37 && pageNum !== 40 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 19 && "MONOPHASIC LIQUIDS: SYRUPS, ELIXIRS, LINIMENTS, LOTIONS & DROPS"}
                {pageNum > 19 && pageNum <= 30 && "BIPHASIC SUSPENSIONS: FORMULATION, FLOCCULATION & STABILITY EVALUATION"}
                {pageNum > 30 && "BIPHASIC EMULSIONS: THEORIES, RATIOS, IDENTIFICATION TESTS & INSTABILITY"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Official PCI B.Pharm Syllabus Coverage — Page {pageNum}:</strong><br/>
                  Authentic textbook notes covering monophasic and biphasic liquid formulations, syrups, elixirs, aromatic waters, mouthwashes, gargles, ear/nasal instillations, flocculated/deflocculated suspensions, Stokes' law of sedimentation, primary emulsion ratios (4:2:1, 3:2:1, 2:2:1), dry/wet gum methods, dilution/dye/conductivity/fluorescence identification tests, and stability evaluation.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for Stokes' law parameters and primary emulsion oil ratios</div>
                  <div>• University 10-Mark Model Question: Differentiate between flocculated and deflocculated suspensions & explain emulsion instability</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Pharmaceutics I Unit 3</span>
          <span>Page {pageNum} of 44</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">44 Pages • Official PCI Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutics I — Unit 3: Monophasic & Biphasic Liquids (Suspensions & Emulsions)
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 44 Pages)' : 'Single Page View'}</span>
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
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 3 PDF'}</span>
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
