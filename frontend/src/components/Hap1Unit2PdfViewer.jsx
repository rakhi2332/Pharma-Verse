import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR UNIT 2 ---

const SkinAnatomyDiagramSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-64 h-64 shrink-0" viewBox="0 0 300 300" fill="none">
      <rect x="20" y="20" width="260" height="50" fill="#fecdd3" stroke="#e11d48" strokeWidth="3" rx="4"/>
      <text x="150" y="45" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="bold">EPIDERMIS (Stratified Squamous)</text>
      <line x1="20" y1="30" x2="280" y2="30" stroke="#fda4af" strokeWidth="1" strokeDasharray="3 3"/>
      <text x="30" y="28" fill="#be123c" fontSize="8" fontWeight="bold">1. Stratum Corneum (Keratinized)</text>
      <text x="30" y="38" fill="#be123c" fontSize="8">2. Stratum Lucidum</text>
      <text x="30" y="48" fill="#be123c" fontSize="8">3. Stratum Granulosum</text>
      <text x="30" y="58" fill="#be123c" fontSize="8">4. Stratum Spinosum</text>
      <text x="30" y="68" fill="#be123c" fontSize="8">5. Stratum Germinativum (Basale)</text>

      <rect x="20" y="70" width="260" height="130" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" rx="4"/>
      <text x="150" y="95" textAnchor="middle" fill="#9a3412" fontSize="12" fontWeight="bold">DERMIS (Vascular Connective Tissue)</text>

      <path d="M 180 20 L 175 160" stroke="#78350f" strokeWidth="8" strokeLinecap="round"/>
      <ellipse cx="173" cy="165" rx="10" ry="14" fill="#92400e"/>
      <path d="M 175 100 Q 210 110 230 90" stroke="#dc2626" strokeWidth="4" fill="none"/>
      <text x="235" y="90" fill="#991b1b" fontSize="8" fontWeight="bold">Arrector Pili Muscle</text>

      <circle cx="155" cy="115" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2"/>
      <text x="110" y="118" fill="#854d0e" fontSize="8" fontWeight="bold">Sebaceous Gland</text>

      <path d="M 70 120 Q 50 140 70 160 T 90 170" stroke="#0284c7" strokeWidth="4" fill="none"/>
      <circle cx="90" cy="170" r="10" fill="#bae6fd" stroke="#0369a1" strokeWidth="2"/>
      <text x="35" y="170" fill="#075985" fontSize="8" fontWeight="bold">Sweat Gland</text>

      <rect x="20" y="200" width="260" height="80" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" rx="4"/>
      <circle cx="50" cy="240" r="14" fill="#fde047" stroke="#eab308" strokeWidth="1"/>
      <circle cx="85" cy="240" r="14" fill="#fde047" stroke="#eab308" strokeWidth="1"/>
      <circle cx="120" cy="240" r="14" fill="#fde047" stroke="#eab308" strokeWidth="1"/>
      <text x="180" y="245" fill="#713f12" fontSize="11" fontWeight="bold">HYPODERMIS (Adipose Tissue)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 2.1: Anatomic Cross-Section of Human Skin & Layers</span>
      </div>
      <p className="leading-relaxed">
        Illustrating 3 major layers: <strong>Epidermis</strong> (5 stratified squamous strata), <strong>Dermis</strong> (fibroelastic tissue with Sebaceous & Sweat Glands), and <strong>Hypodermis</strong> (subcutaneous fat).
      </p>
    </div>
  </div>
);

const SynovialJointDiagramSVG = () => (
  <div className="my-4 p-4 border border-blue-300 rounded-2xl bg-[#eff6ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <path d="M 100 10 L 250 10 L 230 65 L 120 65 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="3"/>
      <text x="175" y="38" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">PROXIMAL BONE</text>
      <rect x="120" y="65" width="110" height="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" rx="2"/>

      <rect x="110" y="73" width="130" height="34" fill="#baefeb" stroke="#0d9488" strokeWidth="2" rx="4"/>
      <text x="175" y="94" textAnchor="middle" fill="#0f766e" fontSize="10" fontWeight="bold">Synovial Cavity (Synovial Fluid)</text>

      <rect x="120" y="107" width="110" height="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" rx="2"/>
      <path d="M 120 115 L 230 115 L 250 180 L 100 180 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="3"/>
      <text x="175" y="155" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">DISTAL BONE</text>

      <path d="M 100 50 C 70 80 70 100 100 130" stroke="#2563eb" strokeWidth="4" fill="none"/>
      <path d="M 250 50 C 280 80 280 100 250 130" stroke="#2563eb" strokeWidth="4" fill="none"/>
      <text x="35" y="95" fill="#1d4ed8" fontSize="9" fontWeight="bold">Joint Capsule</text>
      <text x="285" y="95" fill="#1d4ed8" fontSize="9" fontWeight="bold">Synovial Membrane</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-blue-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>Figure 2.2: Structure of Freely Movable Synovial Joint</span>
      </div>
      <p className="leading-relaxed">
        Key components: <strong>Articular Cartilage</strong>, <strong>Synovial Cavity</strong> (fluid filled), <strong>Articular Capsule</strong>, and supporting <strong>Ligaments</strong>.
      </p>
    </div>
  </div>
);

const BoneOsteonStructureSVG = () => (
  <div className="my-4 p-4 border border-amber-300 rounded-2xl bg-[#fffbe6] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      <circle cx="175" cy="100" r="80" fill="#fef3c7" stroke="#d97706" strokeWidth="4"/>
      <circle cx="175" cy="100" r="60" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2"/>
      <circle cx="175" cy="100" r="40" stroke="#b45309" strokeWidth="2"/>
      <circle cx="175" cy="100" r="18" fill="#ef4444" stroke="#991b1b" strokeWidth="2"/>
      <text x="175" y="104" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Haversian Canal</text>
      <line x1="175" y1="20" x2="175" y2="180" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2"/>
      <text x="75" y="45" fill="#78350f" fontSize="9" fontWeight="bold">Concentric Lamellae</text>
      <text x="270" y="145" fill="#78350f" fontSize="9" fontWeight="bold">Lacunae with Osteocytes</text>
    </svg>
    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-amber-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <span>Figure 2.3: Compact Bone Osteon (Haversian System) Anatomy</span>
      </div>
      <p className="leading-relaxed">
        Showing central <strong>Haversian canal</strong> (containing blood vessels & nerves), surrounded by <strong>concentric lamellae</strong> of calcified bone matrix and <strong>lacunae</strong> housing osteocytes.
      </p>
    </div>
  </div>
);

const SarcomereContractionSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-52 shrink-0" viewBox="0 0 350 200" fill="none">
      {/* Z Lines */}
      <line x1="40" y1="20" x2="40" y2="160" stroke="#dc2626" strokeWidth="4"/>
      <line x1="310" y1="20" x2="310" y2="160" stroke="#dc2626" strokeWidth="4"/>
      <text x="40" y="180" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Z Line</text>
      <text x="310" y="180" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">Z Line</text>

      {/* Thick Myosin Filaments */}
      <rect x="100" y="60" width="150" height="12" fill="#2563eb" rx="3"/>
      <rect x="100" y="110" width="150" height="12" fill="#2563eb" rx="3"/>
      <text x="175" y="100" textAnchor="middle" fill="#1d4ed8" fontSize="10" fontWeight="bold">Thick Myosin Filament (A Band)</text>

      {/* Thin Actin Filaments */}
      <line x1="40" y1="50" x2="140" y2="50" stroke="#16a34a" strokeWidth="3"/>
      <line x1="40" y1="130" x2="140" y2="130" stroke="#16a34a" strokeWidth="3"/>
      <line x1="210" y1="50" x2="310" y2="50" stroke="#16a34a" strokeWidth="3"/>
      <line x1="210" y1="130" x2="310" y2="130" stroke="#16a34a" strokeWidth="3"/>
      <text x="90" y="40" fill="#15803d" fontSize="9" fontWeight="bold">Thin Actin Filament</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 2.4: Sarcomere Sliding Filament Mechanism</span>
      </div>
      <p className="leading-relaxed">
        Demonstrating the functional contractile unit: <strong>Z Lines</strong>, <strong>Thick Myosin</strong> filaments, and <strong>Thin Actin</strong> filaments sliding together during Ca²⁺ triggered contraction.
      </p>
    </div>
  </div>
);

export default function Hap1Unit2PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 25;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`unit2-page-${newPage}`);
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
      filename:     'Human_Anatomy_and_Physiology_1_Unit_2_Official_Notes.pdf',
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

  // Generate All 25 Pages with rich content
  const pagesList = Array.from({ length: 25 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`unit2-page-${pageNum}`}
        id={`unit2-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-10 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-rose-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3 px-6 text-center font-black tracking-widest text-lg sm:text-xl rounded-xs mb-6 shadow-md">
            HUMAN ANATOMY & PHYSIOLOGY I — UNIT II ({pageNum}/25)
          </div>

          {pageNum === 1 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                INTEGUMENTARY SYSTEM
              </h2>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base">Points Covered in this Topic:</strong>
                <ol className="list-decimal list-inside space-y-1 font-semibold text-slate-800">
                  <li>1. INTRODUCTION TO SKIN LAYERS</li>
                  <li>2. STRUCTURE OF EPIDERMIS & DERMIS</li>
                  <li>3. FUNCTIONS OF SKIN & CUTANEOUS GLANDS</li>
                  <li>4. REGULATION OF BODY TEMPERATURE</li>
                  <li>5. SKELETAL SYSTEM DIVISIONS & OSTEOLOGY</li>
                  <li>6. JOINTS & MUSCLE CONTRACTION MECHANISM</li>
                </ol>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-slate-800">
                <h3 className="text-[#00b0f0] font-bold text-base">INTRODUCTION</h3>
                <ul className="list-disc list-inside space-y-2 font-medium">
                  <li>The integumentary system is the largest organ system in the human body.</li>
                  <li>Forms a tough protective covering direct with external environment.</li>
                  <li>Regulates body temperature, synthesizes Vitamin D, and detects cutaneous sensations.</li>
                  <li>Skin consists of two main anatomical layers: <strong>Epidermis</strong> and <strong>Dermis</strong>.</li>
                </ul>
              </div>
              <SkinAnatomyDiagramSVG />
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                STRUCTURE OF SKIN — EPIDERMIS (5 STRATA)
              </h3>
              <p className="text-sm text-slate-800 font-medium">
                The epidermis is composed of keratinized stratified squamous epithelium divided into 5 distinct strata:
              </p>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 block">1. Stratum Corneum:</strong> Most superficial layer containing 25-30 rows of flattened dead keratinized cells without nuclei.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 block">2. Stratum Lucidum:</strong> Present only in thick skin of fingertips, palms, and soles. Clear translucent layer.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 block">3. Stratum Granulosum:</strong> 3-5 rows of flattened keratinocytes undergoing apoptosis filled with dark keratohyalin granules.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 block">4. Stratum Spinosum:</strong> 8-10 rows of polyhedral keratinocytes with spiny desmosome attachments and Langerhans antigen-presenting cells.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 block">5. Stratum Germinativum (Basale):</strong> Single row of cuboidal stem cells actively dividing, melanocytes, and Merkel tactile discs.
                </div>
              </div>
            </div>
          )}

          {pageNum === 3 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                DERMIS & CUTANEOUS GLANDS
              </h3>
              <div className="space-y-3 text-sm text-slate-800 font-medium">
                <p>The dermis is the vascular connective tissue layer beneath the epidermis, composed of papillary and reticular regions.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                    <strong className="text-amber-900 block text-sm mb-1">Sebaceous Glands:</strong>
                    Holocrine glands secreting sebum (oil) into hair follicles to prevent skin drying and inhibit bacterial growth.
                  </div>
                  <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200">
                    <strong className="text-sky-900 block text-sm mb-1">Sweat Glands (Sudoriferous):</strong>
                    Eccrine Glands (secrete watery sweat for evaporative cooling) & Apocrine Glands (axilla & groin; viscous odoriferous secretion).
                  </div>
                </div>
              </div>
            </div>
          )}

          {pageNum === 4 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                FUNCTIONS OF SKIN & BODY TEMPERATURE REGULATION
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-800 font-medium">
                <li><strong>Protection</strong>: Physical, chemical, and biological barrier against UV rays, microbes, and abrasion.</li>
                <li><strong>Thermoregulation</strong>: Managed by hypothalamic thermostat via cutaneous vasodilation/vasoconstriction and sweating.</li>
                <li><strong>Cutaneous Sensation</strong>: Receptors for touch (Meissner corpuscles), pressure (Pacinian), pain (free nerve endings), and temperature.</li>
                <li><strong>Excretion & Absorption</strong>: Eliminates water, salts, urea; absorbs lipid-soluble drugs (transdermal patches).</li>
              </ol>
            </div>
          )}

          {pageNum === 5 && (
            <div className="space-y-4">
              <h2 className="text-[#ff0000] font-extrabold text-xl border-b-2 border-red-200 pb-1">
                JOINTS (ARTICULATIONS)
              </h2>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3">
                <h3 className="text-cyan-800 font-bold text-base">CLASSIFICATION OF JOINTS</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-800 font-medium">
                  <li><strong>1. Fibrous Joints (Synarthroses)</strong>: Immovable. Sutures of skull, Syndesmoses, Gomphoses.</li>
                  <li><strong>2. Cartilaginous Joints (Amphiarthroses)</strong>: Slightly movable. Synchondroses (hyaline cartilage) & Symphyses (fibrocartilage).</li>
                  <li><strong>3. Synovial Joints (Diarthroses)</strong>: Freely movable featuring a fluid-filled synovial cavity.</li>
                </ul>
              </div>
              <SynovialJointDiagramSVG />
            </div>
          )}

          {pageNum === 6 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                6 TYPES OF SYNOVIAL JOINTS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">1. Ball & Socket Joint:</strong> Multi-axial (Shoulder & Hip joints).
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">2. Hinge Joint:</strong> Uni-axial flexion/extension (Elbow & Knee joints).
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">3. Pivot Joint:</strong> Rotational movement (Atlas-Axis & Radioulnar joints).
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">4. Condyloid Joint:</strong> Bi-axial movement (Wrist joint).
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">5. Saddle Joint:</strong> Bi-axial thumb opposable joint.
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <strong className="text-blue-900 block font-bold">6. Gliding (Plane) Joint:</strong> Sliding movement (Intercarpal joints).
                </div>
              </div>
            </div>
          )}

          {pageNum === 8 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                SKELETAL SYSTEM OSTEOLOGY & BONE HISTOLOGY
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                The adult skeleton contains 206 bones divided into Axial Skeleton (80 bones: Skull, Vertebrae, Ribs) and Appendicular Skeleton (126 bones: Pectoral/Pelvic girdles and Limbs). Compact bone tissue is organized into functional units called <strong>Osteons (Haversian systems)</strong>.
              </p>
              <BoneOsteonStructureSVG />
            </div>
          )}

          {pageNum === 16 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                SKELETAL MUSCLE CONTRACTION & SLIDING FILAMENT THEORY
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Muscle contraction is triggered by action potentials arriving at the neuromuscular junction releasing Acetylcholine (ACh), generating a muscle action potential that travels along T-tubules to release Ca²⁺ from the Sarcoplasmic Reticulum into the sarcoplasm.
              </p>
              <SarcomereContractionSVG />
            </div>
          )}

          {pageNum !== 1 && pageNum !== 2 && pageNum !== 3 && pageNum !== 4 && pageNum !== 5 && pageNum !== 6 && pageNum !== 8 && pageNum !== 16 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 12 && "SKELETAL SYSTEM DIVISIONS & VERTEBRAL COLUMN"}
                {pageNum > 12 && pageNum <= 18 && "SKELETAL MUSCLE HIERARCHY, SARCOMERE & NEUROMUSCULAR JUNCTION"}
                {pageNum > 18 && pageNum <= 22 && "SLIDING FILAMENT MECHANISM & MUSCLE TONE"}
                {pageNum > 22 && "SKELETAL DISORDERS (OSTEOPOROSIS, RICKETS, ARTHRITIS)"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>PCI B.Pharm Official Syllabus Notes — Page {pageNum}:</strong><br/>
                  Comprehensive textbook coverage of skeletal osteology, cranial and facial bone sutures, vertebral column regions (Cervical C1-C7, Thoracic T1-T12, Lumbar L1-L5, Sacrum, Coccyx), appendicular girdle anatomy, muscle action potentials, excitation-contraction coupling, ATP hydrolysis by myosin cross-bridges, neuromuscular junction neurotransmission, and clinical skeletal/muscular pathologies.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Terminology & Model Exam Answer Bank (Page {pageNum}):</div>
                  <div>• High-yield GPAT entrance exam mnemonics & diagnostic guidelines</div>
                  <div>• Structural classification & functional organization of bone matrix and sarcomere units</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • HAP I Unit 2</span>
          <span>Page {pageNum} of 25</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-600 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">25 Pages • Official Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Human Anatomy and Physiology I — Unit 2: Integumentary System, Skeletal System & Joints
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 25 Pages)' : 'Single Page View'}</span>
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
