import React, { useState } from 'react';
import { BRAIDED_REACH_META, SETTLEMENT_DISTRICTS, SettlementDistrict } from '../data/settlementData.ts';
import { 
  Compass, 
  Waves, 
  TreePine, 
  Flame, 
  Egg, 
  Sparkles, 
  Info, 
  MapPin, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const SettlementView: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('upstream-sensing');

  const currentDistrict = SETTLEMENT_DISTRICTS.find(d => d.id === selectedDistrictId) || SETTLEMENT_DISTRICTS[0];

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200">
      {/* Left Column: Settlement Meta & Interactive Map */}
      <div className="w-full lg:w-7/12 border-r border-stone-800/80 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">
        {/* Settlement Overview Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            Settlement Reconstruction 01
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            {BRAIDED_REACH_META.name}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-stone-400">
            <span>{BRAIDED_REACH_META.region}</span>
            <span>•</span>
            <span>{BRAIDED_REACH_META.era}</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-1">
            {BRAIDED_REACH_META.description}
          </p>
        </div>

        {/* Interactive SVG Site Schematic */}
        <div className="rounded-2xl border border-stone-800 bg-stone-950/90 p-4 shadow-xl space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Tactical Site Schematic (Click a Zone)
            </span>
            <span>Elevation: Low Water → High Terrace</span>
          </div>

          <div className="relative w-full aspect-[16/10] bg-stone-900/80 rounded-xl overflow-hidden border border-stone-800">
            {/* SVG Interactive Map */}
            <svg viewBox="0 0 1000 600" className="w-full h-full select-none">
              <defs>
                {/* River water gradient */}
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#075985" stopOpacity="0.3" />
                </linearGradient>

                {/* Floodplain contours pattern */}
                <pattern id="contours" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 20 Q 20 10 40 20 T 80 20" fill="none" stroke="#332a24" strokeWidth="0.8" opacity="0.4" />
                </pattern>
              </defs>

              {/* Background Contours */}
              <rect width="1000" height="600" fill="#1c1917" />
              <rect width="1000" height="600" fill="url(#contours)" />

              {/* Braided River Channels */}
              {/* Main River Course */}
              <path
                d="M -20,160 C 200,140 350,220 500,180 C 680,140 850,230 1020,190 L 1020,290 C 850,330 650,240 500,280 C 350,320 180,240 -20,270 Z"
                fill="url(#riverGrad)"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.5"
              />

              {/* Braided Side Stream */}
              <path
                d="M -20,380 C 150,350 300,440 450,400 C 600,360 800,460 1020,430 L 1020,480 C 800,510 600,410 450,450 C 300,490 150,400 -20,430 Z"
                fill="url(#riverGrad)"
                stroke="#0284c7"
                strokeWidth="1"
                strokeOpacity="0.4"
              />

              {/* River Flow Direction Indicators */}
              <g stroke="#7dd3fc" strokeWidth="1" opacity="0.4">
                <path d="M 120,180 L 170,175 M 165,170 L 175,175 L 165,180" />
                <path d="M 420,205 L 470,200 M 465,195 L 475,200 L 465,205" />
                <path d="M 760,200 L 810,210 M 805,205 L 815,210 L 805,215" />
              </g>

              {/* Upstream Sensing Reach (Zone A) */}
              <g
                onClick={() => setSelectedDistrictId('upstream-sensing')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="60"
                  y="120"
                  width="220"
                  height="160"
                  rx="16"
                  fill="#0369a1"
                  fillOpacity={selectedDistrictId === 'upstream-sensing' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'upstream-sensing' ? '#38bdf8' : '#0284c7'}
                  strokeWidth={selectedDistrictId === 'upstream-sensing' ? '2.5' : '1.5'}
                  strokeDasharray="4 2"
                />
                <circle cx="170" cy="190" r="18" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <text x="170" y="196" fill="#f0f9ff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">A</text>
                <text x="170" y="235" fill="#bae6fd" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Upstream Sensing Reach</text>
                <text x="170" y="252" fill="#7dd3fc" fontSize="10" textAnchor="middle" fontFamily="monospace">Submerged staves & weirs</text>
              </g>

              {/* Living Banks & Mounds (Zone B) */}
              <g
                onClick={() => setSelectedDistrictId('living-banks')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="330"
                  y="60"
                  width="280"
                  height="190"
                  rx="18"
                  fill="#15803d"
                  fillOpacity={selectedDistrictId === 'living-banks' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'living-banks' ? '#4ade80' : '#22c55e'}
                  strokeWidth={selectedDistrictId === 'living-banks' ? '2.5' : '1.5'}
                />
                <circle cx="470" cy="140" r="18" fill="#15803d" stroke="#4ade80" strokeWidth="2" />
                <text x="470" y="146" fill="#f0fdf4" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">B</text>
                <text x="470" y="180" fill="#bbf7d0" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Living Banks & Mounds</text>
                <text x="470" y="197" fill="#86efac" fontSize="10" textAnchor="middle" fontFamily="monospace">Engineered root shelves & corridors</text>
              </g>

              {/* Nursery & Incubation Grounds (Zone C) */}
              <g
                onClick={() => setSelectedDistrictId('nursery-grounds')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="670"
                  y="50"
                  width="270"
                  height="210"
                  rx="18"
                  fill="#be123c"
                  fillOpacity={selectedDistrictId === 'nursery-grounds' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'nursery-grounds' ? '#fb7185' : '#f43f5e'}
                  strokeWidth={selectedDistrictId === 'nursery-grounds' ? '2.5' : '1.5'}
                />
                <circle cx="805" cy="135" r="18" fill="#be123c" stroke="#fb7185" strokeWidth="2" />
                <text x="805" y="141" fill="#fff1f2" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C</text>
                <text x="805" y="175" fill="#fecdd3" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Nursery & Incubation Grounds</text>
                <text x="805" y="192" fill="#fda4af" fontSize="10" textAnchor="middle" fontFamily="monospace">75% internal embryonic retention</text>
              </g>

              {/* Harvest & Fermentation Commons (Zone D) */}
              <g
                onClick={() => setSelectedDistrictId('harvest-commons')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="80"
                  y="330"
                  width="250"
                  height="210"
                  rx="18"
                  fill="#b45309"
                  fillOpacity={selectedDistrictId === 'harvest-commons' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'harvest-commons' ? '#fbbf24' : '#f59e0b'}
                  strokeWidth={selectedDistrictId === 'harvest-commons' ? '2.5' : '1.5'}
                />
                <circle cx="205" cy="420" r="18" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                <text x="205" y="426" fill="#fffbeb" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">D</text>
                <text x="205" y="460" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Harvest & Fermentation Commons</text>
                <text x="205" y="477" fill="#fcd34d" fontSize="10" textAnchor="middle" fontFamily="monospace">Shaded basins & yeast chemistry</text>
              </g>

              {/* Fire & Transformation Ground (Zone E) */}
              <g
                onClick={() => setSelectedDistrictId('fire-grounds')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="380"
                  y="340"
                  width="250"
                  height="200"
                  rx="18"
                  fill="#c2410c"
                  fillOpacity={selectedDistrictId === 'fire-grounds' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'fire-grounds' ? '#fb923c' : '#f97316'}
                  strokeWidth={selectedDistrictId === 'fire-grounds' ? '2.5' : '1.5'}
                />
                <circle cx="505" cy="425" r="18" fill="#c2410c" stroke="#fb923c" strokeWidth="2" />
                <text x="505" y="431" fill="#fff7ed" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">E</text>
                <text x="505" y="465" fill="#fed7aa" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Fire & Transformation Ground</text>
                <text x="505" y="482" fill="#fdba74" fontSize="10" textAnchor="middle" fontFamily="monospace">Clean draft combustion & charcoal flues</text>
              </g>

              {/* Controlled-Contact Enclosure (Zone H) */}
              <g
                onClick={() => setSelectedDistrictId('controlled-contact')}
                className="cursor-pointer transition-all duration-200"
              >
                <rect
                  x="690"
                  y="330"
                  width="250"
                  height="210"
                  rx="18"
                  fill="#7e22ce"
                  fillOpacity={selectedDistrictId === 'controlled-contact' ? '0.45' : '0.2'}
                  stroke={selectedDistrictId === 'controlled-contact' ? '#c084fc' : '#a855f7'}
                  strokeWidth={selectedDistrictId === 'controlled-contact' ? '2.5' : '1.5'}
                />
                <circle cx="815" cy="420" r="18" fill="#7e22ce" stroke="#c084fc" strokeWidth="2" />
                <text x="815" y="426" fill="#faf5ff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">H</text>
                <text x="815" y="460" fill="#e9d5ff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Controlled-Contact Enclosure</text>
                <text x="815" y="477" fill="#d8b4fe" fontSize="10" textAnchor="middle" fontFamily="monospace">Alchul interface & temporal testing</text>
              </g>
            </svg>
          </div>
        </div>

        {/* District Selector Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SETTLEMENT_DISTRICTS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDistrictId(d.id)}
              className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                selectedDistrictId === d.id
                  ? 'bg-stone-900 border-amber-500 text-amber-200 ring-1 ring-amber-500/30'
                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
              }`}
            >
              <span
                className="w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0"
                style={{ backgroundColor: `${d.color}25`, color: d.color, border: `1px solid ${d.color}60` }}
              >
                {d.letter}
              </span>
              <span className="font-serif text-xs font-medium truncate">
                {d.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Selected District Engineering Dossier */}
      <div className="w-full lg:w-5/12 p-6 lg:p-8 overflow-y-auto space-y-6 bg-stone-950/60">
        <div className="p-6 rounded-2xl border border-stone-800 bg-stone-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <span
              className="px-2.5 py-1 rounded text-xs font-mono font-bold"
              style={{ backgroundColor: `${currentDistrict.color}20`, color: currentDistrict.color, border: `1px solid ${currentDistrict.color}50` }}
            >
              DISTRICT {currentDistrict.letter}
            </span>
            <span className="text-xs font-mono text-stone-400">
              {currentDistrict.elevation}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            {currentDistrict.name}
          </h2>

          <p className="text-stone-300 text-sm leading-relaxed">
            {currentDistrict.functionSummary}
          </p>

          <div className="pt-2 border-t border-stone-800/80 space-y-3">
            <div className="text-xs font-mono uppercase text-amber-400 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Structural & Engineering Features
            </div>
            <div className="space-y-2">
              {currentDistrict.architecturalDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs text-stone-300">
                  <span className="text-amber-400 font-bold shrink-0">•</span>
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1">
              <span className="text-[11px] font-mono text-stone-400 uppercase font-bold block">
                Sensory Environment:
              </span>
              <p className="text-stone-300 italic">
                {currentDistrict.sensoryProfile}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-stone-950 border border-stone-800 text-xs space-y-1">
              <span className="text-[11px] font-mono text-stone-400 uppercase font-bold block">
                Primary Inhabitants & Watchers:
              </span>
              <p className="text-amber-200/90 font-medium">
                {currentDistrict.inhabitants}
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-stone-500 pt-2 flex items-center justify-between">
            <span>Controlling Authority:</span>
            <span className="text-amber-400/80">{currentDistrict.canonSource}</span>
          </div>
        </div>

        {/* Narrative Connection to Chronicle 01 */}
        <div className="p-5 rounded-xl border border-amber-900/50 bg-amber-950/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Field Observation: Chronicle 01
          </div>
          <p className="text-xs text-stone-300 italic leading-relaxed">
            “Sen stood ankle-deep in the side channel with the second claw of each hind foot lifted clear of the sand. The wood did not tremble in the sequence Sen had described. It shivered continuously, nearly without rhythm... Far upstream, an old bank had begun to shed its inside layers. The river was carrying the evidence here before the collapse itself arrived.”
          </p>
          <div className="text-[11px] font-mono text-amber-400/80 text-right">
            — When the High Bank Moved (WRITING/CHRONICLE_01)
          </div>
        </div>
      </div>
    </div>
  );
};
