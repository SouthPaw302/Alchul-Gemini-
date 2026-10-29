import React, { useState } from 'react';
import { EVOLUTIONARY_STAGES, ANATOMICAL_COMPARISON, EvolutionaryStage } from '../data/speciesData.ts';
import { 
  Dna, 
  Eye, 
  Hand, 
  Egg, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Activity,
  Flame
} from 'lucide-react';

export const MorphologyView: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('peak-surface');
  const [selectedSystem, setSelectedSystem] = useState<number>(0);

  const currentStage = EVOLUTIONARY_STAGES.find(s => s.id === selectedStageId) || EVOLUTIONARY_STAGES[0];

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200 overflow-y-auto">
      {/* Top Banner */}
      <div className="p-6 lg:p-8 border-b border-stone-800/80 bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/30">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400/90 font-bold">
                Speculative Biology & Anatomical Reconstructions
              </span>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-2.5 py-1 rounded border border-stone-800">
              Controlling Canon: SPECIES.md & VISUAL_CANON.md
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            Morphological Evolution Across 80 Million Years
          </h1>
          <p className="text-stone-300 text-sm max-w-4xl leading-relaxed">
            The founders were not generic birds or movie raptors; they were grasping, feathered, predatory Appalachian theropods. Across deep time, continuous adaptation and intentional biological design produced radical changes without severing terrestrial evolutionary continuity.
          </p>

          {/* 3 Stage Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {EVOLUTIONARY_STAGES.map((stage) => {
              const isSelected = stage.id === currentStage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`p-4 rounded-xl border text-left transition flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-stone-900/50 border-stone-800 hover:bg-stone-900 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">{stage.era}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    )}
                  </div>
                  <div className="font-serif font-bold text-base text-stone-100">
                    {stage.name}
                  </div>
                  <div className="text-xs text-stone-400 line-clamp-2">
                    {stage.posture}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-6xl mx-auto w-full p-6 lg:p-8 space-y-8 flex-1">
        {/* Selected Stage Detail Card */}
        <div className="p-6 rounded-2xl border border-stone-800 bg-stone-900/40 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wide font-semibold">
                Taxonomic Profile
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
                {currentStage.name}
              </h2>
              <div className="text-xs font-mono text-stone-400 mt-0.5">
                {currentStage.classification}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                Size: <strong className="text-amber-200">{currentStage.size}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                Mass: <strong className="text-amber-200">{currentStage.mass}</strong>
              </span>
            </div>
          </div>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {currentStage.summary}
          </p>

          {/* Biological / Anatomical Characteristics */}
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-amber-200 text-sm uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Diagnostic Anatomical Traits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentStage.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-950/60 border border-stone-800/80 text-xs sm:text-sm text-stone-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strict Visual Canon Rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-emerald-900/60 bg-emerald-950/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Approved Morphology (MUST Depict)
              </div>
              <ul className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                {currentStage.visualConstraints[0].replace('MUST depict: ', '').split(', ').map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-rose-900/60 bg-rose-950/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                <XCircle className="w-4 h-4 text-rose-400" />
                Strict Visual Prohibitions (MUST NOT Depict)
              </div>
              <ul className="text-xs text-stone-300 space-y-1.5 leading-relaxed">
                {currentStage.visualConstraints[1].replace('MUST NOT depict: ', '').split(', ').map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Anatomical Comparative Matrix Across Stages */}
        <div className="p-6 rounded-2xl border border-stone-800 bg-stone-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-amber-100 text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400" />
              Comparative Organ System Evolution
            </h3>
            <span className="text-xs font-mono text-stone-400">
              Select an anatomical system
            </span>
          </div>

          {/* System Selection Tabs */}
          <div className="flex flex-wrap gap-2 text-xs">
            {ANATOMICAL_COMPARISON.map((comp, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSystem(idx)}
                className={`px-3 py-1.5 rounded-lg border transition font-medium ${
                  selectedSystem === idx
                    ? 'bg-amber-950 text-amber-200 border-amber-700'
                    : 'bg-stone-950/80 text-stone-400 border-stone-800 hover:text-stone-200'
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>

          {/* Selected Organ System Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-[11px] font-mono text-amber-400/90 font-bold uppercase">
                Founder Stage (~80 Ma)
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {ANATOMICAL_COMPARISON[selectedSystem].founderState}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-amber-800/80 space-y-2 ring-1 ring-amber-500/20">
              <span className="text-[11px] font-mono text-amber-300 font-bold uppercase">
                Peak Surface Form (~66 Ma)
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {ANATOMICAL_COMPARISON[selectedSystem].peakSurfaceState}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <span className="text-[11px] font-mono text-purple-400 font-bold uppercase">
                Subterranean Descendant (Present)
              </span>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {ANATOMICAL_COMPARISON[selectedSystem].deepWorldDescendantState}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-stone-900/60 border border-stone-800 text-xs text-stone-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong>Evolutionary Note:</strong> {ANATOMICAL_COMPARISON[selectedSystem].notes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
