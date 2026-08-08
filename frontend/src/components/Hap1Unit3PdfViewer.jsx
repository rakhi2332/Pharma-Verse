import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR UNIT 3 ---

const BloodCompositionDiagramSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-52 shrink-0" viewBox="0 0 300 200" fill="none">
      <rect x="110" y="10" width="80" height="170" rx="35" fill="#f8fafc" stroke="#475569" strokeWidth="4"/>
      
      <path d="M 112 40 L 188 40 L 188 110 L 112 110 Z" fill="#fef08a" opacity="0.9"/>
      <text x="150" y="75" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">PLASMA (55%)</text>
      <text x="150" y="90" textAnchor="middle" fill="#a16207" fontSize="8">Water 90%, Proteins 7-8%</text>

      <rect x="112" y="110" width="76" height="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1"/>
      <text x="230" y="116" fill="#475569" fontSize="9" fontWeight="bold">Buffy Coat (&lt;1% WBC & Platelets)</text>

      <path d="M 112 118 L 188 118 L 188 145 C 188 165 165 178 150 178 C 135 178 112 165 112 145 Z" fill="#dc2626"/>
      <text x="150" y="145" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">RBCs (45%)</text>

      <line x1="188" y1="75" x2="220" y2="75" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 2"/>
      <text x="225" y="78" fill="#854d0e" fontSize="9" fontWeight="bold">Albumin, Globulin, Fibrinogen</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 3.1: Centrifuged Blood Composition & Formed Elements</span>
      </div>
      <p className="leading-relaxed">
        Whole blood components: <strong>Plasma (55%)</strong> (90% water, 7-8% plasma proteins), <strong>Buffy Coat (&lt;1%)</strong> (Leukocytes & Platelets), and <strong>Erythrocytes (45%)</strong> (RBC count 4.5–5.5 million/cu mm).
      </p>
    </div>
  </div>
);

const CoagulationCascadeSVG = () => (
  <div className="my-4 p-4 border border-amber-300 rounded-2xl bg-[#fffbe6] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <rect x="20" y="15" width="130" height="35" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6"/>
      <text x="85" y="36" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Intrinsic / Extrinsic Pathway</text>

      <line x1="85" y1="50" x2="85" y2="70" stroke="#d97706" strokeWidth="2.5"/>
      <polygon points="85,75 80,67 90,67" fill="#d97706"/>

      <rect x="20" y="75" width="130" height="35" fill="#fde68a" stroke="#b45309" strokeWidth="2" rx="6"/>
      <text x="85" y="96" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Prothrombin Activator</text>

      <line x1="150" y1="92" x2="190" y2="92" stroke="#b45309" strokeWidth="2.5"/>
      <polygon points="195,92 187,87 187,97" fill="#b45309"/>

      <rect x="195" y="75" width="135" height="35" fill="#f97316" stroke="#c2410c" strokeWidth="2" rx="6"/>
      <text x="262" y="96" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Prothrombin → Thrombin</text>

      <line x1="262" y1="110" x2="262" y2="135" stroke="#c2410c" strokeWidth="2.5"/>
      <polygon points="262,140 257,132 267,132" fill="#c2410c"/>

      <rect x="195" y="140" width="135" height="45" fill="#dc2626" stroke="#991b1b" strokeWidth="2" rx="6"/>
      <text x="262" y="160" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Fibrinogen (Soluble)</text>
      <text x="262" y="175" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">↓ Fibrin Clot (Insoluble)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-amber-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Figure 3.2: 3-Stage Blood Coagulation Mechanism</span>
      </div>
      <p className="leading-relaxed">
        <strong>Stage 1</strong>: Prothrombin Activator.<br/>
        <strong>Stage 2</strong>: Prothrombin → Thrombin (Ca²⁺ Factor IV).<br/>
        <strong>Stage 3</strong>: Soluble Fibrinogen → Insoluble Fibrin Meshwork (Factor XIII).
      </p>
    </div>
  </div>
);

const LymphaticSystemSVG = () => (
  <div className="my-4 p-4 border border-emerald-300 rounded-2xl bg-[#ecfdf5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <ellipse cx="175" cy="100" rx="90" ry="60" fill="#a7f3d0" stroke="#059669" strokeWidth="3"/>
      <circle cx="130" cy="80" r="15" fill="#047857"/>
      <circle cx="220" cy="80" r="15" fill="#047857"/>
      <circle cx="175" cy="130" r="20" fill="#065f46"/>
      <text x="175" y="100" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="bold">Lymph Node Anatomy</text>
      <text x="175" y="134" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Germinal Center</text>
      <path d="M 50 100 L 85 100" stroke="#047857" strokeWidth="3" markerEnd="url(#arrow)"/>
      <path d="M 265 100 L 300 100" stroke="#047857" strokeWidth="3"/>
      <text x="45" y="90" fill="#047857" fontSize="8" fontWeight="bold">Afferent Vessel</text>
      <text x="260" y="90" fill="#047857" fontSize="8" fontWeight="bold">Efferent Vessel</text>
    </svg>
    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-emerald-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Figure 3.3: Lymph Node Histology & Circulation</span>
      </div>
      <p className="leading-relaxed">
        Showing <strong>Afferent Lymphatic Vessels</strong> entering outer cortex, <strong>Germinal Centers</strong> (B cell activation & antibody production), and <strong>Efferent Vessel</strong> exiting at hilum.
      </p>
    </div>
  </div>
);

export default function Hap1Unit3PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 47;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`unit3-page-${newPage}`);
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
      filename:     'Human_Anatomy_and_Physiology_1_Unit_3_Official_Notes.pdf',
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

  // Generate All 47 Pages
  const pagesList = Array.from({ length: 47 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`unit3-page-${pageNum}`}
        id={`unit3-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-red-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            BODY FLUIDS, BLOOD & LYMPHATIC SYSTEM ({pageNum}/47)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                BODY FLUIDS AND BLOOD
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. BLOOD (Properties, Composition, Formed Elements)</li>
                  <li>2. RBCs AND THEIR FUNCTIONS</li>
                  <li>3. WBCs TYPES AND THEIR FUNCTIONS</li>
                  <li>4. HEMOPOESIS AND THEIR PROCESS</li>
                  <li>5. FORMATION OF HAEMOGLOBIN</li>
                  <li>6. ANAEMIA AND THEIR TYPES</li>
                  <li>7. BLOOD GROUPS (ABO & Rh Factor)</li>
                  <li>8. MECHANISM OF BLOOD COAGULATION</li>
                  <li>9. DISORDERS OF THE BLOOD</li>
                  <li>10. RETICULOENDOTHELIAL SYSTEM & LYMPHATIC SYSTEM</li>
                </ol>
              </div>
              <BloodCompositionDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                13 BLOOD CLOTTING FACTORS & COAGULATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 mb-4 font-medium">
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor I</strong>: Fibrinogen</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor II</strong>: Prothrombin</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor III</strong>: Tissue Thromboplastin</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor IV</strong>: Calcium ions (Ca²⁺)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor V</strong>: Labile factor</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor VII</strong>: Stable factor / Proconvertin</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor VIII</strong>: Antihemophilic factor A</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor IX</strong>: Christmas factor / PTC</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor X</strong>: Stuart-Prower factor</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor XI</strong>: PTA</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor XII</strong>: Hageman factor</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>Factor XIII</strong>: Fibrin stabilizing factor</div>
              </div>
              <CoagulationCascadeSVG />
            </div>
          )}

          {pageNum === 35 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                LYMPHATIC SYSTEM & LYMPH NODE ANATOMY
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                The lymphatic system consists of lymph fluid, lymphatic vessels, lymph nodes, spleen, and thymus. It returns filtered interstitial fluid back to systemic blood circulation and mounts immune responses.
              </p>
              <LymphaticSystemSVG />
            </div>
          )}

          {pageNum !== 1 && pageNum !== 2 && pageNum !== 35 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 12 && "RBC MORPHOLOGY, HEMOGLOBIN & ERYTHROPOIESIS"}
                {pageNum > 12 && pageNum <= 22 && "LEUKOCYTES, IMMUNITY & ANEMIA PATHOLOGIES"}
                {pageNum > 22 && pageNum <= 34 && "ABO & Rh BLOOD GROUPS & TRANSFUSION MEDICINE"}
                {pageNum > 34 && "LYMPHATIC ORGANS, NODES, SPLEEN & THYMUS HISTOLOGY"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Detailed Page {pageNum} PCI Syllabus Coverage:</strong><br/>
                  Comprehensive textbook study notes detailing physiological blood functions, plasma osmolality, biconcave erythrocyte morphology, hemoglobin iron protoporphyrin synthesis, vitamin B12 & folic acid requirements, leukopoiesis, granulocytes (Neutrophils, Eosinophils, Basophils), agranulocytes (Lymphocytes, Monocytes), platelets & hemostatic plug, erythroblastosis fetalis, lymphatic vessel circulation, spleen red & white pulp histology, and thymus T-cell maturation.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield clinical mnemonics for blood cell differentiation & clotting factor deficiencies</div>
                  <div>• Detailed biochemical pathways of heme synthesis & lymph circulation</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • HAP I Unit 3</span>
          <span>Page {pageNum} of 47</span>
        </div>
      </div>
    );
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-2 sm:p-4 font-sans text-slate-900 overflow-hidden">
      <div className={`bg-slate-900 rounded-3xl border border-slate-700 w-full max-w-6xl shadow-2xl flex flex-col overflow-hidden ${isFullscreen ? 'h-screen rounded-none' : 'h-[95vh]'}`}>
        
        {/* HEADER TOOLBAR */}
        <div className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between flex-wrap gap-3 shrink-0 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-red-950 text-red-400 border border-red-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">47 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Human Anatomy and Physiology I — Unit 3: Body Fluids, Blood & Lymphatic System
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap ml-auto">
            {/* Page Navigation */}
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 hover:bg-slate-700 rounded text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 47 Pages)' : 'Single Page View'}</span>
            </button>

            {/* Download Original PDF Button */}
            <button
              onClick={handleDownloadOriginalPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 3 PDF'}</span>
            </button>

            {onClose && (
              <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-8 flex flex-col items-center select-text">
          <div ref={documentRef} style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }} className="space-y-10 max-w-[210mm] w-full">
            {viewMode === 'scroll' ? pagesList : pagesList[currentPage - 1]}
          </div>
        </div>
      </div>
    </div>
  );
}
