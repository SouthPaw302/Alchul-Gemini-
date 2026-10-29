import React, { useState } from 'react';
import { UNIVERSE_FILES } from '../data/universeData.ts';
import { MarkdownRenderer } from './MarkdownRenderer.tsx';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Users, 
  Sparkles, 
  Layers, 
  Sliders,
  Bookmark
} from 'lucide-react';
import { soundEngine } from '../utils/audioEngine.ts';

export const ChronicleReader: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>('WRITING_CHRONICLE_01_WHEN_THE_HIGH_BANK_MOVED');
  const [soundMode, setSoundMode] = useState<'off' | 'wetland' | 'deep'>('off');
  const [soundVol, setSoundVol] = useState<number>(0.35);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [columnWidth, setColumnWidth] = useState<'normal' | 'wide'>('normal');

  const writingFiles = UNIVERSE_FILES.filter(f => f.category === 'Chronicles & Prose');
  const currentDoc = writingFiles.find(f => f.id === selectedDocId) || writingFiles[0];

  const handleAudioChange = (mode: 'off' | 'wetland' | 'deep') => {
    setSoundMode(mode);
    soundEngine.setMode(mode);
    soundEngine.setVolume(soundVol);
  };

  const handleVolumeChange = (vol: number) => {
    setSoundVol(vol);
    soundEngine.setVolume(vol);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200">
      {/* Left Sidebar: Story Selector & Character Dossier */}
      <div className="w-full lg:w-80 border-r border-stone-800/80 bg-stone-950/80 p-5 space-y-6 flex flex-col h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Chronicle Reading Chamber
          </div>
          <h2 className="text-lg font-serif font-bold text-amber-100">
            Field Prose & Reconstruction
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Working literary narrative grounded in Late Cretaceous Mississippi Embayment ecology.
          </p>
        </div>

        {/* Story Selector */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-stone-400 uppercase font-semibold">
            Select Narrative Text
          </span>
          <div className="space-y-1.5">
            {writingFiles.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-left p-3 rounded-lg border transition flex flex-col gap-1 ${
                  selectedDocId === doc.id
                    ? 'bg-amber-950/40 border-amber-600 text-amber-100 ring-1 ring-amber-500/20'
                    : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <div className="font-serif font-bold text-xs text-stone-200 line-clamp-1">
                  {doc.title}
                </div>
                <div className="text-[11px] font-mono text-stone-500">
                  {doc.filename}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ambient Soundtrack Synthesizer */}
        <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
              <Volume2 className="w-4 h-4" />
              Atmospheric Soundscape
            </span>
            <span className="text-[10px] font-mono text-stone-500">Web Audio API</span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-[11px]">
            <button
              onClick={() => handleAudioChange('off')}
              className={`py-1.5 rounded text-center transition font-mono ${
                soundMode === 'off'
                  ? 'bg-stone-800 text-stone-200 font-bold'
                  : 'bg-stone-950 text-stone-500 hover:text-stone-300'
              }`}
            >
              Mute
            </button>
            <button
              onClick={() => handleAudioChange('wetland')}
              className={`py-1.5 rounded text-center transition font-mono ${
                soundMode === 'wetland'
                  ? 'bg-emerald-950 text-emerald-200 border border-emerald-700 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200'
              }`}
            >
              Wetland
            </button>
            <button
              onClick={() => handleAudioChange('deep')}
              className={`py-1.5 rounded text-center transition font-mono ${
                soundMode === 'deep'
                  ? 'bg-purple-950 text-purple-200 border border-purple-700 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-stone-200'
              }`}
            >
              Deep Cave
            </button>
          </div>

          {soundMode !== 'off' && (
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                <span>Volume</span>
                <span>{Math.round(soundVol * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundVol}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Character Guide */}
        <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/30 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-amber-400 font-bold">
            <Users className="w-4 h-4" />
            Character Perspectives
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <span className="font-serif font-bold text-amber-200">Sen (The Watcher)</span>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                Young alert scout. Second claw lifted clear of sand. Highly sensitive to water chemistry, mud taste, and fine acoustic vibrations traveling through submerged river roots.
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-stone-800/80">
              <span className="font-serif font-bold text-amber-200">Eru (The Brooder / Specialist)</span>
              <p className="text-stone-400 text-[11px] leading-relaxed">
                Experienced adult. Carrying developing embryos internally through ~75% of gestation. Economical, grounded posture. Uses a carved sounding stave to diagnose river bank failure.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Prose Reading Pane */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex flex-col items-center">
        {/* Reading Controls Toolbar */}
        <div className="w-full max-w-3xl mb-6 pb-3 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>Late Cretaceous • Mississippi Embayment</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Font Size */}
            <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded border border-stone-800">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'sm' ? 'text-amber-300 font-bold' : ''}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'md' ? 'text-amber-300 font-bold' : ''}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-1.5 py-0.5 rounded ${fontSize === 'lg' ? 'text-amber-300 font-bold' : ''}`}
              >
                A+
              </button>
            </div>

            {/* Column Width */}
            <button
              onClick={() => setColumnWidth(columnWidth === 'normal' ? 'wide' : 'normal')}
              className="px-2 py-1 rounded bg-stone-900 border border-stone-800 hover:text-stone-200 transition"
            >
              {columnWidth === 'normal' ? 'Expand' : 'Narrow'}
            </button>
          </div>
        </div>

        {/* Prose Text Content */}
        <div
          className={`w-full transition-all duration-200 ${
            columnWidth === 'wide' ? 'max-w-4xl' : 'max-w-2xl'
          } ${
            fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'
          }`}
        >
          <MarkdownRenderer content={currentDoc.content} />
        </div>
      </div>
    </div>
  );
};
