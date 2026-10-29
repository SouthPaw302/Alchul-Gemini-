import React, { useState } from 'react';
import { WorldHotspot } from './sceneBuilder.ts';
import { WorldEnvironmentType, CameraMode, TimeOfDay } from './VirtualWorldCanvas.tsx';
import { 
  Compass, 
  Sun, 
  Sunset, 
  Sparkles, 
  Camera, 
  User, 
  RotateCw, 
  Layers, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  VolumeX, 
  Flame, 
  X,
  BookOpen
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine.ts';

interface WorldHUDProps {
  activeEnvironment: WorldEnvironmentType;
  onChangeEnvironment: (env: WorldEnvironmentType) => void;
  cameraMode: CameraMode;
  onChangeCameraMode: (mode: CameraMode) => void;
  timeOfDay: TimeOfDay;
  onChangeTimeOfDay: (tod: TimeOfDay) => void;
  selectedHotspot: WorldHotspot | null;
  onCloseHotspot: () => void;
  onOpenCodexDoc?: (docPath: string) => void;
}

export const WorldHUD: React.FC<WorldHUDProps> = ({
  activeEnvironment,
  onChangeEnvironment,
  cameraMode,
  onChangeCameraMode,
  timeOfDay,
  onChangeTimeOfDay,
  selectedHotspot,
  onCloseHotspot,
  onOpenCodexDoc,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      {/* Sleek Bottom Control Dock pinned to bottom center */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4 pointer-events-none transition-all duration-300">
        <div className="flex flex-col items-center">
          {/* Collapse Toggle Pill */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="pointer-events-auto mb-1 px-3 py-1 rounded-full bg-stone-900/90 border border-stone-800 text-[11px] font-mono text-stone-400 hover:text-stone-200 backdrop-blur-md shadow-md flex items-center gap-1 transition"
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            <span>{isCollapsed ? 'Show Virtual World Controls' : 'Hide Controls (Zen Mode)'}</span>
          </button>

          {/* Main Bottom Dock */}
          {!isCollapsed && (
            <div className="pointer-events-auto w-full bg-stone-950/90 border border-stone-800/90 rounded-2xl p-3 shadow-2xl backdrop-blur-lg flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Environment Switcher */}
              <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => onChangeEnvironment('surface')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                    activeEnvironment === 'surface'
                      ? 'bg-amber-950 text-amber-200 border border-amber-800 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Braided Reach (75 Ma)</span>
                </button>
                <button
                  onClick={() => onChangeEnvironment('deep-earth')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5 ${
                    activeEnvironment === 'deep-earth'
                      ? 'bg-purple-950 text-purple-200 border border-purple-800 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Deep Earth Rift</span>
                </button>
              </div>

              {/* Camera Mode Pills */}
              <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
                <button
                  onClick={() => onChangeCameraMode('scout')}
                  className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 font-mono text-[11px] ${
                    cameraMode === 'scout'
                      ? 'bg-stone-800 text-stone-100 font-bold border border-stone-700'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Control Theropod Scout with WASD"
                >
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Scout (WASD)</span>
                </button>
                <button
                  onClick={() => onChangeCameraMode('drone')}
                  className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 font-mono text-[11px] ${
                    cameraMode === 'drone'
                      ? 'bg-stone-800 text-stone-100 font-bold border border-stone-700'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Free Flight Drone Camera"
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span>Free Drone</span>
                </button>
                <button
                  onClick={() => onChangeCameraMode('orbit')}
                  className={`px-2.5 py-1.5 rounded-lg transition flex items-center gap-1 font-mono text-[11px] ${
                    cameraMode === 'orbit'
                      ? 'bg-stone-800 text-stone-100 font-bold border border-stone-700'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                  title="Cinematic Orbit Camera"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Orbit</span>
                </button>
              </div>

              {/* Time of Day Lighting (Surface only) */}
              {activeEnvironment === 'surface' && (
                <div className="flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
                  <button
                    onClick={() => onChangeTimeOfDay('noon')}
                    className={`px-2.5 py-1.5 rounded-lg transition font-mono text-[11px] flex items-center gap-1 ${
                      timeOfDay === 'noon' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Noon</span>
                  </button>
                  <button
                    onClick={() => onChangeTimeOfDay('dusk')}
                    className={`px-2.5 py-1.5 rounded-lg transition font-mono text-[11px] flex items-center gap-1 ${
                      timeOfDay === 'dusk' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
                    }`}
                  >
                    <Sunset className="w-3.5 h-3.5 text-orange-400" />
                    <span>Dusk</span>
                  </button>
                  <button
                    onClick={() => onChangeTimeOfDay('impact')}
                    className={`px-2.5 py-1.5 rounded-lg transition font-mono text-[11px] flex items-center gap-1 ${
                      timeOfDay === 'impact' ? 'bg-rose-950 text-rose-200 border border-rose-800' : 'text-stone-400'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>66 Ma Flash</span>
                  </button>
                </div>
              )}

              {/* Sound Toggle */}
              <button
                onClick={handleToggleAudio}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-stone-100 hover:bg-stone-800 transition"
                title="Toggle Web Audio"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hotspot Inspection Modal / Dossier */}
      {selectedHotspot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    {selectedHotspot.district}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-amber-100">
                    {selectedHotspot.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={onCloseHotspot}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm">
              <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                {selectedHotspot.shortDesc}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Canonical Lore & Scientific Reconstruction
                </div>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {selectedHotspot.lore}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                <span className="font-mono text-stone-500">
                  Category: {selectedHotspot.category}
                </span>
                {onOpenCodexDoc && (
                  <button
                    onClick={() => {
                      onOpenCodexDoc('SETTLEMENT_01_BRAIDED_REACH_WORKING_RECONSTRUCTION');
                      onCloseHotspot();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-950 hover:bg-amber-900 border border-amber-700 text-amber-200 font-medium transition"
                  >
                    Open Settlement Blueprint in Codex →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
