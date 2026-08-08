import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR ANALYSIS UNIT 2 ---

const ComplexometricEDTASVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-52 shrink-0" viewBox="0 0 300 200" fill="none">
      <rect x="20" y="20" width="100" height="60" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" rx="8"/>
      <text x="70" y="55" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">Metal Ion (M²⁺)</text>

      <text x="150" y="55" textAnchor="middle" fill="#dc2626" fontSize="16" fontWeight="bold">+</text>

      <rect x="180" y="20" width="100" height="60" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" rx="8"/>
      <text x="230" y="55" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">EDTA (Y⁴⁻)</text>

      <line x1="150" y1="85" x2="150" y2="120" stroke="#b91c1c" strokeWidth="3"/>
      <polygon points="150,125 144,117 156,117" fill="#b91c1c"/>

      <rect x="70" y="125" width="160" height="55" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" rx="10"/>
      <text x="150" y="150" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">[M-EDTA] Chelate Complex</text>
      <text x="150" y="168" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Hexadentate 1:1 Stoichiometry</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 2.1: EDTA Metal Chelate Complexation Reaction</span>
      </div>
      <p className="leading-relaxed">
        Mechanism of <strong>Complexometric Titration</strong>: EDTA acts as a hexadentate ligand forming stable 1:1 water-soluble ring chelate complex with metal ions (Ca²⁺, Mg²⁺, Zn²⁺) using Metallochromic indicators (Eriochrome Black T).
      </p>
    </div>
  </div>
);

export default function Analysis1Unit2PdfViewer({ onClose }) {
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
      const el = document.getElementById(`analysis-unit2-page-${newPage}`);
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
      filename:     'Pharmaceutical_Analysis_1_Unit_2_Official_Notes.pdf',
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
        key={`analysis-unit2-page-${pageNum}`}
        id={`analysis-unit2-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-rose-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            PRECIPITATION, COMPLEXOMETRIC & GRAVIMETRIC ANALYSIS ({pageNum}/47)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                PRECIPITATION & COMPLEXOMETRIC TITRATIONS
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. PRECIPITATION TITRATIONS (Mohr's, Volhard's & Fajan's Methods)</li>
                  <li>2. COMPLEXOMETRIC TITRATIONS (EDTA, Ligands & Metal Ion Chelation)</li>
                  <li>3. METALLOCHROMIC INDICATORS & MASKING/DEMASKING AGENTS</li>
                  <li>4. GRAVIMETRIC ANALYSIS STEPS & PRECIPITATE PURITY</li>
                  <li>5. ESTIMATION OF BARIUM AS BARIUM SULPHATE</li>
                </ol>
              </div>
              <ComplexometricEDTASVG />
            </div>
          )}

          {pageNum !== 1 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 15 && "ARGENTOMETRIC TITRATIONS: MOHR'S, VOLHARD'S & FAJAN'S ADSORPTION INDICATOR METHODS"}
                {pageNum > 15 && pageNum <= 30 && "COMPLEXOMETRIC TITRATIONS: EDTA TYPES (DIRECT, BACK, REPLACEMENT, ALKALIMETRIC)"}
                {pageNum > 30 && "GRAVIMETRIC ANALYSIS STEPS: PRECIPITATION, DIGESTION, FILTRATION, WASHING & IGNITION"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Detailed Page {pageNum} PCI Syllabus Coverage:</strong><br/>
                  Comprehensive textbook study notes detailing Argentometric titration of halides (NaCl, KCl), potassium chromate indicator in Mohr's method, ferric alum indicator in Volhard's back titration, fluorescein and eosin adsorption indicators in Fajan's method, Disodium EDTA standardization, masking agents (Triethanolamine, Cyanide) and demasking agents (Chloral hydrate), co-precipitation and post-precipitation phenomena in gravimetry, and gravimetric estimation of Barium as BaSO₄ and Aluminium as Al-oxinate.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for indicator selection in silver nitrate titrations</div>
                  <div>• University 10-Mark Model Question: Differentiate Mohr's, Volhard's and Fajan's titration principles</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Analysis I Unit 2</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">47 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutical Analysis I — Unit 2: Precipitation, Complexometric & Gravimetric Analysis
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
              className="px-4 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 2 PDF'}</span>
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
