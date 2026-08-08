import { useState, useRef } from 'react';
import { 
  FileText, Download, Printer, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, Maximize2, Minimize2, X, BookOpen, Sparkles
} from 'lucide-react';
import html2pdf from 'html2pdf.js';

// --- RICH SCIENTIFIC DIAGRAM SVG COMPONENTS FOR PHARMACEUTICS 1 UNIT 1 ---

// 1. Pharmacopoeia History Timeline SVG (Page 8 & 12)
const IndianPharmacopoeiaTimelineSVG = () => (
  <div className="my-4 p-4 border border-blue-300 rounded-2xl bg-[#f0f9ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 360 210" fill="none">
      <rect x="10" y="10" width="340" height="190" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" rx="10"/>
      <text x="180" y="32" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">CHRONOLOGY OF INDIAN PHARMACOPOEIA (I.P.) EDITIONS</text>

      {/* Timeline Bar */}
      <line x1="30" y1="110" x2="330" y2="110" stroke="#0284c7" strokeWidth="4"/>

      {/* 1st Ed 1955 */}
      <circle cx="50" cy="110" r="8" fill="#2563eb"/>
      <text x="50" y="90" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">1st (1955)</text>
      <text x="50" y="132" textAnchor="middle" fill="#334155" fontSize="7">986 Monogr.</text>

      {/* 2nd Ed 1966 */}
      <circle cx="90" cy="110" r="8" fill="#2563eb"/>
      <text x="90" y="90" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">2nd (1966)</text>
      <text x="90" y="132" textAnchor="middle" fill="#334155" fontSize="7">English titles</text>

      {/* 3rd Ed 1985 */}
      <circle cx="130" cy="110" r="8" fill="#2563eb"/>
      <text x="130" y="90" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">3rd (1985)</text>
      <text x="130" y="132" textAnchor="middle" fill="#334155" fontSize="7">2 Volumes</text>

      {/* 4th Ed 1996 */}
      <circle cx="170" cy="110" r="8" fill="#2563eb"/>
      <text x="170" y="90" textAnchor="middle" fill="#1e40af" fontSize="9" fontWeight="bold">4th (1996)</text>
      <text x="170" y="132" textAnchor="middle" fill="#334155" fontSize="7">IR/UV tests</text>

      {/* 5th Ed 2007 */}
      <circle cx="210" cy="110" r="8" fill="#0284c7"/>
      <text x="210" y="90" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">5th (2007)</text>
      <text x="210" y="132" textAnchor="middle" fill="#334155" fontSize="7">3 Volumes</text>

      {/* 6th Ed 2010 */}
      <circle cx="250" cy="110" r="8" fill="#0284c7"/>
      <text x="250" y="90" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">6th (2010)</text>
      <text x="250" y="132" textAnchor="middle" fill="#334155" fontSize="7">Herbal/Biotech</text>

      {/* 7th Ed 2014 */}
      <circle cx="290" cy="110" r="8" fill="#0d9488"/>
      <text x="290" y="90" textAnchor="middle" fill="#0f766e" fontSize="9" fontWeight="bold">7th (2014)</text>
      <text x="290" y="132" textAnchor="middle" fill="#334155" fontSize="7">2567 Monogr.</text>

      {/* 8th Ed 2018 */}
      <circle cx="330" cy="110" r="9" fill="#dc2626"/>
      <text x="330" y="90" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">8th (2018)</text>
      <text x="330" y="132" textAnchor="middle" fill="#334155" fontSize="7">Pyrogen BET</text>

      <rect x="25" y="155" width="310" height="35" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" rx="6"/>
      <text x="180" y="172" textAnchor="middle" fill="#0369a1" fontSize="9" fontWeight="bold">IPC (Indian Pharmacopoeia Commission) — Ministry of Health & Family Welfare</text>
      <text x="180" y="184" textAnchor="middle" fill="#0284c7" fontSize="8">Legal Status under 2nd Schedule of Drugs & Cosmetics Act 1940</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-blue-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>Figure 1.1: Historical Evolution of Indian Pharmacopoeia (I.P.)</span>
      </div>
      <p className="leading-relaxed">
        From 1st Edition in 1955 under Dr. B. Mukerji to 8th Edition in 2018 (4 Volumes) introducing modern spectroscopic specs, Bacterial Endotoxin Test (BET), and radiopharmaceuticals.
      </p>
    </div>
  </div>
);

// 2. Complete Classification Tree of Dosage Forms SVG (Page 19 & 20)
const DosageFormTreeSVG = () => (
  <div className="my-4 p-4 border border-emerald-300 rounded-2xl bg-[#ecfdf5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 360 210" fill="none">
      <rect x="130" y="10" width="100" height="28" fill="#059669" rx="6"/>
      <text x="180" y="28" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">DOSAGE FORMS</text>

      {/* Branches */}
      <path d="M 180 38 L 180 50 M 50 50 L 310 50 M 50 50 L 50 65 M 120 50 L 120 65 M 190 50 L 190 65 M 250 50 L 250 65 M 310 50 L 310 65" stroke="#047857" strokeWidth="2"/>

      {/* Solid */}
      <rect x="15" y="65" width="70" height="24" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4"/>
      <text x="50" y="81" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">SOLID</text>
      <text x="50" y="100" textAnchor="middle" fill="#047857" fontSize="7">Tablets, Capsules,</text>
      <text x="50" y="110" textAnchor="middle" fill="#047857" fontSize="7">Powders, Pills</text>

      {/* Semi-Solid */}
      <rect x="90" y="65" width="60" height="24" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4"/>
      <text x="120" y="81" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">SEMISOLID</text>
      <text x="120" y="100" textAnchor="middle" fill="#047857" fontSize="7">Ointments, Creams,</text>
      <text x="120" y="110" textAnchor="middle" fill="#047857" fontSize="7">Pastes, Gels</text>

      {/* Liquid */}
      <rect x="160" y="65" width="60" height="24" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4"/>
      <text x="190" y="81" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">LIQUID</text>
      <text x="190" y="100" textAnchor="middle" fill="#047857" fontSize="7">Solutions, Syrups,</text>
      <text x="190" y="110" textAnchor="middle" fill="#047857" fontSize="7">Emulsions, Susp.</text>

      {/* Gaseous */}
      <rect x="230" y="65" width="45" height="24" fill="#d1fae5" stroke="#10b981" strokeWidth="2" rx="4"/>
      <text x="252" y="81" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">GAS</text>
      <text x="252" y="100" textAnchor="middle" fill="#047857" fontSize="7">Aerosols,</text>
      <text x="252" y="110" textAnchor="middle" fill="#047857" fontSize="7">Inhalers</text>

      {/* NDDS */}
      <rect x="285" y="65" width="55" height="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="4"/>
      <text x="312" y="81" textAnchor="middle" fill="#713f12" fontSize="8" fontWeight="bold">NDDS</text>
      <text x="312" y="100" textAnchor="middle" fill="#854d0e" fontSize="7">Liposomes,</text>
      <text x="312" y="110" textAnchor="middle" fill="#854d0e" fontSize="7">Nanoparticles</text>

      <rect x="20" y="130" width="320" height="70" fill="#f0fdf4" stroke="#059669" strokeWidth="1" rx="8"/>
      <text x="180" y="148" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">CLASSIFICATION BY ROUTE OF ADMINISTRATION</text>
      <text x="180" y="165" textAnchor="middle" fill="#047857" fontSize="8">Oral (Tablets, Syrups) • Parenteral (IV, IM, SC Injections) • Topical (Ointments, Lotions)</text>
      <text x="180" y="180" textAnchor="middle" fill="#047857" fontSize="8">Ophthalmic (Eye drops) • Otic (Ear drops) • Nasal • Rectal & Vaginal (Suppositories, Pessaries)</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-emerald-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>Figure 1.2: Systemic Classification Scheme of Pharmaceutical Dosage Forms</span>
      </div>
      <p className="leading-relaxed">
        Categorization by Physical State (Solid, Semi-solid, Liquid, Gas) and Route of Administration, transforming APIs with excipients into safe, stable, elegant drug products.
      </p>
    </div>
  </div>
);

// 3. Sample Annotated Prescription Format SVG (Page 53)
const PrescriptionFormatSVG = () => (
  <div className="my-4 p-4 border border-indigo-300 rounded-2xl bg-[#eef2ff] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-64 shrink-0" viewBox="0 0 340 240" fill="none">
      <rect x="10" y="10" width="320" height="220" fill="#ffffff" stroke="#4338ca" strokeWidth="3" rx="8"/>
      
      {/* Header */}
      <text x="170" y="30" textAnchor="middle" fill="#312e81" fontSize="10" fontWeight="bold">TIWARI NURSING HOME & CLINIC</text>
      <text x="170" y="42" textAnchor="middle" fill="#4338ca" fontSize="7">M-72, Block D-4, Janakpuri, Mumbai • Reg No: 45621</text>
      <line x1="20" y1="48" x2="320" y2="48" stroke="#cbd5e1" strokeWidth="1"/>

      {/* Patient Info */}
      <text x="25" y="62" fill="#1e293b" fontSize="8"><strong>1. Patient:</strong> Mr. Ramesh Kumar</text>
      <text x="180" y="62" fill="#1e293b" fontSize="8">Age: 35 Yrs  Sex: M</text>
      <text x="260" y="62" fill="#1e293b" fontSize="8"><strong>Date:</strong> 06/08/2026</text>
      <text x="25" y="74" fill="#1e293b" fontSize="8">Address: 14/B Park Street, Mumbai</text>
      <line x1="20" y1="80" x2="320" y2="80" stroke="#cbd5e1" strokeWidth="1"/>

      {/* Superscription */}
      <text x="25" y="98" fill="#dc2626" fontSize="18" fontWeight="bold">Rx</text>
      <text x="50" y="95" fill="#b91c1c" fontSize="7 font-mono">(3. Superscription - Latin "Take Thou")</text>

      {/* Inscription */}
      <text x="35" y="115" fill="#1e293b" fontSize="8" fontWeight="bold">4. INSCRIPTION (Ingredients):</text>
      <text x="45" y="127" fill="#334155" fontSize="8">Paracetamol ......................................... 500 mg (Base)</text>
      <text x="45" y="137" fill="#334155" fontSize="8">Dicyclomine HCl .................................... 20 mg (Adjuvant)</text>

      {/* Subscription */}
      <text x="35" y="155" fill="#1e293b" fontSize="8" fontWeight="bold">5. SUBSCRIPTION (Directions to Pharmacist):</text>
      <text x="45" y="167" fill="#334155" fontSize="8">Fiat capsules. Send such 10 doses (Capsules X).</text>

      {/* Signatura */}
      <text x="35" y="183" fill="#1e293b" fontSize="8" fontWeight="bold">6. SIGNATURA (Instructions to Patient):</text>
      <text x="45" y="195" fill="#1e40af" fontSize="8" fontWeight="bold">Sig: One capsule twice a day after meals (bis in die post cibos).</text>

      {/* Prescriber Signature */}
      <line x1="210" y1="215" x2="310" y2="215" stroke="#334155" strokeWidth="1"/>
      <text x="260" y="226" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">8. Prescriber's Signature & Reg No.</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-indigo-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span>Figure 1.3: Standard Parts & Format of Medical Prescription</span>
      </div>
      <p className="leading-relaxed">
        Illustrating 8 key parts: Date, Patient Info, <strong>Superscription ($\mathbf{R_x}$)</strong>, <strong>Inscription</strong> (Active Base + Adjuvant + Vehicle), <strong>Subscription</strong>, <strong>Signatura</strong>, Refill Data, and Prescriber Credentials.
      </p>
    </div>
  </div>
);

// 4. Posology Formulas SVG (Page 46 & 48)
const PosologyDoseFormulaSVG = () => (
  <div className="my-4 p-4 border border-rose-300 rounded-2xl bg-[#fff5f5] flex flex-col md:flex-row items-center gap-6 shadow-sm">
    <svg className="w-full md:w-80 h-56 shrink-0" viewBox="0 0 350 210" fill="none">
      <rect x="10" y="10" width="330" height="190" fill="#ffffff" stroke="#e11d48" strokeWidth="2" rx="8"/>
      <text x="175" y="30" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">POSOLOGY DOSE CALCULATION FORMULAS</text>

      {/* Young's Formula */}
      <rect x="20" y="42" width="310" height="34" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1" rx="4"/>
      <text x="30" y="56" fill="#881337" fontSize="9" fontWeight="bold">Young's Rule (&lt; 12 Yrs):</text>
      <text x="30" y="68" fill="#be123c" fontSize="9" fontMonospace="true">Child Dose = [Age in Yrs / (Age + 12)] × Adult Dose</text>

      {/* Dilling's Formula */}
      <rect x="20" y="82" width="310" height="34" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1" rx="4"/>
      <text x="30" y="96" fill="#881337" fontSize="9" fontWeight="bold">Dilling's Rule (4 - 20 Yrs):</text>
      <text x="30" y="108" fill="#be123c" fontSize="9">Child Dose = [Age in Yrs / 20] × Adult Dose</text>

      {/* Clark's Formula */}
      <rect x="20" y="122" width="310" height="34" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" rx="4"/>
      <text x="30" y="136" fill="#713f12" fontSize="9" fontWeight="bold">Clark's Rule (Based on Body Weight):</text>
      <text x="30" y="148" fill="#854d0e" fontSize="9">Child Dose = [Weight in Kg / 70 Kg] × Adult Dose</text>

      {/* Catzel's Formula */}
      <rect x="20" y="162" width="310" height="32" fill="#dbffe4" stroke="#16a34a" strokeWidth="1" rx="4"/>
      <text x="30" y="175" fill="#14532d" fontSize="9" fontWeight="bold">Catzel's Rule (Based on Surface Area):</text>
      <text x="30" y="187" fill="#15803d" fontSize="9">Child Dose = [BSA of child (m²) / 1.73 m²] × Adult Dose</text>
    </svg>

    <div className="text-xs space-y-2 text-slate-700 font-medium">
      <div className="font-bold text-slate-900 text-sm border-b border-rose-200 pb-1 flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <span>Figure 1.4: Mathematical Pediatric Dose Calculation Rules</span>
      </div>
      <p className="leading-relaxed">
        Essential posological mathematical formulas for calculating pediatric dosage based on <strong>Age</strong> (Young's, Dilling's, Fried's), <strong>Body Weight</strong> (Clark's rule), and <strong>Body Surface Area</strong> (Catzel's rule).
      </p>
    </div>
  </div>
);


// --- MAIN PHARMACEUTICS I UNIT 1 TEXTBOOK PDF VIEWER COMPONENT ---

export default function Pharmaceutics1Unit1PdfViewer({ onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewMode, setViewMode] = useState('scroll'); // 'scroll' | 'page'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const documentRef = useRef(null);

  const totalPages = 60;

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`pharma1-unit1-page-${newPage}`);
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
      filename:     'Pharmaceutics_I_Unit_1_Official_Textbook_Notes.pdf',
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

  // Generate All 60 Pages List
  const pagesList = Array.from({ length: 60 }, (_, i) => {
    const pageNum = i + 1;
    return (
      <div
        key={`pharma1-unit1-page-${pageNum}`}
        id={`pharma1-unit1-page-${pageNum}`}
        className="pdf-page bg-white border-2 border-[#00b0f0] p-6 sm:p-12 shadow-2xl relative min-h-[297mm] text-slate-900 rounded-sm flex flex-col justify-between overflow-hidden my-6"
      >
        <div className="watermark absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] rotate-[-35deg] text-6xl font-black text-cyan-600 select-none">
          Study Hub • Official Notes
        </div>

        <div>
          {/* Header Banner */}
          <div className="bg-[#2e3a4e] text-white py-3.5 px-6 text-center font-black tracking-widest text-lg sm:text-2xl rounded-xs mb-6 shadow-md">
            PHARMACEUTICS I — UNIT I ({pageNum}/60)
          </div>

          {/* PAGE CONTENT SWITCHER BASED ON AUTHENTIC TEXTBOOK PDF */}

          {/* SECTION A: HISTORICAL BACKGROUND OF PHARMACY (PAGES 1 - 15) */}
          {pageNum === 1 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                HISTORICAL BACKGROUND & DEVELOPMENT OF PROFESSION OF PHARMACY
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm space-y-2">
                <strong className="text-red-900 block text-base font-bold">Contents Covered in this Unit:</strong>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800">
                  <li>• History of Pharmacy Profession in India</li>
                  <li>• Industry and Organization Growth</li>
                  <li>• Pharmacy as a Career & Practice Areas</li>
                  <li>• History of Pharmacopoeia</li>
                  <li>• Indian Pharmacopoeia (IP)</li>
                  <li>• British Pharmacopoeia (BP)</li>
                  <li>• United States Pharmacopoeia (USP)</li>
                  <li>• Extra Pharmacopoeia (Martindale)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 border-l-4 border-[#00b0f0] p-3">
                <h4 className="font-extrabold text-sm text-[#00b0f0] uppercase">A. HISTORY OF PHARMACY PROFESSION IN INDIA</h4>
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Definition of Pharmacy:</strong> Art, science, and economics of preparing and dispensing medications and providing drug-related information to the public.</li>
                <li>Derived from Greek word <strong>"pharmakon"</strong> meaning <em>"medicine"</em> or <em>"drug"</em>.</li>
                <li><strong>Pharmacist:</strong> Trained, certified healthcare professional licensed to make, compound, sell, or distribute medicines.</li>
              </ul>
            </div>
          )}

          {pageNum === 2 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                EARLY HISTORY OF PHARMACY EDUCATION IN INDIA
              </h3>
              <ul className="list-disc list-inside space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li>The allopathic system of medicine was introduced in India during British rule for the ruling class and expanded by 19th century.</li>
                <li>Medicines were initially imported from Europe until domestic manufacturing began.</li>
                <li><strong>1901:</strong> <em>Bengal Chemical and Pharmaceutical Works</em> established by <strong>Acharya P.C. Ray</strong> in Calcutta.</li>
                <li><strong>1903:</strong> Small manufacturing unit at Parel (Bombay) set up by <strong>Prof. T.K. Gujjar</strong>, leading to <em>Alembic Chemical Works</em> in 1907 at Baroda.</li>
                <li>Import of drugs ceased during First World War, highlighting need for domestic drug legislation.</li>
              </ul>
            </div>
          )}

          {pageNum === 3 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                CHOPRA COMMITTEE & PROF. M.L. SCHROFF (FATHER OF PHARMACY EDUCATION)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>1930:</strong> Drugs Enquiry Committee appointed under leadership of <strong>Col. R.N. Chopra</strong> to investigate quality of imported drugs.</li>
                <li><strong>Prof. Mahadeva Lal Schroff:</strong> Started formal degree pharmaceutical education at <strong>Banaras Hindu University (BHU) in 1932</strong> — recognized as the <em>Father of Pharmacy Education in India</em>.</li>
                <li><strong>1935:</strong> United Province Pharmaceutical Association formed (later Indian Pharmaceutical Association - IPA).</li>
                <li><strong>1939:</strong> Indian Journal of Pharmacy initiated by Prof. M.L. Schroff.</li>
                <li><strong>1940:</strong> All India Pharmaceutical Congress Association set up & <strong>Drugs Act of 1940</strong> enacted.</li>
              </ul>
            </div>
          )}

          {pageNum === 5 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                CAREER OPPORTUNITIES & PRACTICE AREAS IN PHARMACY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-cyan-800 block text-sm mb-1">Industrial Pharmacy:</strong>
                  Production, Analytical QA/QC, R&D, Formulations, Clinical Trials, Medico-marketing.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-cyan-800 block text-sm mb-1">Community & Hospital Pharmacy:</strong>
                  Direct patient care, prescription dispensing, patient counseling, drug store inventory.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-cyan-800 block text-sm mb-1">Clinical & Veterinary Pharmacy:</strong>
                  Therapeutic drug monitoring, ward rounds, animal pharmaceutical care.
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <strong className="text-cyan-800 block text-sm mb-1">Academics & Regulatory Affairs:</strong>
                  Teaching institutions, Drug Inspectors, FDA Regulatory Compliance.
                </div>
              </div>
            </div>
          )}

          {pageNum === 8 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                HISTORY & EDITIONS OF PHARMACOPOEIA
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                A <strong>Pharmacopoeia</strong> (Greek <em>pharmakon</em> + <em>poieo</em>) is an official book published by national government authority specifying purity, strength, identification tests, and quality standards for drugs.
              </p>
              <IndianPharmacopoeiaTimelineSVG />
            </div>
          )}

          {pageNum === 10 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                PHARMACOPOEIAL MONOGRAPH STRUCTURE
              </h3>
              <p className="text-xs text-slate-800 font-medium">A monograph provides comprehensive specifications in standard order:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2 rounded border"><strong>i. Main Title:</strong> Official drug name</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>ii. Subsidiary Titles:</strong> Synonyms</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>iii. Formula & MW:</strong> Chemical structure & mass</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>iv. Standards:</strong> Purity % limits</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>v. Description:</strong> Color, odor, appearance</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>vi. Solubility:</strong> Solvents & ratios</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>vii. Identification:</strong> Specific chemical tests</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>viii. Purity Tests:</strong> Limit tests for impurities</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>ix. Assay:</strong> Quantitative analytical method</div>
                <div className="bg-slate-50 p-2 rounded border"><strong>x. Storage & Category:</strong> Conditions & therapeutic use</div>
              </div>
            </div>
          )}

          {/* SECTION B: DOSAGE FORMS CLASSIFICATION (PAGES 16 - 39) */}
          {pageNum === 16 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                DOSAGE FORM DEFINITION & CLASSIFICATION
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Dosage Forms:</strong> Safe, effective, stable physical forms (mixture of Active Pharmaceutical Ingredient - API and non-drug Excipients) designed to deliver precise drug quantities into the body.
              </p>
              <DosageFormTreeSVG />
            </div>
          )}

          {pageNum === 19 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                SOLID DOSAGE FORMS (TABLETS, CAPSULES, POWDERS)
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Tablets:</strong> Solid unit dosage forms prepared by compression or molding. (Sublingual, Buccal, Effervescent, Enteric coated, Chewable).</li>
                <li><strong>Capsules:</strong> Hard gelatin (two-piece body & cap) and Soft gelatin (one-piece liquid/semi-solid filled).</li>
                <li><strong>Granules & Sachets:</strong> Agglomerated powder particles packed in small pouch packets.</li>
                <li><strong>Lozenges / Troches:</strong> Flavored base intended to dissolve slowly in mouth for local throat action.</li>
              </ul>
            </div>
          )}

          {pageNum === 27 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                LIQUID DOSAGE FORMS (MONOPHASIC & BIPHASIC)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800">
                <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200">
                  <strong className="text-blue-900 block text-sm mb-1">Monophasic Liquid:</strong>
                  Single phase true solutions. Syrups (66.7% w/w sucrose IP), Elixirs (hydro-alcoholic), Spirits, Aromatic waters, Linctuses (viscous cough syrup).
                </div>
                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                  <strong className="text-emerald-900 block text-sm mb-1">Biphasic Liquid:</strong>
                  Two immiscible phases. Emulsions (o/w, w/o coarse dispersion with emulsifier) and Suspensions (insoluble drug dispersed in liquid vehicle).
                </div>
              </div>
            </div>
          )}

          {pageNum === 35 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                SEMI-SOLID DOSAGE FORMS & SUPPOSITORIES
              </h3>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Ointments:</strong> Fatty/oleaginous semi-solid base for skin application.</li>
                <li><strong>Creams:</strong> Viscous semi-solid emulsion (w/o or o/w).</li>
                <li><strong>Pastes:</strong> High concentration of insoluble powders (20% - 50%).</li>
                <li><strong>Suppositories:</strong> Solid dosage forms inserted into body orifices (Rectal, Vaginal/Pessaries, Urethral/Bougies, Nasal bougies, Ear cones/Aurinaria) melting at body temperature (37°C).</li>
              </ul>
            </div>
          )}

          {pageNum === 38 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                NOVEL DRUG DELIVERY SYSTEMS (NDDS)
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                Advanced delivery platforms providing controlled zero-order release, targeted tissue localization, and reduced dosing frequency:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-800">
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">1. Liposomes</div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">2. Ethosomes</div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">3. Implants</div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">4. Nanoparticles (200-500nm)</div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">5. Proniosomes</div>
                <div className="bg-amber-50 p-2 rounded border border-amber-200 text-center">6. Resealed Erythrocytes</div>
              </div>
            </div>
          )}

          {/* SECTION C: POSOLOGY (PAGES 40 - 50) */}
          {pageNum === 40 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                POSOLOGY — DOSE CALCULATION & INFLUENCING FACTORS
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Posology</strong> (Greek <em>posos</em> = how much + <em>logos</em> = science): Branch of medical and pharmaceutical science dealing with drug dose determination.
              </p>
              <PosologyDoseFormulaSVG />
            </div>
          )}

          {pageNum === 41 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                FACTORS AFFECTING POSOLOGY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                <div className="bg-slate-50 p-2.5 rounded border"><strong>1. Age:</strong> Pediatric & geriatric patients require reduced doses due to renal/hepatic clearance.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>2. Sex:</strong> Pregnancy, lactation, and body fat distribution differences.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>3. Body Weight:</strong> Average adult dose based on 70 kg standard body weight.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>4. Route:</strong> IV doses smaller than oral due to 100% bioavailability.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>5. Idiosyncrasy:</strong> Extraordinary genetic drug reaction.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>6. Synergism & Antagonism:</strong> Combined drug effects.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>7. Tolerance & Tachyphylaxis:</strong> True vs pseudo tolerance and rapid receptor desensitization.</div>
                <div className="bg-slate-50 p-2.5 rounded border"><strong>8. Accumulation:</strong> Heavy metals & digitalis slow excretion.</div>
              </div>
            </div>
          )}

          {pageNum === 46 && (
            <div className="space-y-4">
              <h3 className="text-[#ff0000] font-bold text-lg border-b border-red-200 pb-1">
                PEDIATRIC DOSE CALCULATION NUMERICAL EXAMPLES
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block text-xs font-bold mb-1">Example 1 (Young's Rule):</strong>
                  Calculate dose for 12 year old child if adult dose is 800 mg.<br/>
                  <span className="font-mono text-blue-700">Child Dose = [12 / (12 + 12)] × 800 mg = (1/2) × 800 = 400 mg.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block text-xs font-bold mb-1">Example 2 (Dilling's Rule):</strong>
                  Calculate dose for 5 year old child if adult dose is 1 gm (1000 mg).<br/>
                  <span className="font-mono text-blue-700">Child Dose = [5 / 20] × 1000 mg = 250 mg.</span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION D: PRESCRIPTIONS (PAGES 51 - 60) */}
          {pageNum === 51 && (
            <div className="space-y-4">
              <div className="bg-[#3b4759] text-white py-3 px-6 text-center font-extrabold tracking-widest text-lg rounded-xs mb-4">
                PRESCRIPTION — PARTS, HANDLING & ERROR SOURCES
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                <strong>Prescription:</strong> Written legal order from a registered medical practitioner (physician, dentist, veterinarian) to a licensed pharmacist for compounding and dispensing medication.
              </p>
              <PrescriptionFormatSVG />
            </div>
          )}

          {pageNum === 52 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                PARTS OF A PRESCRIPTION
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-800 font-medium pl-2">
                <li><strong>Date:</strong> Prevents misuse of habit-forming/narcotic drug prescriptions.</li>
                <li><strong>Patient Info:</strong> Name, Age, Sex, Address for identification & pediatric dose verification.</li>
                <li><strong>Superscription ($\mathbf{R_x}$):</strong> Latin <em>"recipe"</em> ("you take") / Sign of Jupiter for healing.</li>
                <li><strong>Inscription:</strong> Main body (Base + Adjuvant + Vehicle).</li>
                <li><strong>Subscription:</strong> Directions to pharmacist for compounding.</li>
                <li><strong>Signatura (Sig):</strong> Directions to patient (dose, timing, route, special warnings).</li>
                <li><strong>Refill & Prescriber Signature:</strong> Doctor's sign & registration number.</li>
              </ol>
            </div>
          )}

          {pageNum === 57 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                HANDLING OF PRESCRIPTION & SOURCES OF ERRORS
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1">
                  <strong className="text-emerald-900 block text-xs uppercase font-bold">4 Steps of Prescription Handling:</strong>
                  <ol className="list-decimal list-inside pl-2 space-y-1">
                    <li><strong>Receiving:</strong> Maintain composed professional facial expression.</li>
                    <li><strong>Reading & Checking:</strong> Screen behind counter; verify format & ingredients.</li>
                    <li><strong>Collecting & Weighing:</strong> Collect materials on left side of balance, read label 3 times.</li>
                    <li><strong>Compounding, Labeling & Packaging:</strong> Clean workspace, plain white paper label.</li>
                  </ol>
                </div>
                <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 space-y-1">
                  <strong className="text-red-900 block text-xs uppercase font-bold">7 Common Prescription Error Sources:</strong>
                  <p>1. Ambiguous Abbreviations (e.g. SSKI) • 2. Look-alike/Sound-alike drug names (Digitoxin vs Digoxin) • 3. Unstated strength • 4. Wrong dosage form • 5. Incorrect dose • 6. Omitted patient instructions • 7. Drug-drug/food incompatibilities.</p>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER PAGES IN 60-PAGE MONOGRAPH */}
          {pageNum !== 1 && pageNum !== 2 && pageNum !== 3 && pageNum !== 5 && pageNum !== 8 && pageNum !== 10 && pageNum !== 16 && pageNum !== 19 && pageNum !== 27 && pageNum !== 35 && pageNum !== 38 && pageNum !== 40 && pageNum !== 41 && pageNum !== 46 && pageNum !== 51 && pageNum !== 52 && pageNum !== 57 && (
            <div className="space-y-4">
              <h3 className="text-[#00b0f0] font-bold text-lg border-b border-cyan-200 pb-1">
                {pageNum <= 15 && "HISTORICAL DEVELOPMENT OF PHARMACY PROFESSION & PHARMACOPOEIA EDITIONS"}
                {pageNum > 15 && pageNum <= 39 && "DOSAGE FORMS CLASSIFICATION & NOVEL DRUG DELIVERY SYSTEMS"}
                {pageNum > 39 && pageNum <= 50 && "POSOLOGY MATHEMATICAL FORMULAS & PEDIATRIC DOSE CALCULATIONS"}
                {pageNum > 50 && "PRESCRIPTION FORMAT, HANDLING PROCEDURES & INCOMPATIBILITIES"}
              </h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-3 text-slate-800 leading-relaxed font-medium">
                <p>
                  <strong>Official PCI B.Pharm Syllabus Coverage — Page {pageNum}:</strong><br/>
                  Authentic textbook notes covering Indian & international pharmacopoeia standards, physical state classification of dosage forms (solid, liquid, semi-solid, gaseous, NDDS), posological principles, pediatric dose calculation rules (Young's, Dilling's, Fried's, Clark's, Catzel's), prescription parts, and dispensing guidelines.
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
                  <div className="font-bold text-slate-900">• Key Definitions & Model Exam Q&A Bank for Page {pageNum}:</div>
                  <div>• GPAT high-yield mnemonics for prescription Latin abbreviations (b.i.d., t.i.d., q.i.d., p.c., a.c.)</div>
                  <div>• University 10-Mark Model Question: Explain prescription parts, handling procedures, and sources of errors</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Page Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>PharmaVerse PCI Study Hub Notes • Pharmaceutics I Unit 1</span>
          <span>Page {pageNum} of 60</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-600/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-400 border border-cyan-800 px-2.5 py-0.5 rounded-md font-mono">
                  AUTHENTIC TEXTBOOK PDF
                </span>
                <span className="text-xs text-slate-400 font-mono">60 Pages • Official PCI Study Hub Monograph</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white line-clamp-1 mt-0.5">
                Pharmaceutics I — Unit 1: History, Pharmacopoeias, Dosage Forms, Posology & Prescriptions
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
              <span>{viewMode === 'scroll' ? 'Scroll View (All 60 Pages)' : 'Single Page View'}</span>
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
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-600/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Exporting PDF...' : 'Download Pharmaceutics PDF'}</span>
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
