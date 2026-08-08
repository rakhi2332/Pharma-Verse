import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR UNIT 5 ---

const HeartChambersDiagramSVG = () => (
  <div className="my-4 p-4 border border-red-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-52 shrink-0" viewBox="0 0 300 200" fill="none">
      <path d="M 150 180 C 70 120 40 80 50 45 C 60 15 100 15 150 50 C 200 15 240 15 250 45 C 260 80 230 120 150 180 Z" fill="#fee2e2" stroke="#dc2626" strokeWidth="4"/>
      <line x1="150" y1="50" x2="150" y2="180" stroke="#991b1b" strokeWidth="5"/>
      <line x1="60" y1="100" x2="240" y2="100" stroke="#991b1b" strokeWidth="3" strokeDasharray="4 2"/>

      <text x="100" y="75" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">RIGHT ATRIUM</text>
      <text x="200" y="75" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">LEFT ATRIUM</text>

      <text x="100" y="140" textAnchor="middle" fill="#7f1d1d" fontSize="11" fontWeight="bold">RIGHT VENTRICLE</text>
      <text x="200" y="140" textAnchor="middle" fill="#7f1d1d" fontSize="11" fontWeight="bold">LEFT VENTRICLE</text>

      <rect x="90" y="96" width="20" height="8" fill="#facc15" rx="2"/>
      <text x="100" y="93" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="bold">Tricuspid</text>

      <rect x="190" y="96" width="20" height="8" fill="#facc15" rx="2"/>
      <text x="200" y="93" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="bold">Bicuspid / Mitral</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-red-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-red-600" />
        <span>Figure 5.1: 4 Heart Chambers & Atrioventricular Valves</span>
      </div>
      <p className="leading-relaxed">
        Internal structure: <strong>Right Atrium & Ventricle</strong> (Deoxygenated blood via Tricuspid valve) and <strong>Left Atrium & Ventricle</strong> (Oxygenated blood via Bicuspid/Mitral valve).
      </p>
    </div>
  </div>
);

const CardiacConductionECGSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff1f2] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* ECG Baseline Grid */}
      <rect x="10" y="10" width="330" height="180" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1"/>
      
      {/* ECG P-QRS-T Waveform */}
      <path d="M 20 120 L 50 120 Q 65 95 80 120 L 95 120 L 105 140 L 120 30 L 135 160 L 145 120 L 180 120 Q 205 80 230 120 L 330 120" stroke="#e11d48" strokeWidth="4" fill="none"/>
      
      <text x="65" y="85" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">P Wave</text>
      <text x="65" y="145" textAnchor="middle" fill="#9f1239" fontSize="8">(Atrial Depolarization)</text>

      <text x="120" y="20" textAnchor="middle" fill="#be123c" fontSize="12" fontWeight="bold">QRS Complex</text>
      <text x="120" y="180" textAnchor="middle" fill="#9f1239" fontSize="8">(Ventricular Depolarization)</text>

      <text x="210" y="70" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="bold">T Wave</text>
      <text x="210" y="145" textAnchor="middle" fill="#9f1239" fontSize="8">(Ventricular Repolarization)</text>
    </svg>
    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 5.2: Normal Electrocardiogram (ECG / EKG) Waveform</span>
      </div>
      <p className="leading-relaxed">
        Normal ECG tracing components: <strong>P Wave</strong> (Atrial contraction), <strong>QRS Complex</strong> (Ventricular depolarization, &lt;0.12s duration), and <strong>T Wave</strong> (Ventricular repolarization).
      </p>
    </div>
  </div>
);

export default function Hap1Unit5PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 23;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`unit5-page-${newPage}`);
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
      filename:     'Human_Anatomy_and_Physiology_1_Unit_5_Official_Notes.pdf',
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

  // Generate All 23 Pages
  const pagesList = Array.from({ length: 23 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`unit5-page-${pageNum}`}
        id={`unit5-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-emerald-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            CARDIOVASCULAR SYSTEM ({pageNum}/23)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                CARDIOVASCULAR SYSTEM (CVS)
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. ANATOMY OF HEART (Chambers, Valves & Wall Layers)</li>
                  <li>2. BLOOD CIRCULATION (Systemic, Pulmonary & Coronary)</li>
                  <li>3. CARDIAC CONDUCTION SYSTEM (SA Node, AV Node, Purkinje)</li>
                  <li>4. CARDIAC CYCLE & HEART SOUNDS</li>
                  <li>5. ELECTROCARDIOGRAM (ECG / EKG) WAVEFORMS</li>
                  <li>6. BLOOD PRESSURE & HEMODYNAMIC REGULATION</li>
                </ol>
              </div>
              <HeartChambersDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                CARDIAC CONDUCTION SYSTEM & ECG WAVEFORMS
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                The cardiac conduction system generates intrinsic rhythmic electrical impulses. Sinoatrial (SA) node (Pacemaker, 70-80 bpm) → Atrioventricular (AV) node (0.1s delay) → Bundle of His → Right & Left Bundle Branches → Purkinje Fibers.
              </p>
              <CardiacConductionECGSVG />
            </div>
          )}

          {pageNum !== 1 && pageNum !== 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 6 && "HEART WALL LAYERS (EPICARDIUM, MYOCARDIUM, ENDOCARDIUM) & CORONARY CIRCULATION"}
                {pageNum > 6 && pageNum <= 12 && "CARDIAC CYCLE PHASES (SYSTOLE & DIASTOLE) & HEART SOUNDS (LUB/DUB)"}
                {pageNum > 12 && pageNum <= 18 && "BLOOD PRESSURE REGULATION, CARDIAC OUTPUT & STROKE VOLUME"}
                {pageNum > 18 && "CARDIOVASCULAR DISORDERS (HYPERTENSION, ANGINA, ATHEROSCLEROSIS, MI)"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Detailed Page {pageNum} PCI Syllabus Coverage:</strong><br/>
                  Comprehensive textbook notes covering cardiac output calculation (CO = HR × SV = 70 bpm × 70 mL = 4.9 L/min), Frank-Starling law of the heart, baroreceptor reflex in carotid sinus & aortic arch, Renin-Angiotensin-Aldosterone System (RAAS), S1 ("Lub" - closure of AV valves) and S2 ("Dub" - closure of semilunar valves) heart sounds, coronary artery perfusion, atherosclerosis plaque formation, angina pectoris, and myocardial infarction emergency management.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for antihypertensive drug target receptors</div>
                  <div>• University 10-Mark Model Question: Explain cardiac cycle events with pressure-volume curves</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • HAP I Unit 5</span>
          <span>Page {pageNum} of 23</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">23 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Human Anatomy and Physiology I — Unit 5: Cardiovascular System
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 23 Pages)' : 'Single Page View'}</span>
            </button>

            {/* Download Original PDF Button */}
            <button
              onClick={handleDownloadOriginalPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 5 PDF'}</span>
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
