import React, { useState } from 'react';
import { TIMELINE_PHASES, TimelinePhase } from '../data/timelineData.ts';
import { 
  Hourglass, 
  MapPin, 
  Brain, 
  Leaf, 
  ShieldAlert, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Globe,
  Radio,
  Layers
} from 'lucide-react';

export const TimelineView: React.FC = () => {
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(0);
  const [eraFilter, setEraFilter] = useState<'all' | 'surface' | 'descent' | 'deep-world'>('all');

  const currentPhase = TIMELINE_PHASES.find(p => p.phase === selectedPhaseNum) || TIMELINE_PHASES[0];

  const filteredPhases = TIMELINE_PHASES.filter(p => {
    if (eraFilter === 'surface') return p.phase <= 8;
    if (eraFilter === 'descent') return p.phase >= 8 && p.phase <= 11;
    if (eraFilter === 'deep-world') return p.phase >= 12;
    return true;
  });

  const getPhaseColor = (phase: number) => {
    if (phase <= 4) return 'border-amber-600/70 text-amber-300 bg-amber-950/30';
    if (phase <= 8) return 'border-orange-600/70 text-orange-300 bg-orange-950/30';
    if (phase === 10) return 'border-rose-600/70 text-rose-300 bg-rose-950/40';
    if (phase <= 13) return 'border-cyan-600/70 text-cyan-300 bg-cyan-950/30';
    return 'border-purple-600/70 text-purple-300 bg-purple-950/30';
  };

  const getEraBadge = (phase: number) => {
    if (phase <= 8) return 'Surface Era';
    if (phase <= 10) return 'The Descent & Catastrophe';
    if (phase <= 12) return 'Early Subterranean';
    return 'Mature Type 1.7 Planetary';
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200">
      {/* Left / Top Timeline Selector */}
      <div className="w-full lg:w-96 shrink-0 border-r border-stone-800/80 bg-stone-950/80 flex flex-col h-auto lg:h-[calc(100vh-5rem)]">
        {/* Header */}
        <div className="p-4 border-b border-stone-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-amber-400" />
              <h2 className="font-serif font-bold text-amber-100 text-sm tracking-wide">
                DEEP-TIME CHRONOMETER
              </h2>
            </div>
            <span className="text-[11px] font-mono text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
              80 Ma → Present
            </span>
          </div>

          <div className="text-xs text-stone-400 leading-relaxed font-sans">
            18 canonical phases spanning eighty million years of biological, sensory, and technological evolution.
          </div>

          {/* Era Filter */}
          <div className="grid grid-cols-4 gap-1 text-[11px]">
            <button
              onClick={() => setEraFilter('all')}
              className={`py-1 rounded text-center font-medium transition ${
                eraFilter === 'all'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                  : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
              }`}
            >
              All (18)
            </button>
            <button
              onClick={() => setEraFilter('surface')}
              className={`py-1 rounded text-center font-medium transition ${
                eraFilter === 'surface'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                  : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
              }`}
            >
              Surface
            </button>
            <button
              onClick={() => setEraFilter('descent')}
              className={`py-1 rounded text-center font-medium transition ${
                eraFilter === 'descent'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                  : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
              }`}
            >
              K–Pg
            </button>
            <button
              onClick={() => setEraFilter('deep-world')}
              className={`py-1 rounded text-center font-medium transition ${
                eraFilter === 'deep-world'
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-800'
                  : 'bg-stone-900/50 text-stone-400 hover:text-stone-200'
              }`}
            >
              Deep Earth
            </button>
          </div>
        </div>

        {/* Phase List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredPhases.map((phase) => {
            const isSelected = phase.phase === currentPhase.phase;
            return (
              <button
                key={phase.phase}
                onClick={() => setSelectedPhaseNum(phase.phase)}
                className={`w-full text-left p-3 rounded-lg border transition group flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-stone-950/50 border-stone-800/80 hover:bg-stone-900/60 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${getPhaseColor(phase.phase)}`}>
                      PHASE {phase.phase}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {phase.approxYearsAgo}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-stone-500">
                    {getEraBadge(phase.phase)}
                  </span>
                </div>
                <div className="font-serif font-semibold text-xs text-stone-200 group-hover:text-amber-200">
                  {phase.title}
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1">
                  {phase.summary}
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation bottom control */}
        <div className="p-3 border-t border-stone-800/80 bg-stone-950 flex items-center justify-between text-xs">
          <button
            disabled={selectedPhaseNum === 0}
            onClick={() => setSelectedPhaseNum(Math.max(0, selectedPhaseNum - 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-900 border border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-800 transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <span className="font-mono text-stone-400">
            {selectedPhaseNum} / 17
          </span>
          <button
            disabled={selectedPhaseNum === 17}
            onClick={() => setSelectedPhaseNum(Math.min(17, selectedPhaseNum + 1))}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-stone-900 border border-stone-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-800 transition"
          >
            Next <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Phase Detail Dossier */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
        {/* Phase Header Banner */}
        <div className="p-6 rounded-2xl border border-stone-800/80 bg-gradient-to-br from-stone-900/90 via-stone-950/80 to-amber-950/20 shadow-xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getPhaseColor(currentPhase.phase)}`}>
                PHASE {currentPhase.phase}
              </span>
              <span className="text-xs uppercase tracking-wider font-mono text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                {getEraBadge(currentPhase.phase)}
              </span>
            </div>
            <div className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentPhase.timeframe}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mb-2">
            {currentPhase.title}
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-4xl">
            {currentPhase.summary}
          </p>

          {currentPhase.quote && (
            <div className="mt-4 pt-4 border-t border-stone-800/80 flex items-start gap-2.5 italic text-amber-200/90 text-xs sm:text-sm">
              <span className="text-amber-500 font-serif text-lg leading-none">“</span>
              <span>{currentPhase.quote}</span>
            </div>
          )}
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400 font-semibold">
              <MapPin className="w-4 h-4" />
              Location & Domain
            </div>
            <div className="text-sm font-medium text-stone-200">
              {currentPhase.location}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400 font-semibold">
              <Brain className="w-4 h-4" />
              Cognitive Milestone
            </div>
            <div className="text-sm font-medium text-stone-200">
              {currentPhase.cognitiveMilestone}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-semibold">
              <Leaf className="w-4 h-4" />
              Environmental State
            </div>
            <div className="text-sm font-medium text-stone-200">
              {currentPhase.environmentalState}
            </div>
          </div>
        </div>

        {/* Detailed Canonical Sequence */}
        <div className="p-6 rounded-2xl border border-stone-800 bg-stone-900/30 space-y-4">
          <h3 className="font-serif font-bold text-amber-200 text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Key Events & Evolutionary Developments
          </h3>

          <div className="space-y-3">
            {currentPhase.keyEvents.map((evt, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-300 border border-amber-800/80 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-stone-300 text-sm leading-relaxed pt-0.5">
                  {evt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Civilizational Scale Badge */}
        <div className="p-4 rounded-xl border border-stone-800/80 bg-stone-950/70 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span className="text-stone-400 uppercase font-mono text-[11px]">Civilizational Scale:</span>
            <span className="text-stone-200 font-semibold">{currentPhase.civilizationLevel}</span>
          </div>
          <span className="text-[11px] font-mono text-amber-400/80">
            Source: TIMELINE.md (Locked Canon Sequence)
          </span>
        </div>
      </div>
    </div>
  );
};
