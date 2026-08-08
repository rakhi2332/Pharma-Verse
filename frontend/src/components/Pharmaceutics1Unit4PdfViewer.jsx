import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR PHARMACEUTICS 1 UNIT 4 ---

// 1. Classification of Ointment & Semisolid Bases SVG (Page 6 & 7)
const SemisolidBasesClassificationSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#e11d48" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">CLASSIFICATION OF OINTMENT & SEMISOLID BASES</text>

      {/* 4 Base Boxes */}
      <g transform="translate(20, 48)">
        <rect x="0" y="0" width="140" height="60" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#881337" fontSize="9" fontWeight="bold">1. OLEAGINOUS BASES</text>
        <text x="70" y="35" textAnchor="middle" fill="#9f1239" fontSize="7">• Petrolatum (Yellow/White Soft Paraffin)</text>
        <text x="70" y="48" textAnchor="middle" fill="#9f1239" fontSize="7">• Hard Paraffin & Liquid Paraffin (Hydrocarbons)</text>
      </g>

      <g transform="translate(190, 48)">
        <rect x="0" y="0" width="140" height="60" fill="#fff7ed" stroke="#fb923c" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#7c2d12" fontSize="9" fontWeight="bold">2. ABSORPTION BASES</text>
        <text x="70" y="35" textAnchor="middle" fill="#c2410c" fontSize="7">• Wool Fat (Anhydrous Lanolin)</text>
        <text x="70" y="48" textAnchor="middle" fill="#c2410c" fontSize="7">• Hydrous Wool Fat (70% Fat + 30% Water)</text>
      </g>

      <g transform="translate(20, 120)">
        <rect x="0" y="0" width="140" height="60" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">3. EMULSION BASES</text>
        <text x="70" y="35" textAnchor="middle" fill="#047857" fontSize="7">• O/W Water Washable (Vanishing Creams)</text>
        <text x="70" y="48" textAnchor="middle" fill="#047857" fontSize="7">• W/O Emulsion Bases (Cold Creams)</text>
      </g>

      <g transform="translate(190, 120)">
        <rect x="0" y="0" width="140" height="60" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" rx="6"/>
        <text x="70" y="20" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">4. WATER SOLUBLE BASES</text>
        <text x="70" y="35" textAnchor="middle" fill="#1d4ed8" fontSize="7">• Polyethylene Glycols (PEG / Carbowaxes)</text>
        <text x="70" y="48" textAnchor="middle" fill="#1d4ed8" fontSize="7">• Tragacanth, Pectin, Macrogols</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 4.1: 4 Primary Categories of Ointment Vehicles</span>
      </div>
      <p className="leading-relaxed">
        Showing Oleaginous (greasy hydrocarbons), Absorption (lanolin), Emulsion (O/W & W/O creams), and Water-Soluble (grease-less PEGs).
      </p>
    </div>
  </div>
);

// 2. Suppository Types & Body Cavities SVG (Suppositories Page 3 & 6)
const SuppositoryTypesSVG = () => (
  <div className="my-4 p-4 border border-purple-300 rounded-2xl bg-[#faf5ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">TYPES OF SUPPOSITORIES & BODY ORIFICES</text>

      {/* Rectal */}
      <g transform="translate(25, 48)">
        <rect x="0" y="0" width="90" height="135" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" rx="6"/>
        <text x="45" y="20" textAnchor="middle" fill="#6b21a8" fontSize="9" fontWeight="bold">RECTAL</text>
        <path d="M 45 40 Q 60 70 45 90 Q 30 70 45 40 Z" fill="#c084fc"/>
        <text x="45" y="110" textAnchor="middle" fill="#7e22ce" fontSize="8" fontWeight="bold">Bullet / Tapered</text>
        <text x="45" y="122" textAnchor="middle" fill="#6b21a8" fontSize="7">1 - 2 g weight</text>
      </g>

      {/* Vaginal */}
      <g transform="translate(130, 48)">
        <rect x="0" y="0" width="90" height="135" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" rx="6"/>
        <text x="45" y="20" textAnchor="middle" fill="#be185d" fontSize="9" fontWeight="bold">VAGINAL</text>
        <ellipse cx="45" cy="65" rx="20" ry="25" fill="#f472b6"/>
        <text x="45" y="110" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">Globular / Ovoid</text>
        <text x="45" y="122" textAnchor="middle" fill="#be185d" fontSize="7">Pessaries (4 - 8 g)</text>
      </g>

      {/* Urethral */}
      <g transform="translate(235, 48)">
        <rect x="0" y="0" width="90" height="135" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="6"/>
        <text x="45" y="20" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">URETHRAL</text>
        <rect x="38" y="40" width="14" height="55" rx="7" fill="#38bdf8"/>
        <text x="45" y="110" textAnchor="middle" fill="#0284c7" fontSize="8" fontWeight="bold">Pencil Shaped</text>
        <text x="45" y="122" textAnchor="middle" fill="#0369a1" fontSize="7">Bougies (2 - 4 g)</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-purple-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span>Figure 4.2: Suppository Shapes, Routes & Orifice Specifications</span>
      </div>
      <p className="leading-relaxed">
        Comparing Rectal (1-2g bullet), Vaginal/Pessaries (4-8g globular), and Urethral/Bougies (2-4g pencil) designed to melt or dissolve at 37°C.
      </p>
    </div>
  </div>
);

// 3. Types of Incompatibilities SVG (Suppositories Page 18)
const IncompatibilityTypesSVG = () => (
  <div className="my-4 p-4 border border-indigo-300 rounded-2xl bg-[#eef2ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#4338ca" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#312e81" fontSize="11" fontWeight="bold">3 TYPES OF PHARMACEUTICAL INCOMPATIBILITIES</text>

      {/* Physical */}
      <g transform="translate(20, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">PHYSICAL</text>
        <text x="47" y="35" textAnchor="middle" fill="#059669" fontSize="7">• Immiscibility</text>
        <text x="47" y="50" textAnchor="middle" fill="#059669" fontSize="7">• Insolubility</text>
        <text x="47" y="65" textAnchor="middle" fill="#059669" fontSize="7">• Liquefaction (Eutexia)</text>
        <text x="47" y="80" textAnchor="middle" fill="#059669" fontSize="7">• Precipitation</text>
        <rect x="10" y="95" width="75" height="30" fill="#dcfce7" rx="4"/>
        <text x="47" y="112" textAnchor="middle" fill="#14532d" fontSize="7" fontWeight="bold">Correct by mixing order, emulsification</text>
      </g>

      {/* Chemical */}
      <g transform="translate(127, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#be185d" fontSize="9" fontWeight="bold">CHEMICAL</text>
        <text x="47" y="35" textAnchor="middle" fill="#e11d48" fontSize="7">• Oxidation-Reduction</text>
        <text x="47" y="50" textAnchor="middle" fill="#e11d48" fontSize="7">• Acid-Base Hydrolysis</text>
        <text x="47" y="65" textAnchor="middle" fill="#e11d48" fontSize="7">• Alkaloidal Precipitate</text>
        <text x="47" y="80" textAnchor="middle" fill="#e11d48" fontSize="7">• Effervescence</text>
        <rect x="10" y="95" width="75" height="30" fill="#ffe4e6" rx="4"/>
        <text x="47" y="112" textAnchor="middle" fill="#881337" fontSize="7" fontWeight="bold">Tolerated or Adjusted Method</text>
      </g>

      {/* Therapeutic */}
      <g transform="translate(235, 50)">
        <rect x="0" y="0" width="95" height="135" fill="#fffbe6" stroke="#ca8a04" strokeWidth="1.5" rx="6"/>
        <text x="47" y="20" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">THERAPEUTIC</text>
        <text x="47" y="35" textAnchor="middle" fill="#854d0e" fontSize="7">• Overdose Errors</text>
        <text x="47" y="50" textAnchor="middle" fill="#854d0e" fontSize="7">• Wrong Dosage Form</text>
        <text x="47" y="65" textAnchor="middle" fill="#854d0e" fontSize="7">• Contraindicated Drugs</text>
        <text x="47" y="80" textAnchor="middle" fill="#854d0e" fontSize="7">• Antagonism</text>
        <rect x="10" y="95" width="75" height="30" fill="#fef08a" rx="4"/>
        <text x="47" y="112" textAnchor="middle" fill="#713f12" fontSize="7" fontWeight="bold">Pharmacist Consultation with Prescriber</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-indigo-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span>Figure 4.3: Physical, Chemical & Therapeutic Incompatibility Matrix</span>
      </div>
      <p className="leading-relaxed">
        Systematic classification of prescription incompatibilities and pharmacist corrective strategies.
      </p>
    </div>
  </div>
);


// --- MAIN PHARMACEUTICS I UNIT 4 TEXTBOOK PDF VIEWER COMPONENT ---

export default function Pharmaceutics1Unit4PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 41;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`pharma1-unit4-page-${newPage}`);
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
      filename:     'Pharmaceutics_I_Unit_4_Official_Textbook_Notes.pdf',
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

  // Generate All 41 Pages List
  const pagesList = Array.from({ length: 41 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`pharma1-unit4-page-${pageNum}`}
        id={`pharma1-unit4-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-12 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-rose-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-2xl rounded-xs mb-6 shadow-md">
            PHARMACEUTICS I — UNIT IV ({pageNum}/41)
          </div>

          {/* PAGE CONTENT SWITCHER BASED ON AUTHENTIC TEXTBOOK PDF */}

          {/* PART 1: SEMISOLID DOSAGE FORMS (PAGES 1 - 18) */}
          {pageNum === 1 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                SEMISOLID DOSAGE FORMS & DERMATOLOGICAL PREPARATIONS
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base font-bold">Topics Covered in this Section:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800">
                  <li>• Ideal Physical & Physiological Properties</li>
                  <li>• Ointments & Ointment Base Classifications</li>
                  <li>• Preparation Methods (Trituration, Fusion, Emulsification)</li>
                  <li>• Creams (Aqueous O/W Vanishing vs Oily W/O Cold Creams)</li>
                  <li>• Pastes (&gt;50% Insoluble Solids) & Jellies</li>
                  <li>• Suppositories Types, Bases & Displacement Value</li>
                  <li>• Pharmaceutical Incompatibilities (Physical, Chemical, Therapeutic)</li>
                </ul>
              </div>
              <SemisolidBasesClassificationSVG />
            </div>
          )}

          {pageNum === 4 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                CLASSIFICATION OF OINTMENTS BY PENETRATION & USE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border">
                  <strong className="text-blue-900 block font-bold">1. Epidermic:</strong>
                  Acts on epidermal surface (protectives, antiseptics, parasiticides). Not absorbed.
                </div>
                <div className="bg-slate-50 p-2.5 rounded border">
                  <strong className="text-blue-900 block font-bold">2. Endodermic:</strong>
                  Acts on deeper cutaneous tissue (emollients, stimulants). Partially absorbed.
                </div>
                <div className="bg-slate-50 p-2.5 rounded border">
                  <strong className="text-blue-900 block font-bold">3. Diadermic:</strong>
                  Deep penetration passing through skin to produce systemic effects.
                </div>
              </div>
            </div>
          )}

          {pageNum === 10 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                OINTMENT PREPARATION METHODS (FUSION & EMULSIFICATION)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Trituration Method:</strong> Insoluble finely powdered drug mixed with soft ointment base in mortar.</li>
                <li><strong>Fusion Method:</strong> Ingredients melted in <em>decreasing order of melting point</em> (highest MP first) on water bath to avoid overheating low MP substances.</li>
                <li><strong>Emulsification Method:</strong> Oils/fats melted at 70°C, aqueous phase heated to 70°C and mixed with continuous stirring.</li>
              </ul>
            </div>
          )}

          {pageNum === 14 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                CREAMS & PASTES FORMULATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                  <strong className="text-rose-900 block font-bold text-sm mb-1">Creams:</strong>
                  Viscous semi-solid emulsions. Aqueous O/W (vanishing creams, non-greasy) and Oily W/O (cold creams, greasy).
                </div>
                <div className="bg-cyan-50 p-3.5 rounded-xl border border-cyan-200">
                  <strong className="text-cyan-900 block font-bold text-sm mb-1">Pastes:</strong>
                  Stiff semisolids with <strong>&gt;50% insoluble solid powders</strong>. Do not melt at 37°C. E.g. Zinc oxide paste.
                </div>
              </div>
            </div>
          )}

          {/* PART 2: SUPPOSITORIES (PAGES 19 - 34) */}
          {pageNum === 19 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                SUPPOSITORIES — BASES, DISPLACEMENT VALUE & EVALUATION
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Suppositories:</strong> Semisolid unit dosage forms designed to melt, soften, or dissolve at body temperature (37°C) when inserted into rectum, vagina, or urethra.
              </p>
              <SuppositoryTypesSVG />
            </div>
          )}

          {pageNum === 24 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                DISPLACEMENT VALUE CALCULATION NUMERICAL EXAMPLE
              </h3>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm space-y-2 text-slate-800 font-mono">
                <strong className="text-amber-900 block font-bold">Definition of Displacement Value (DV):</strong>
                <p>Quantity of drug which displaces 1 part of suppository base by weight.</p>
                <div className="bg-white p-3 rounded-lg border border-amber-300">
                  Example: 10 suppositories containing 40% drug weigh 14.66 g (1g capacity mould).<br/>
                  • Base present = 60% of 14.66 = 8.79 g.<br/>
                  • Drug present = 40% of 14.66 = 5.86 g.<br/>
                  • Base displaced = 10g - 8.79g = 1.20 g.<br/>
                  • <strong>Displacement Value = 5.86 / 1.20 = 4.88 (Approx 5)</strong>.
                </div>
              </div>
            </div>
          )}

          {pageNum === 27 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                EVALUATION TESTS FOR SUPPOSITORIES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border"><strong>1. Weight Variation:</strong> 20 suppositories (max 5% deviation for 18/20).</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>2. Macro Melting Range:</strong> ERWEKA apparatus in 37°C water bath.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>3. Softening / Liquefaction Time:</strong> U-tube water bath.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>4. Breaking / Hardness Test:</strong> 600g platform + 200g weight increments.</div>
              </div>
            </div>
          )}

          {/* PART 3: PHARMACEUTICAL INCOMPATIBILITIES (PAGES 35 - 41) */}
          {pageNum === 35 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                PHARMACEUTICAL INCOMPATIBILITIES
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Incompatibility:</strong> Result of prescribing or compounding two or more antagonistic substances resulting in an undesirable or unsafe product.
              </p>
              <IncompatibilityTypesSVG />
            </div>
          )}

          {pageNum === 38 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                CHEMICAL & THERAPEUTIC INCOMPATIBILITIES
              </h3>
              <div className="space-y-2 text-xs text-slate-800 font-medium">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <strong>Chemical Incompatibilities:</strong> Immediate reaction on compounding (effervescence, precipitation, oxidation-reduction, hydrolysis). Divided into <em>Tolerated</em> (order of mixing) & <em>Adjusted</em> (substituting inert compound).
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <strong>Therapeutic Incompatibilities:</strong> Overdose, wrong dosage form, contraindicated drugs (Penicillin allergy, Steroids in peptic ulcer), Synergism, Antagonism.
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER PAGES IN 41-PAGE MONOGRAPH */}
          {pageNum !== 1 && pageNum !== 4 && pageNum !== 10 && pageNum !== 14 && pageNum !== 19 && pageNum !== 24 && pageNum !== 27 && pageNum !== 35 && pageNum !== 38 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 18 && "SEMISOLID DOSAGE FORMS: OINTMENTS, CREAMS, PASTES, JELLIES & POULTICES"}
                {pageNum > 18 && pageNum <= 34 && "SUPPOSITORIES: BASES (THEOBROMA, GLYCERO-GELATIN), DISPLACEMENT VALUE & EVALUATION"}
                {pageNum > 34 && "PHARMACEUTICAL INCOMPATIBILITIES: PHYSICAL, CHEMICAL & THERAPEUTIC RECTIFICATIONS"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Official PCI B.Pharm Syllabus Coverage — Page {pageNum}:</strong><br/>
                  Authentic textbook notes covering dermatological semisolids, oleaginous/absorption/emulsion/water-soluble bases, fusion and trituration compounding, suppository formulations (Theobroma oil polymorphism, glycero-gelatin bases, PEG carbowaxes), displacement value calculations, quality control testing, and physical/chemical/therapeutic incompatibility resolutions.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for suppository base melting points & displacement values</div>
                  <div>• University 10-Mark Model Question: Explain classification of suppository bases & calculate displacement value</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Pharmaceutics I Unit 4</span>
          <span>Page {pageNum} of 41</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">41 Pages • Official PCI Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutics I — Unit 4: Semisolid Dosage Forms, Suppositories & Incompatibilities
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 41 Pages)' : 'Single Page View'}</span>
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
              className="px-4 py-1.5 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 4 PDF'}</span>
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
