import React, { useState } from 'react';
import { VirtualWorldCanvas, WorldEnvironmentType, CameraMode, TimeOfDay } from './VirtualWorldCanvas.tsx';
import { WorldHUD } from './WorldHUD.tsx';
import { WorldHotspot } from './sceneBuilder.ts';

interface VirtualWorldViewProps {
  onOpenCodexDoc?: (docPath: string) => void;
}

type InterpretiveLens = 'outside' | 'resident' | 'testimony';

const lensOptions: { id: InterpretiveLens; label: string }[] = [
  { id: 'outside', label: 'Outside' },
  { id: 'resident', label: 'Resident' },
  { id: 'testimony', label: 'Contact reports' },
];

const lensNotes: Record<WorldEnvironmentType, Record<InterpretiveLens, { title: string; description: string }>> = {
  surface: {
    outside: {
      title: 'An external reconstruction',
      description: 'Study the terrain, water routes, managed fermentation and anatomical proxy. This is a model of a possible mature surface settlement, not a surveyed Cretaceous city or a definitive evolved body.',
    },
    resident: {
      title: 'Inside a surface resident\'s priorities',
      description: 'A route is more than visible ground: it carries scent, vibration, flood memory, hunting knowledge, kin obligations and space for an egg-bearing companion to pass. This is an interpretive translation, not a simulation of exact sight.',
    },
    testimony: {
      title: 'Accounts of a place in another condition',
      description: 'Some observers report unfamiliar moments of familiar places. Others seek ordinary sensory explanations. Neither a geometric object nor a glowing aura is the being Alchul. No witness can settle Alchul\'s nature.',
    },
  },
  'deep-earth': {
    outside: {
      title: 'A later engineered deep-world model',
      description: 'Cultivated light, fluids and mineral surfaces can form technological ecology after long development. The schematic cavern is fictional engineering, not a natural open Reelfoot Rift or a map of an actual cave.',
    },
    resident: {
      title: 'The inhabited deep',
      description: 'A local resident may recognize air, water and resonant routes as intimately as a surface inhabitant knows a forest. Present descendants may differ radically in body and culture; this proxy avatar is not their universal form.',
    },
    testimony: {
      title: 'Unclosed testimony',
      description: 'A deep observer may encounter reports of spatial and temporal correspondence. This is a disputed, culturally interpreted experience—not Alchul\'s own viewpoint or a fixed explanation of what Alchul wants.',
    },
  },
};

export const VirtualWorldView: React.FC<VirtualWorldViewProps> = ({ onOpenCodexDoc }) => {
  const [activeEnvironment, setActiveEnvironment] = useState<WorldEnvironmentType>('surface');
  const [cameraMode, setCameraMode] = useState<CameraMode>('scout');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('noon');
  const [selectedHotspot, setSelectedHotspot] = useState<WorldHotspot | null>(null);
  const [lens, setLens] = useState<InterpretiveLens>('outside');
  const currentLens = lensNotes[activeEnvironment][lens];

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-stone-950 overflow-hidden">
      <VirtualWorldCanvas
        onSelectHotspot={setSelectedHotspot}
        activeEnvironment={activeEnvironment}
        onChangeEnvironment={setActiveEnvironment}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
      />

      {/* These lenses annotate the shared 3D model; they do not claim to reproduce a nonhuman sensorium. */}
      <aside className="absolute top-4 right-4 z-20 w-[min(21rem,calc(100vw-2rem))] rounded-xl bg-stone-950/90 border border-stone-700/90 shadow-xl p-3 text-stone-200 backdrop-blur-md space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-serif font-bold text-sm text-amber-100">Three ways to understand this world</h2>
          <span className="text-[9px] uppercase tracking-wide text-stone-400">Working model</span>
        </div>
        <div className="flex gap-1" role="group" aria-label="Choose interpretive worldview lens">
          {lensOptions.map(option => (
            <button
              key={option.id}
              type="button"
              aria-pressed={lens === option.id}
              onClick={() => setLens(option.id)}
              className={`flex-1 px-2 py-1.5 rounded-md border text-[10px] sm:text-[11px] leading-tight font-medium transition ${lens === option.id ? 'border-amber-600 bg-amber-950 text-amber-100' : 'border-stone-800 bg-stone-900/80 text-stone-400 hover:text-stone-200'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div role="status" aria-live="polite" className="space-y-1">
          <h3 className="font-semibold text-xs text-amber-200">{currentLens.title}</h3>
          <p className="text-[11px] sm:text-xs leading-relaxed text-stone-300">{currentLens.description}</p>
        </div>
        {onOpenCodexDoc && (
          <button
            type="button"
            onClick={() => onOpenCodexDoc(lens === 'testimony' ? 'LORE/BELIEF_HISTORY_ARCHETYPES.md' : 'LORE/EMBODIED_WORLDVIEW_ATLAS.md')}
            className="text-[11px] underline underline-offset-2 text-sky-300 hover:text-sky-200"
          >
            Open detailed biology, belief and worldview atlas
          </button>
        )}
        <p className="text-[10px] text-stone-500">Interpretive notes only. Scene and camera stay unchanged when switching lenses.</p>
      </aside>

      <WorldHUD
        activeEnvironment={activeEnvironment}
        onChangeEnvironment={setActiveEnvironment}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
        timeOfDay={timeOfDay}
        onChangeTimeOfDay={setTimeOfDay}
        selectedHotspot={selectedHotspot}
        onCloseHotspot={() => setSelectedHotspot(null)}
        onOpenCodexDoc={onOpenCodexDoc}
      />
    </div>
  );
};
