import React, { useState, useEffect } from 'react';
import { 
  Globe,
  BookOpen, 
  Hourglass, 
  Dna, 
  Map, 
  Compass, 
  Search, 
  Volume2, 
  VolumeX, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  GitBranch,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { VirtualWorldView } from './virtual-world/VirtualWorldView.tsx';
import { CodexBrowser } from './components/CodexBrowser.tsx';
import { TimelineView } from './components/TimelineView.tsx';
import { MorphologyView } from './components/MorphologyView.tsx';
import { SettlementView } from './components/SettlementView.tsx';
import { ResearchMatrix } from './components/ResearchMatrix.tsx';
import { ChronicleReader } from './components/ChronicleReader.tsx';
import { GlobalSearch } from './components/GlobalSearch.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { soundEngine } from './utils/audioEngine.ts';

type NavigationTab = 'world' | 'codex' | 'timeline' | 'morphology' | 'settlement' | 'research' | 'chronicles';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('world');
  const [targetFileId, setTargetFileId] = useState<string>('CANON');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundMode, setSoundMode] = useState<'off' | 'wetland' | 'deep'>('wetland');

  // Keyboard shortcut cmd+K or ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    if (soundMode === 'off') {
      soundEngine.setMode('wetland');
      setSoundMode('wetland');
    } else if (soundMode === 'wetland') {
      soundEngine.setMode('deep');
      setSoundMode('deep');
    } else {
      soundEngine.setMode('off');
      setSoundMode('off');
    }
  };

  const handleSelectSearchResult = (fileId: string) => {
    setTargetFileId(fileId);
    setActiveTab('codex');
  };

  const handleOpenCodexDoc = (docPath: string) => {
    const clean = docPath.replace(/\.md$/, '').replace(/\//g, '_');
    setTargetFileId(clean);
    setActiveTab('codex');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 flex flex-col font-sans selection:bg-amber-900 selection:text-amber-100">
      {/* Top Universal App Navigation Bar */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('world')}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800/80 flex items-center justify-center text-amber-400 group-hover:border-amber-600 transition shadow-inner">
              <span className="font-serif font-black text-lg">A</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg tracking-wider text-amber-100 group-hover:text-amber-300 transition">
                  ALCHUL
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                  3D VIRTUAL WORLD
                </span>
              </div>
              <div className="text-[10px] font-mono text-stone-400 uppercase tracking-tight hidden md:block">
                Interactive Cretaceous & Deep-Earth Simulation
              </div>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => setActiveTab('world')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'world'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>3D Virtual World</span>
          </button>

          <button
            onClick={() => setActiveTab('codex')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'codex'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Codex & Canon</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'timeline'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Hourglass className="w-3.5 h-3.5" />
            <span>Deep-Time Chronometer</span>
          </button>

          <button
            onClick={() => setActiveTab('morphology')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'morphology'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Species & Morphology</span>
          </button>

          <button
            onClick={() => setActiveTab('settlement')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'settlement'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>The Braided Reach</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'research'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Research vs Canon</span>
          </button>

          <button
            onClick={() => setActiveTab('chronicles')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'chronicles'
                ? 'bg-amber-950/80 text-amber-200 border border-amber-700 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chronicles & Prose</span>
          </button>
        </nav>

        {/* Right Tools & Global Actions */}
        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-700 text-stone-400 hover:text-stone-200 text-xs transition"
            title="Global Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-stone-950 text-stone-500 rounded border border-stone-800">
              ⌘K
            </kbd>
          </button>

          {/* Ambient Soundscape Toggle */}
          <button
            onClick={handleToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition ${
              soundMode !== 'off'
                ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
            title="Toggle prehistoric ambient audio"
          >
            {soundMode !== 'off' ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline capitalize">
              {soundMode === 'off' ? 'Sound: Off' : soundMode}
            </span>
          </button>

          {/* Export / GitHub provenance */}
          <button
            onClick={() => setIsExportOpen(true)}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:bg-stone-800 text-stone-300 text-xs transition flex items-center gap-1.5"
            title="Export repository & view provenance"
          >
            <GitBranch className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Repo</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 border-b border-stone-800 p-4 space-y-1">
          <button
            onClick={() => { setActiveTab('world'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'world' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" /> 3D Virtual World
          </button>
          <button
            onClick={() => { setActiveTab('codex'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'codex' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Codex & Canon
          </button>
          <button
            onClick={() => { setActiveTab('timeline'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'timeline' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Hourglass className="w-4 h-4" /> Deep-Time Chronometer
          </button>
          <button
            onClick={() => { setActiveTab('morphology'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'morphology' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Dna className="w-4 h-4" /> Species & Morphology
          </button>
          <button
            onClick={() => { setActiveTab('settlement'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'settlement' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Map className="w-4 h-4" /> The Braided Reach
          </button>
          <button
            onClick={() => { setActiveTab('research'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'research' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Compass className="w-4 h-4" /> Research vs Canon
          </button>
          <button
            onClick={() => { setActiveTab('chronicles'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-left ${
              activeTab === 'chronicles' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Chronicles & Prose
          </button>
        </div>
      )}

      {/* Main Viewport Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'world' && (
          <VirtualWorldView onOpenCodexDoc={handleOpenCodexDoc} />
        )}
        {activeTab === 'codex' && (
          <CodexBrowser initialFileId={targetFileId} />
        )}
        {activeTab === 'timeline' && (
          <TimelineView />
        )}
        {activeTab === 'morphology' && (
          <MorphologyView />
        )}
        {activeTab === 'settlement' && (
          <SettlementView />
        )}
        {activeTab === 'research' && (
          <ResearchMatrix />
        )}
        {activeTab === 'chronicles' && (
          <ChronicleReader />
        )}
      </div>

      {/* Global Modals */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
