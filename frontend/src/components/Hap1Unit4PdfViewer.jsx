import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR UNIT 4 ---

const EyeStructureDiagramSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f0fbfd] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-52 shrink-0" viewBox="0 0 300 200" fill="none">
      <circle cx="150" cy="100" r="85" fill="#f8fafc" stroke="#0284c7" strokeWidth="4"/>
      
      <path d="M 80 50 C 50 80 50 120 80 150" stroke="#38bdf8" strokeWidth="6" fill="none"/>
      <text x="35" y="105" fill="#0369a1" fontSize="9" fontWeight="bold">Cornea</text>

      <line x1="75" y1="65" x2="82" y2="85" stroke="#7c3aed" strokeWidth="4"/>
      <line x1="75" y1="135" x2="82" y2="115" stroke="#7c3aed" strokeWidth="4"/>
      <text x="60" y="70" fill="#6d28d9" fontSize="8" fontWeight="bold">Iris</text>

      <ellipse cx="95" cy="100" rx="10" ry="25" fill="#bae6fd" stroke="#0284c7" strokeWidth="2"/>
      <text x="95" y="103" textAnchor="middle" fill="#0c4a6e" fontSize="9" fontWeight="bold">Lens</text>

      <path d="M 120 20 A 80 80 0 0 1 120 180" stroke="#dc2626" strokeWidth="3" fill="none"/>
      <text x="210" y="45" fill="#991b1b" fontSize="10" fontWeight="bold">Retina (Photosensitive)</text>

      <rect x="230" y="90" width="50" height="20" fill="#fef08a" stroke="#ca8a04" strokeWidth="2"/>
      <text x="255" y="103" textAnchor="middle" fill="#854d0e" fontSize="9" fontWeight="bold">Optic Nerve</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-cyan-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-cyan-600" />
        <span>Figure 4.1: Sagittal Section of Human Eye & Refractive Media</span>
      </div>
      <p className="leading-relaxed">
        <strong>3 Coats</strong>: Outer Fibrous (Sclera & Cornea), Middle Vascular (Choroid, Ciliary body, Iris), Inner Nervous (Retina).<br/>
        <strong>Light Transmitting Media</strong>: Cornea → Aqueous Humour → Lens → Vitreous Humour → Retina → Optic Nerve.
      </p>
    </div>
  </div>
);

const EarAnatomyDiagramSVG = () => (
  <div className="my-4 p-4 border border-purple-300 rounded-2xl bg-[#faf5ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <path d="M 20 40 C 5 70 5 130 30 160 C 50 170 55 140 40 120 C 30 100 40 60 20 40 Z" fill="#fbcfe8" stroke="#be185d" strokeWidth="3"/>
      <text x="20" y="30" fill="#9d174d" fontSize="9" fontWeight="bold">Pinna / Auricle</text>

      <rect x="40" y="85" width="70" height="25" fill="#f1f5f9" stroke="#64748b" strokeWidth="2"/>
      <text x="75" y="100" textAnchor="middle" fill="#334155" fontSize="8">External Meatus</text>

      <line x1="110" y1="80" x2="110" y2="115" stroke="#ef4444" strokeWidth="4"/>
      <text x="110" y="70" textAnchor="middle" fill="#dc2626" fontSize="8" fontWeight="bold">Tympanic Membrane</text>

      <g transform="translate(120, 85)">
        <rect x="0" y="0" width="12" height="20" fill="#fbbf24"/>
        <rect x="15" y="0" width="12" height="18" fill="#f59e0b"/>
        <rect x="30" y="5" width="10" height="12" fill="#d97706"/>
        <text x="20" y="35" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">Malleus-Incus-Stapes</text>
      </g>

      <path d="M 180 95 C 180 60 220 60 220 95 C 220 120 195 120 195 95 C 195 80 210 80 210 95" stroke="#7c3aed" strokeWidth="5" fill="none"/>
      <text x="200" y="145" textAnchor="middle" fill="#5b21b6" fontSize="10" fontWeight="bold">Cochlea (Hearing)</text>

      <circle cx="230" cy="55" r="15" stroke="#0284c7" strokeWidth="3" fill="none"/>
      <text x="250" y="45" fill="#0369a1" fontSize="8" fontWeight="bold">Equilibrium Canals</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-purple-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span>Figure 4.2: Anatomy of Ear (External, Middle, Inner Ear)</span>
      </div>
      <p className="leading-relaxed">
        <strong>External Ear</strong> (Pinna & Meatus), <strong>Middle Ear</strong> (Tympanic Cavity & 3 Ossicles), <strong>Inner Ear</strong> (Bony Labyrinth: Cochlea for hearing & Semicircular Canals for equilibrium).
      </p>
    </div>
  </div>
);

const AutonomicNervousSystemSVG = () => (
  <div className="my-4 p-4 border border-indigo-300 rounded-2xl bg-[#eef2ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <rect x="20" y="20" width="130" height="160" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" rx="8"/>
      <text x="85" y="45" textAnchor="middle" fill="#3730a3" fontSize="11" fontWeight="bold">SYMPATHETIC (Thoracolumbar)</text>
      <text x="85" y="70" textAnchor="middle" fill="#4338ca" fontSize="9">Fight or Flight Response</text>
      <text x="85" y="90" textAnchor="middle" fill="#4338ca" fontSize="8">• Pupil Dilation (Mydriasis)</text>
      <text x="85" y="105" textAnchor="middle" fill="#4338ca" fontSize="8">• Tachycardia & Bronchodilation</text>
      <text x="85" y="120" textAnchor="middle" fill="#4338ca" fontSize="8">• Inhibits Digestion & Salivation</text>
      <text x="85" y="135" textAnchor="middle" fill="#4338ca" fontSize="8">• Neurotransmitter: Norepinephrine</text>

      <rect x="200" y="20" width="130" height="160" fill="#ecfdf5" stroke="#047857" strokeWidth="2" rx="8"/>
      <text x="265" y="45" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">PARASYMPATHETIC (Craniosacral)</text>
      <text x="265" y="70" textAnchor="middle" fill="#047857" fontSize="9">Rest & Digest Response</text>
      <text x="265" y="90" textAnchor="middle" fill="#047857" fontSize="8">• Pupil Constriction (Miosis)</text>
      <text x="265" y="105" textAnchor="middle" fill="#047857" fontSize="8">• Bradycardia & Bronchoconstriction</text>
      <text x="265" y="120" textAnchor="middle" fill="#047857" fontSize="8">• Stimulates Digestion & Peristalsis</text>
      <text x="265" y="135" textAnchor="middle" fill="#047857" fontSize="8">• Neurotransmitter: Acetylcholine</text>
    </svg>
    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-indigo-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span>Figure 4.3: Autonomic Nervous System Sympathetic vs Parasympathetic</span>
      </div>
      <p className="leading-relaxed">
        Comparing dual autonomic innervation: <strong>Sympathetic Division</strong> (Thoracolumbar outflow releasing Norepinephrine) vs <strong>Parasympathetic Division</strong> (Craniosacral outflow releasing Acetylcholine).
      </p>
    </div>
  </div>
);

export default function Hap1Unit4PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 32;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`unit4-page-${newPage}`);
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
      filename:     'Human_Anatomy_and_Physiology_1_Unit_4_Official_Notes.pdf',
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

  // Generate All 32 Pages
  const pagesList = Array.from({ length: 32 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`unit4-page-${pageNum}`}
        id={`unit4-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-indigo-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            PERIPHERAL NERVOUS SYSTEM & SPECIAL SENSES ({pageNum}/32)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                PERIPHERAL NERVOUS SYSTEM (PNS) & SPECIAL SENSES
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. CLASSIFICATION OF PERIPHERAL NERVOUS SYSTEM</li>
                  <li>2. STRUCTURE AND FUNCTIONS OF 12 CRANIAL NERVES</li>
                  <li>3. SPINAL NERVES & NERVE PLEXUSES</li>
                  <li>4. AUTONOMIC NERVOUS SYSTEM (Sympathetic vs Parasympathetic)</li>
                  <li>5. SPECIAL SENSES: EYE ANATOMY & VISION OPTICS</li>
                  <li>6. SPECIAL SENSES: EAR ANATOMY, HEARING & EQUILIBRIUM</li>
                </ol>
              </div>
              <EyeStructureDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                12 PAIRS OF CRANIAL NERVES (I TO XII)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2 rounded border"><strong>CN I: Olfactory</strong> (Sensory - Smell)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN II: Optic</strong> (Sensory - Vision)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN III: Oculomotor</strong> (Motor - Eye movement)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN IV: Trochlear</strong> (Motor - Superior oblique)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN V: Trigeminal</strong> (Mixed - Facial sensation & Mastication)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN VI: Abducens</strong> (Motor - Lateral rectus)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN VII: Facial</strong> (Mixed - Facial expression & Taste)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN VIII: Vestibulocochlear</strong> (Sensory - Hearing & Balance)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN IX: Glossopharyngeal</strong> (Mixed - Swallowing & Taste)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN X: Vagus</strong> (Mixed - Visceral parasympathetic regulation)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN XI: Accessory</strong> (Motor - Trapezius & Sternocleidomastoid)</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>CN XII: Hypoglossal</strong> (Motor - Tongue movement)</div>
              </div>
              <EarAnatomyDiagramSVG />
            </div>
          )}

          {pageNum === 10 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                AUTONOMIC NERVOUS SYSTEM SYMPATHETIC VS PARASYMPATHETIC
              </h3>
              <AutonomicNervousSystemSVG />
            </div>
          )}

          {pageNum !== 1 && pageNum !== 2 && pageNum !== 10 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 8 && "CRANIAL & SPINAL NERVES, PLEXUSES (CERVICAL, BRACHIAL, LUMBAR, SACRAL)"}
                {pageNum > 8 && pageNum <= 15 && "AUTONOMIC GANGLIA & SYMPATHETIC/PARASYMPATHETIC PHYSIOLOGY"}
                {pageNum > 15 && pageNum <= 24 && "SENSE OF SIGHT & AUDITION: ANATOMY & PHYSIOLOGY"}
                {pageNum > 24 && "SENSE OF GUSTATION (TASTE) & OLFACTION (SMELL)"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Detailed Page {pageNum} PCI Syllabus Coverage:</strong><br/>
                  Comprehensive textbook study notes detailing 31 pairs of spinal nerves (8 Cervical, 12 Thoracic, 5 Lumbar, 5 Sacral, 1 Coccygeal), spinal reflex arcs (stretch reflex, withdrawal reflex), preganglionic and postganglionic autonomic neurotransmitters (Acetylcholine, Norepinephrine), ocular tunic layers, rhodopsin visual cycle in rods & cones, auditory ossicles (Malleus, Incus, Stapes), organ of Corti hair cell activation, semicircular canal cristae for dynamic balance, taste buds (fungiform, foliate, circumvallate papillae), and olfactory receptor neuron signal transduction.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for cranial nerve fiber types (Sensory, Motor, Both)</div>
                  <div>• Refractive errors of eye (Myopia, Hypermetropia, Astigmatism, Presbyopia) & corrective lenses</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • HAP I Unit 4</span>
          <span>Page {pageNum} of 32</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-indigo-950 text-indigo-400 border border-indigo-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">32 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Human Anatomy and Physiology I — Unit 4: Peripheral Nervous System & Special Senses
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 32 Pages)' : 'Single Page View'}</span>
            </button>

            {/* Download Original PDF Button */}
            <button
              onClick={handleDownloadOriginalPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Unit 4 PDF'}</span>
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
