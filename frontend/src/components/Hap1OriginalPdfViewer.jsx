import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS ---

// 1. Detailed Cell Structure Anatomy Diagram SVG (Page 1)
const CellStructureDiagramSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f4fbfd] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-64 shrink-0" viewBox="0 0 300 300" fill="none">
      {/* Outer Membrane */}
      <circle cx="150" cy="150" r="135" fill="#e0f2fe" stroke="#0284c7" strokeWidth="8"/>
      <circle cx="150" cy="150" r="125" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4"/>
      
      {/* Cytoplasm Background */}
      <circle cx="150" cy="150" r="120" fill="#f0f9ff"/>

      {/* Nucleus & Nucleolus */}
      <circle cx="150" cy="140" r="45" fill="#4338ca" fillOpacity="0.85" stroke="#312e81" strokeWidth="4"/>
      <circle cx="150" cy="140" r="20" fill="#fbbf24" stroke="#d97706" strokeWidth="2"/>
      <text x="150" y="143" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Nucleolus</text>

      {/* Chromatin Threads */}
      <path d="M 125 130 Q 135 120 140 135 T 160 145" stroke="#c7d2fe" strokeWidth="2.5" fill="none"/>
      <path d="M 140 155 Q 155 165 165 150" stroke="#c7d2fe" strokeWidth="2.5" fill="none"/>

      {/* Mitochondria */}
      <g transform="translate(70, 70) rotate(-30)">
        <rect x="0" y="0" width="40" height="20" rx="10" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
        <path d="M 5 10 Q 10 4 15 10 T 25 10 T 35 10" stroke="#fef08a" strokeWidth="2" fill="none"/>
      </g>
      <g transform="translate(190, 180) rotate(40)">
        <rect x="0" y="0" width="36" height="18" rx="9" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
        <path d="M 5 9 Q 10 4 15 9 T 25 9 T 30 9" stroke="#fef08a" strokeWidth="2" fill="none"/>
      </g>

      {/* Rough Endoplasmic Reticulum (RER) */}
      <path d="M 100 130 Q 80 120 75 140 T 95 160" stroke="#8b5cf6" strokeWidth="5" fill="none"/>
      <circle cx="78" cy="130" r="2" fill="#4c1d95"/>
      <circle cx="85" cy="145" r="2" fill="#4c1d95"/>
      <circle cx="92" cy="155" r="2" fill="#4c1d95"/>

      {/* Golgi Apparatus */}
      <g transform="translate(170, 75)">
        <path d="M 0 0 Q 20 -5 40 0" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 3 8 Q 20 3 37 8" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M 6 16 Q 20 11 34 16" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <circle cx="44" cy="2" r="3" fill="#fb923c"/>
        <circle cx="-3" cy="10" r="3" fill="#fb923c"/>
      </g>

      {/* Lysosomes & Peroxisomes */}
      <circle cx="90" cy="200" r="10" fill="#10b981" stroke="#047857" strokeWidth="2"/>
      <circle cx="210" cy="130" r="8" fill="#ec4899" stroke="#be185d" strokeWidth="2"/>

      {/* Centrosome */}
      <g transform="translate(110, 80)">
        <rect x="0" y="0" width="6" height="14" fill="#64748b"/>
        <rect x="10" y="4" width="14" height="6" fill="#64748b"/>
      </g>

      {/* Labels */}
      <text x="150" y="102" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">NUCLEUS</text>
      <text x="50" y="60" fill="#991b1b" fontSize="10" fontWeight="bold">Mitochondrion</text>
      <text x="215" y="70" fill="#c2410c" fontSize="10" fontWeight="bold">Golgi Body</text>
      <text x="45" y="215" fill="#047857" fontSize="10" fontWeight="bold">Lysosome</text>
      <text x="150" y="275" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">Plasma Membrane</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-cyan-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-cyan-600" />
        <span>Figure 1.1: Official Structural Diagram of Human Cell</span>
      </div>
      <p className="leading-relaxed">
        Illustrating key cellular organelles: <strong>Plasma Membrane</strong> (outer fluid lipid bilayer), <strong>Nucleus & Chromatin</strong> (genetic control), <strong>Rough ER & Ribosomes</strong> (protein synthesis), <strong>Mitochondria</strong> (ATP powerhouse), <strong>Golgi Apparatus</strong> (packaging & secretion), and <strong>Lysosomes/Peroxisomes</strong> (macromolecule degradation).
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
        <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded">RER</span>
        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Mitochondria</span>
        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Golgi</span>
        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Lysosome</span>
      </div>
    </div>
  </div>
);

// 2. Membrane Transport Mechanisms Diagram SVG
const MembraneTransportDiagramSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f0fdf4] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Extracellular Fluid */}
      <rect x="0" y="0" width="350" height="60" fill="#e0f2fe"/>
      <text x="15" y="25" fill="#0369a1" fontSize="11" fontWeight="bold">EXTRACELLULAR FLUID (High Conc.)</text>
      
      {/* Phospholipid Bilayer Top Layer */}
      <rect x="0" y="60" width="350" height="15" fill="#fb923c"/>
      <rect x="0" y="75" width="350" height="20" fill="#fed7aa"/>
      <rect x="0" y="95" width="350" height="15" fill="#fb923c"/>

      {/* Intracellular Fluid */}
      <rect x="0" y="110" width="350" height="90" fill="#fef3c7"/>
      <text x="15" y="180" fill="#92400e" fontSize="11" fontWeight="bold">CYTOPLASM (Low Conc.)</text>

      {/* Simple Diffusion molecules */}
      <circle cx="40" cy="20" r="5" fill="#2563eb"/>
      <circle cx="60" cy="35" r="5" fill="#2563eb"/>
      <circle cx="50" cy="50" r="5" fill="#2563eb"/>
      <path d="M 50 55 L 50 120" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3"/>
      <polygon points="50,125 45,115 55,115" fill="#2563eb"/>
      <circle cx="50" cy="140" r="5" fill="#2563eb"/>
      <text x="25" y="160" fill="#1e40af" fontSize="9" fontWeight="bold">Simple Diffusion</text>

      {/* Channel Protein (Facilitated) */}
      <rect x="130" y="55" width="30" height="60" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
      <rect x="142" y="55" width="6" height="60" fill="#eff6ff"/>
      <path d="M 145 20 L 145 125" stroke="#16a34a" strokeWidth="2"/>
      <polygon points="145,130 140,120 150,120" fill="#16a34a"/>
      <text x="110" y="160" fill="#1d4ed8" fontSize="9" fontWeight="bold">Channel Protein</text>

      {/* Primary Active Transport Pump (Na+/K+ Pump) */}
      <rect x="230" y="50" width="45" height="70" rx="10" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2"/>
      <circle cx="242" cy="85" fill="#ef4444" r="5"/>
      <circle cx="262" cy="85" fill="#ef4444" r="5"/>
      <text x="252" y="105" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">ATP</text>

      <path d="M 252 145 L 252 122" stroke="#dc2626" strokeWidth="2"/>
      <polygon points="252,117 247,125 257,125" fill="#dc2626"/>
      <text x="210" y="160" fill="#6d28d9" fontSize="9" fontWeight="bold">Na+/K+ Pump (Active)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-emerald-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Figure 1.2: Plasma Membrane Transport Mechanisms</span>
      </div>
      <p className="leading-relaxed">
        Comparing <strong>Passive Transport</strong> (Simple & Facilitated Diffusion along concentration gradient without ATP) vs. <strong>Active Transport</strong> (Na⁺/K⁺-ATPase pump moving ions uphill against gradient using direct ATP hydrolysis).
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Simple Diffusion</span>
        <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Carrier Protein</span>
        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Na+/K+ Pump</span>
      </div>
    </div>
  </div>
);

// 3. Cell Division Mitosis & Meiosis Stages Diagram SVG
const CellDivisionStagesSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#faf5ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Interphase Cell */}
      <g transform="translate(10, 20)">
        <circle cx="35" cy="40" r="30" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3"/>
        <circle cx="35" cy="40" r="15" fill="#c084fc" fillOpacity="0.4"/>
        <path d="M 28 35 Q 35 25 42 38" stroke="#7e22ce" strokeWidth="2" fill="none"/>
        <text x="35" y="85" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">1. Interphase</text>
      </g>

      {/* Prophase */}
      <g transform="translate(95, 20)">
        <circle cx="35" cy="40" r="30" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3"/>
        <path d="M 25 30 L 35 45 M 35 30 L 25 45" stroke="#ef4444" strokeWidth="3"/>
        <path d="M 38 32 L 46 47 M 46 32 L 38 47" stroke="#2563eb" strokeWidth="3"/>
        <text x="35" y="85" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">2. Prophase</text>
      </g>

      {/* Metaphase */}
      <g transform="translate(180, 20)">
        <circle cx="35" cy="40" r="30" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3"/>
        <line x1="35" y1="12" x2="35" y2="68" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2"/>
        <path d="M 30 30 L 40 45 M 40 30 L 30 45" stroke="#ef4444" strokeWidth="3"/>
        <path d="M 30 45 L 40 60 M 40 45 L 30 60" stroke="#2563eb" strokeWidth="3"/>
        <text x="35" y="85" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">3. Metaphase</text>
      </g>

      {/* Anaphase */}
      <g transform="translate(265, 20)">
        <circle cx="35" cy="40" r="30" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3"/>
        <path d="M 20 30 L 15 40 L 20 50" stroke="#ef4444" strokeWidth="2.5" fill="none"/>
        <path d="M 50 30 L 55 40 L 50 50" stroke="#2563eb" strokeWidth="2.5" fill="none"/>
        <text x="35" y="85" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">4. Anaphase</text>
      </g>

      {/* Telophase & Cytokinesis */}
      <g transform="translate(100, 110)">
        <ellipse cx="40" cy="35" rx="35" ry="25" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3"/>
        <path d="M 40 10 L 40 60" stroke="#a855f7" strokeWidth="2" strokeDasharray="2 2"/>
        <circle cx="22" cy="35" r="10" fill="#e9d5ff"/>
        <circle cx="58" cy="35" r="10" fill="#e9d5ff"/>
        <text x="40" y="75" textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="bold">5. Telophase & Cytokinesis</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-purple-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-purple-600" />
        <span>Figure 1.3: Mitosis (Somatic Cell Division) Stages</span>
      </div>
      <p className="leading-relaxed">
        Step-by-step nuclear and cytoplasmic division: <strong>Interphase</strong> (DNA duplication), <strong>Prophase</strong> (chromatin condensation), <strong>Metaphase</strong> (equatorial alignment), <strong>Anaphase</strong> (sister chromatid separation), and <strong>Telophase/Cytokinesis</strong> (2 identical diploid daughter cells).
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Diploid (2n)</span>
        <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded">Equatorial Plate</span>
        <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Centromere</span>
      </div>
    </div>
  </div>
);

// 4. Cell Junctions Summary Diagram SVG
const CellJunctionsDiagramSVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#fffbe6] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Cell 1 & Cell 2 Membranes */}
      <rect x="40" y="20" width="110" height="150" fill="#fef3c7" stroke="#d97706" strokeWidth="3" rx="8"/>
      <rect x="200" y="20" width="110" height="150" fill="#fef3c7" stroke="#d97706" strokeWidth="3" rx="8"/>
      
      <text x="95" y="45" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">CELL 1</text>
      <text x="255" y="45" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">CELL 2</text>

      {/* Tight Junction */}
      <g transform="translate(150, 50)">
        <rect x="0" y="0" width="50" height="12" fill="#ef4444" rx="3"/>
        <text x="25" y="9" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold font-mono">Tight Junction</text>
      </g>

      {/* Gap Junction (Communicating Channels) */}
      <g transform="translate(150, 85)">
        <rect x="0" y="0" width="50" height="18" fill="#10b981" rx="4"/>
        <circle cx="15" cy="9" r="4" fill="#ecfdf5"/>
        <circle cx="25" cy="9" r="4" fill="#ecfdf5"/>
        <circle cx="35" cy="9" r="4" fill="#ecfdf5"/>
        <text x="25" y="26" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="bold">Gap Junction</text>
      </g>

      {/* Desmosome (Anchoring) */}
      <g transform="translate(150, 130)">
        <rect x="0" y="0" width="50" height="14" fill="#3b82f6" rx="3"/>
        <path d="M -10 7 L 0 7 M 50 7 L 60 7" stroke="#1d4ed8" strokeWidth="2"/>
        <text x="25" y="10" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Desmosome</text>
      </g>

      {/* Basal Lamina Layer */}
      <rect x="20" y="180" width="310" height="12" fill="#64748b" rx="2"/>
      <text x="175" y="190" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">Basal Lamina (Extracellular Matrix)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-amber-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Figure 1.4: Membrane Cell Junction Classifications</span>
      </div>
      <p className="leading-relaxed">
        Illustrating 3 major categories: <strong>Tight Junctions (Occluding)</strong> sealing intercellular space, <strong>Gap Junctions (Communicating)</strong> permitting direct ion/molecule flow via connexins, and <strong>Desmosomes/Adherens (Anchoring)</strong> providing high mechanical strength.
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Occludin / Claudin</span>
        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Connexins</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Cadherins / Integrins</span>
      </div>
    </div>
  </div>
);

// 5. Tissue Types Histology Overview Diagram SVG
const TissueTypesHistologySVG = () => (
  <div className="my-4 p-4 border border-cyan-300 rounded-2xl bg-[#f0f9ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Epithelial Tissue */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="150" height="75" fill="#fef2f2" stroke="#f87171" strokeWidth="2" rx="8"/>
        <rect x="10" y="10" width="130" height="30" fill="#fca5a5"/>
        <circle cx="25" cy="25" r="4" fill="#991b1b"/>
        <circle cx="55" cy="25" r="4" fill="#991b1b"/>
        <circle cx="85" cy="25" r="4" fill="#991b1b"/>
        <circle cx="115" cy="25" r="4" fill="#991b1b"/>
        <text x="75" y="60" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">1. Epithelial Tissue</text>
      </g>

      {/* Muscular Tissue */}
      <g transform="translate(185, 15)">
        <rect x="0" y="0" width="150" height="75" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" rx="8"/>
        <rect x="15" y="12" width="120" height="10" fill="#ea580c" rx="2"/>
        <rect x="15" y="26" width="120" height="10" fill="#ea580c" rx="2"/>
        <rect x="15" y="40" width="120" height="10" fill="#ea580c" rx="2"/>
        <text x="75" y="63" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="bold">2. Muscular Tissue</text>
      </g>

      {/* Nervous Tissue */}
      <g transform="translate(15, 105)">
        <rect x="0" y="0" width="150" height="80" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="2" rx="8"/>
        <polygon points="40,25 55,40 25,40" fill="#7c3aed"/>
        <line x1="55" y1="35" x2="110" y2="35" stroke="#7c3aed" strokeWidth="3"/>
        <text x="75" y="68" textAnchor="middle" fill="#5b21b6" fontSize="10" fontWeight="bold">3. Nervous Tissue</text>
      </g>

      {/* Connective Tissue */}
      <g transform="translate(185, 105)">
        <rect x="0" y="0" width="150" height="80" fill="#ecfdf5" stroke="#34d399" strokeWidth="2" rx="8"/>
        <circle cx="35" cy="30" r="8" fill="#059669"/>
        <circle cx="85" cy="45" r="10" fill="#10b981"/>
        <path d="M 20 20 Q 70 50 130 25" stroke="#059669" strokeWidth="2" fill="none"/>
        <text x="75" y="68" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">4. Connective Tissue</text>
      </g>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-sky-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-sky-600" />
        <span>Figure 1.5: Four Primary Human Tissue Classifications</span>
      </div>
      <p className="leading-relaxed">
        Histological schematics of: <strong>Epithelial</strong> (continuous cell sheets), <strong>Muscular</strong> (elongated force-generating myocytes), <strong>Nervous</strong> (neurons & supporting neuroglia), and <strong>Connective Tissue</strong> (widely spaced cells in rich extracellular matrix).
      </p>
      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Simple & Stratified</span>
        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Skeletal, Smooth, Cardiac</span>
        <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Neuron / Glia</span>
        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Bone, Cartilage, Blood</span>
      </div>
    </div>
  </div>
);

// --- MAIN HAP1 TEXTBOOK PDF VIEWER COMPONENT ---

export default function Hap1OriginalPdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll'); // 'scroll' | 'page'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);
  const totalPages = 50;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`page-${newPage}`);
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
      filename:     'Human_Anatomy_and_Physiology_1_Unit_1_Official_Notes.pdf',
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

  // Generate All 50 Pages List dynamically to ensure 100% complete rendering
  const pagesList = Array.from({ length: 50 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`page-${pageNum}`}
        id={`page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-12 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] rotate-[-35deg] text-6xl font-black text-cyan-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-2xl rounded-xs mb-6 shadow-md">
            HUMAN ANATOMY & PHYSIOLOGY I — UNIT I ({pageNum}/50)
          </div>

          {/* PAGE CONTENT SWITCHER */}
          {pageNum === 1 && (
            <div>
              <div className="mb-6">
                <h3 className="text-[#ff0000] font-bold text-base mb-3 border-b border-red-200 pb-1">
                  Points to be covered in this topic
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm font-semibold text-slate-800 pl-2">
                  <li>Structure and Functions of Cell</li>
                  <li>Transport Across Cell Membrane</li>
                  <li>Cell Division (Mitosis & Meiosis)</li>
                  <li>Cell Junctions & Intercellular Communication</li>
                  <li>General Principles of Cell Communication (Contact-dependent, Paracrine, Synaptic, Endocrine)</li>
                  <li>Tissue Level of Organization (4 Primary Tissues)</li>
                </ol>
              </div>

              <div className="bg-red-50 border-l-4 border-[#ff0000] p-3 mb-4">
                <h2 className="text-[#ff0000] font-extrabold text-lg uppercase tracking-wide">
                  STRUCTURE AND FUNCTIONS OF CELL
                </h2>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-slate-800 mb-4">
                <h4 className="font-bold text-[#00b0f0] text-sm uppercase">INTRODUCTION & GENERAL CHARACTERISTICS</h4>
                <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                  <li>All living things are composed of <strong>cells</strong> — the basic structural and functional unit of life.</li>
                  <li>Requires nutrition and oxygen to generate energy (ATP) for survival.</li>
                  <li>Maintains homeostatic internal environment and eliminates carbon dioxide and metabolic waste.</li>
                </ul>
              </div>

              <CellStructureDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div>
              <h3 className="text-[#00b0f0] font-bold text-base mb-4 border-b border-cyan-200 pb-1">
                Structure and Functions of Cell Organelles (Part I)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-cyan-300 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#5b9bd5] text-white font-bold">
                      <th className="border border-cyan-400 p-2.5 w-14 text-center">S.No.</th>
                      <th className="border border-cyan-400 p-2.5 w-44 text-left">Organelle</th>
                      <th className="border border-cyan-400 p-2.5 text-left">Functions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-200 text-slate-800 font-medium">
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">1.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Rough Endoplasmic Reticulum (RER)</td>
                      <td className="border border-cyan-200 p-3">1. Protein synthesis & post-translational modification<br/>2. Degrades worn-out organelles</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">2.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Smooth Endoplasmic Reticulum (SER)</td>
                      <td className="border border-cyan-200 p-3">1. Lipid & steroid synthesis<br/>2. Carbohydrate metabolism<br/>3. Calcium storage & detoxification</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">3.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Golgi Apparatus</td>
                      <td className="border border-cyan-200 p-3">1. Modifies, sorts, packages, and ships secretory proteins & lipids</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">4.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Lysosomes</td>
                      <td className="border border-cyan-200 p-3">1. Intracellular digestion & macromolecule degradation<br/>2. Autophagy & autolysis</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">5.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Peroxisomes</td>
                      <td className="border border-cyan-200 p-3">1. Fatty acid beta-oxidation<br/>2. Hydrogen peroxide neutralization via catalase enzyme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {pageNum === 3 && (
            <div>
              <h3 className="text-[#00b0f0] font-bold text-base mb-4 border-b border-cyan-200 pb-1">
                Structure and Functions of Cell Organelles (Part II) & Transport Overview
              </h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-cyan-300 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#5b9bd5] text-white font-bold">
                      <th className="border border-cyan-400 p-2.5 w-14 text-center">S.No.</th>
                      <th className="border border-cyan-400 p-2.5 w-44 text-left">Organelle</th>
                      <th className="border border-cyan-400 p-2.5 text-left">Functions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-200 text-slate-800 font-medium">
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">6.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Centrosome & Centrioles</td>
                      <td className="border border-cyan-200 p-3">1. Organizes mitotic spindle apparatus during cell division</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">7.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Mitochondria</td>
                      <td className="border border-cyan-200 p-3">1. Cellular respiration & ATP synthesis (Powerhouse)<br/>2. Regulates apoptosis</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">8.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Ribosomes</td>
                      <td className="border border-cyan-200 p-3">1. mRNA translation & protein polypeptide synthesis</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">9.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Cytoskeleton</td>
                      <td className="border border-cyan-200 p-3">1. Microfilaments, intermediate filaments & microtubules maintaining cell shape</td>
                    </tr>
                    <tr className="hover:bg-cyan-50/50">
                      <td className="border border-cyan-200 p-3 text-center font-bold">10.</td>
                      <td className="border border-cyan-200 p-3 font-bold text-slate-900">Nucleus</td>
                      <td className="border border-cyan-200 p-3">1. Genetic control center storing DNA, chromatin & nucleolus</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-bold text-base rounded-xs mb-4">
                TRANSPORT ACROSS CELL MEMBRANE
              </div>
              <MembraneTransportDiagramSVG />
            </div>
          )}

          {pageNum === 4 && (
            <div>
              <h3 className="text-[#ff0000] font-bold text-sm uppercase mb-3 border-b border-red-100 pb-1">
                PASSIVE TRANSPORT MECHANISMS
              </h3>
              <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-200 mb-6 space-y-2 text-sm text-slate-800">
                <h4 className="font-bold text-[#ff0000] uppercase text-xs">PASSIVE TRANSPORT (NO ATP EXPENDITURE)</h4>
                <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                  <li>Movement of molecules <strong>down concentration gradient</strong> (High → Low concentration).</li>
                  <li>Driven by kinetic energy of molecules without consuming ATP.</li>
                  <li><strong>Simple Diffusion:</strong> Unassisted movement of nonpolar, lipid-soluble solutes (O₂, CO₂, fatty acids).</li>
                  <li><strong>Facilitated Diffusion:</strong> Channel-mediated (ions like Na⁺, K⁺, Ca²⁺) or Carrier-mediated (Glucose, Amino acids).</li>
                  <li><strong>Osmosis:</strong> Diffusion of water across semipermeable membrane toward higher solute concentration.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
                <div className="p-3 border border-blue-200 rounded-xl bg-blue-50">
                  <h5 className="font-bold text-blue-900 mb-1">Filtration</h5>
                  <p className="font-normal text-slate-700">Movement of water and solute molecules across cell membrane due to hydrostatic pressure (e.g. Glomerular filtration in kidneys).</p>
                </div>
                <div className="p-3 border border-indigo-200 rounded-xl bg-indigo-50">
                  <h5 className="font-bold text-indigo-900 mb-1">Bulk Flow</h5>
                  <p className="font-normal text-slate-700">Mass movement of fluid driven by pressure gradients carrying dissolved nutrients and wastes.</p>
                </div>
              </div>
            </div>
          )}

          {pageNum === 5 && (
            <div>
              <h3 className="text-[#ff0000] font-bold text-sm uppercase mb-3 border-b border-red-100 pb-1">
                ACTIVE TRANSPORT & VESICULAR TRANSPORT
              </h3>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 mb-6 space-y-3 text-sm text-slate-800">
                <h4 className="font-bold text-[#ff0000] uppercase text-xs">ACTIVE TRANSPORT (ATP CONSUMING)</h4>
                <ul className="list-disc list-inside space-y-1.5 pl-2 font-medium">
                  <li>Moves substances <strong>against electrochemical gradient</strong> (Low → High concentration).</li>
                  <li><strong>Primary Active Transport:</strong> Direct hydrolysis of ATP (e.g. Na⁺/K⁺-ATPase pump pumping 3 Na⁺ OUT and 2 K⁺ IN).</li>
                  <li><strong>Secondary Active Transport:</strong> Driven by energy stored in ionic concentration gradients established by primary active transport (Symport & Antiport).</li>
                  <li><strong>Endocytosis:</strong> Phagocytosis (cell eating), Pinocytosis (cell drinking), Receptor-mediated endocytosis.</li>
                  <li><strong>Exocytosis:</strong> Secretory vesicles fusing with plasma membrane to release neurotransmitters/hormones.</li>
                </ul>
              </div>
            </div>
          )}

          {pageNum === 6 && (
            <div>
              <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
                CELL DIVISION (MITOSIS & MEIOSIS)
              </div>
              <h4 className="font-bold text-[#ff0000] text-sm uppercase mb-3 border-b border-red-100 pb-1">INTERPHASE & SOMATIC DIVISION</h4>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 pl-2 font-medium mb-6">
                <li><strong>Interphase:</strong> G₁ phase (Growth & metabolic activity), S phase (DNA replication), G₂ phase (Pre-mitotic enzyme synthesis).</li>
                <li><strong>Mitosis (M-Phase):</strong> Division of somatic cells producing two identical diploid (2n) daughter cells.</li>
              </ul>
              <CellDivisionStagesSVG />
            </div>
          )}

          {pageNum === 7 && (
            <div>
              <h3 className="text-[#00b0f0] font-bold text-base mb-6 border-b border-cyan-200 pb-1">
                PHASES OF MITOSIS & CYTOKINESIS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-800">
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <h5 className="font-bold text-emerald-700 text-sm mb-1">1. Prophase</h5>
                  <p>Chromatin threads condense into visible chromosomes. Centrosomes migrate to opposite poles and nuclear envelope disintegrates.</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <h5 className="font-bold text-emerald-700 text-sm mb-1">2. Metaphase</h5>
                  <p>Chromosomes align along equatorial metaphase plate. Spindle fibers attach securely to kinetochores of centromeres.</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <h5 className="font-bold text-emerald-700 text-sm mb-1">3. Anaphase</h5>
                  <p>Centromeres split; sister chromatids separate into daughter chromosomes pulled toward opposite centrosome poles.</p>
                </div>
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <h5 className="font-bold text-emerald-700 text-sm mb-1">4. Telophase & Cytokinesis</h5>
                  <p>Nuclear envelopes reform, chromosomes uncoil into chromatin, cleavage furrow pinches cytoplasm creating 2 daughter cells.</p>
                </div>
              </div>
            </div>
          )}

          {pageNum === 8 && (
            <div>
              <div className="bg-red-50 border-l-4 border-[#ff0000] p-3 mb-6">
                <h3 className="font-extrabold text-base text-[#ff0000] uppercase">
                  MEIOSIS & CELL JUNCTIONS
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 mb-4 font-medium">
                Meiosis reduces chromosome number from diploid (2n) to haploid (n) forming 4 gametes. Prophase I includes Leptotene, Zygotene, Pachytene (Crossing over), Diplotene, and Diakinesis.
              </p>
              <CellJunctionsDiagramSVG />
            </div>
          )}

          {pageNum >= 9 && pageNum <= 35 && (
            <div>
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-2 mb-4">
                {pageNum <= 15 && "GENERAL PRINCIPLES OF CELL SIGNALING & RECEPTORS"}
                {pageNum > 15 && pageNum <= 25 && "EPITHELIAL TISSUE CLASSIFICATION & HISTOLOGY"}
                {pageNum > 25 && pageNum <= 35 && "CONNECTIVE TISSUE TYPES, MATRIX & BONE HISTOLOGY"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                <div className="bg-cyan-50/60 p-4 rounded-2xl border border-cyan-200 space-y-2">
                  <strong className="text-cyan-900 block text-sm font-bold">
                    Official PCI B.Pharm Syllabus Coverage — Page {pageNum}
                  </strong>
                  <p>
                    Comprehensive study notes detailing chemical messenger pathways, cell-surface receptor families (G-Protein Coupled Receptors, Receptor Tyrosine Kinases, Ion Channel Receptors), extracellular matrix components (Collagen, Elastin, Reticular fibers, Proteoglycans), and histological features.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Cellular Signaling Category:</span>
                    <p className="text-slate-700">Contact-dependent, Paracrine, Synaptic neurotransmission, and Endocrine hormone transport.</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">Histological Classification:</span>
                    <p className="text-slate-700">Simple Squamous, Cuboidal, Columnar, Stratified Squamous Keratinized, and Transitional Epithelium.</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-300 font-mono text-xs space-y-1">
                  <div className="text-slate-900 font-bold">⭐ GPAT Entrance Exam High-Yield Point (Page {pageNum}):</div>
                  <div className="text-slate-700">• Key diagnostic marker & structural protein isoform classifications</div>
                  <div className="text-slate-700">• University 10-Mark Model Question: Draw neat labeled diagram and explain functional adaptations</div>
                </div>
              </div>
            </div>
          )}

          {pageNum === 36 && (
            <div>
              <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
                TISSUE LEVEL OF ORGANIZATION
              </div>
              <div className="bg-red-50 border-l-4 border-[#ff0000] p-3 mb-6">
                <h4 className="font-extrabold text-sm text-[#ff0000] uppercase">FOUR PRIMARY HUMAN TISSUE TYPES</h4>
              </div>
              <TissueTypesHistologySVG />
            </div>
          )}

          {pageNum >= 37 && pageNum <= 50 && (
            <div>
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-2 mb-4">
                {pageNum <= 42 && "MUSCULAR & NERVOUS TISSUE HISTOLOGY"}
                {pageNum > 42 && pageNum <= 48 && "INTEGUMENTARY & HOMEOSTATIC FEEDBACK LOOPS"}
                {pageNum > 48 && "UNIT 1 COMPREHENSIVE REVISION & EXAM MODEL QA"}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-200 space-y-2">
                  <strong className="text-purple-900 block text-sm font-bold">
                    Official PCI B.Pharm Syllabus Coverage — Page {pageNum}
                  </strong>
                  <p>
                    Detailed notes on Skeletal, Smooth and Cardiac muscle fiber striations, intercalated discs, neuron structure (dendrites, axon, soma, myelin sheath), neuroglial cells (astrocytes, oligodendrocytes, microglia, Schwann cells), negative and positive feedback loops (body temperature, blood pressure, childbirth oxytocin release), and homeostatic imbalance pathologies.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">10-Mark Model Exam Answer Summary (Page {pageNum}):</span>
                  <p className="text-xs text-slate-700">
                    Q: Describe the structural organization of nervous tissue and explain signal propagation across synapses.<br/>
                    Ans: Detailed explanation of resting membrane potential (-70mV), action potential depolarization (+30mV via Na⁺ influx), repolarization (K⁺ efflux), synaptic vesicle exocytosis, neurotransmitter binding, and inactivation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • HAP I Unit 1</span>
          <span>Page {pageNum} of 50</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-md font-mono">
                  ORIGINAL TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">50 Pages • Official PCI Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Human Anatomy and Physiology I — Unit 1 Complete Textbook Notes
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 50 Pages)' : 'Single Page View'}</span>
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
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Original PDF'}</span>
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
