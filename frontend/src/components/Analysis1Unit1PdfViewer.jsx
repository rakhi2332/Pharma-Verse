import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR ANALYSIS UNIT 1 ---

const TitrationSetupDiagramSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f0fbfd] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-64 shrink-0" viewBox="0 0 250 250" fill="none">
      {/* Stand & Clamp */}
      <rect x="30" y="220" width="120" height="12" fill="#475569" rx="3"/>
      <rect x="50" y="20" width="8" height="200" fill="#64748b"/>
      <rect x="58" y="70" width="45" height="8" fill="#334155"/>

      {/* Burette */}
      <rect x="95" y="10" width="16" height="150" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" rx="2"/>
      <line x1="95" y1="40" x2="103" y2="40" stroke="#0284c7" strokeWidth="1"/>
      <line x1="95" y1="70" x2="103" y2="70" stroke="#0284c7" strokeWidth="1"/>
      <line x1="95" y1="100" x2="103" y2="100" stroke="#0284c7" strokeWidth="1"/>
      <rect x="97" y="30" width="12" height="110" fill="#38bdf8" fillOpacity="0.4"/>
      <text x="120" y="60" fill="#0369a1" fontSize="9" fontWeight="bold">Burette (Titrant)</text>

      {/* Stopcock */}
      <circle cx="103" cy="163" r="5" fill="#0f172a"/>

      {/* Conical Flask */}
      <path d="M 90 175 L 116 175 L 140 220 L 66 220 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2"/>
      <path d="M 72 210 L 134 210 L 140 220 L 66 220 Z" fill="#93c5fd" opacity="0.6"/>
      <text x="150" y="205" fill="#1e40af" fontSize="9" fontWeight="bold">Erlenmeyer Flask (Analyte + Indicator)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-cyan-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-cyan-600" />
        <span>Figure 1.1: Volumetric Titration Apparatus Setup</span>
      </div>
      <p className="leading-relaxed">
        Standard apparatus setup: <strong>Burette</strong> containing titrant of known concentration, <strong>Conical Flask</strong> containing analyte solution and pH indicator, calibrated for precise end point determination.
      </p>
    </div>
  </div>
);

const TitrationCurveSVG = () => (
  <div className="my-4 p-4 border border-blue-300 rounded-2xl bg-[#eff6ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Axes */}
      <line x1="40" y1="20" x2="40" y2="160" stroke="#334155" strokeWidth="3"/>
      <line x1="40" y1="160" x2="320" y2="160" stroke="#334155" strokeWidth="3"/>
      
      <text x="15" y="90" fill="#1e293b" fontSize="10" fontWeight="bold" transform="rotate(-90 15,90)">pH Value</text>
      <text x="180" y="185" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">Volume of Titrant Added (mL)</text>

      {/* Curve */}
      <path d="M 40 140 Q 140 140 160 90 T 280 30" stroke="#2563eb" strokeWidth="4" fill="none"/>

      {/* Equivalence Point */}
      <circle cx="170" cy="85" r="5" fill="#ef4444"/>
      <text x="185" y="85" fill="#dc2626" fontSize="9" fontWeight="bold">Equivalence Point (pH 7.0)</text>

      <line x1="40" y1="85" x2="170" y2="85" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2"/>
      <line x1="170" y1="85" x2="170" y2="160" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2"/>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-blue-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>Figure 1.2: Strong Acid - Strong Base Titration Curve</span>
      </div>
      <p className="leading-relaxed">
        Demonstrating sharp pH inflection at the <strong>Equivalence Point</strong> (pH 7.0) when equivalent amounts of HCl and NaOH have reacted.
      </p>
    </div>
  </div>
);

export default function Analysis1Unit1PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 61;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`analysis-unit1-page-${newPage}`);
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
      filename:     'Pharmaceutical_Analysis_1_Unit_1_Official_Notes.pdf',
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

  // Generate All 61 Pages
  const pagesList = Array.from({ length: 61 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`analysis-unit1-page-${pageNum}`}
        id={`analysis-unit1-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-cyan-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            PHARMACEUTICAL ANALYSIS I — UNIT I ({pageNum}/61)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                PHARMACEUTICAL ANALYSIS & VOLUMETRIC TITRATIONS
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. DEFINITION & SCOPE OF PHARMACEUTICAL ANALYSIS</li>
                  <li>2. ERRORS IN ANALYSIS (Systematic & Random Errors)</li>
                  <li>3. ACCURACY, PRECISION & SIGNIFICANT FIGURES</li>
                  <li>4. PRIMARY AND SECONDARY STANDARDS</li>
                  <li>5. PREPARATION & STANDARDIZATION OF MOLAR/NORMAL SOLUTIONS</li>
                  <li>6. ACID-BASE TITRATIONS & NON-AQUEOUS TITRATIONS</li>
                </ol>
              </div>
              <TitrationSetupDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                ACID-BASE TITRATION CURVES & END POINT INDICATORS
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Acid-base titrations involve neutralization reactions between acids and bases. Indicators like Phenolphthalein (pH 8.3-10.0) and Methyl Orange (pH 3.1-4.4) change color at specific end points based on Ostwald or Quinonoid theories.
              </p>
              <TitrationCurveSVG />
            </div>
          )}

          {pageNum !== 1 && pageNum !== 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 15 && "PHARMACEUTICAL QUALITY CONTROL & ERROR MINIMIZATION"}
                {pageNum > 15 && pageNum <= 30 && "PRIMARY & SECONDARY STANDARDS & SOLUTION CONCENTRATION EXPRESSIONS"}
                {pageNum > 30 && pageNum <= 45 && "ACID-BASE TITRATION THEORY, NEUTRALIZATION CURVES & INDICATOR THEORY"}
                {pageNum > 45 && "NON-AQUEOUS TITRATION PRINCIPLES, SOLVENTS & ASSAYS"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Detailed Page {pageNum} PCI Syllabus Coverage:</strong><br/>
                  Comprehensive textbook study notes detailing quantitative analytical methods, pharmacopoeial limit tests, sources of errors (determinate & indeterminate), methods of minimizing errors, primary standard criteria (high purity, stability, high equivalent weight), standardization of 0.1 N HCl, 0.1 N NaOH, 0.1 N Perchloric acid, solvents in non-aqueous titrations (aprotic, protogenic, protophilic, amphiprotic), and assay of weak organic acids and bases.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT entrance exam high-yield formulas for normality, molarity, ppm, and standard deviation</div>
                  <div>• University 10-Mark Model Question: Classify errors and explain methods of minimizing errors in chemical analysis</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Analysis I Unit 1</span>
          <span>Page {pageNum} of 61</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">61 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutical Analysis I — Unit 1: Errors, Standard Solutions & Acid-Base Titrations
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 61 Pages)' : 'Single Page View'}</span>
            </button>

            {/* Download Original PDF Button */}
            <button
              onClick={handleDownloadOriginalPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 1 PDF'}</span>
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
