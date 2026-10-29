import React, { useState, useMemo } from 'react';
import { UNIVERSE_FILES, UniverseFile } from '../data/universeData.ts';
import { MarkdownRenderer } from './MarkdownRenderer.tsx';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ShieldCheck, 
  Compass, 
  Archive, 
  Sparkles, 
  Copy, 
  Check, 
  Code, 
  Eye, 
  ListOrdered,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface CodexBrowserProps {
  initialFileId?: string;
  onSelectFile?: (file: UniverseFile) => void;
  onNavigateToTab?: (tab: string, meta?: any) => void;
}

export const CodexBrowser: React.FC<CodexBrowserProps> = ({
  initialFileId = 'CANON',
  onSelectFile,
  onNavigateToTab
}) => {
  const [selectedFileId, setSelectedFileId] = useState<string>(initialFileId);
  const [fileFilter, setFileFilter] = useState('');
  const [viewMode, setViewMode] = useState<'rendered' | 'raw'>('rendered');
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const currentFile = useMemo(() => {
    return UNIVERSE_FILES.find(f => f.id === selectedFileId) || UNIVERSE_FILES[0];
  }, [selectedFileId]);

  const categories = useMemo(() => {
    return ['All', 'Core Canon', 'Real Research', 'Chronicles & Prose', 'Project Archives', 'Authoritative Protocols'];
  }, []);

  const filteredFiles = useMemo(() => {
    return UNIVERSE_FILES.filter(f => {
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      const matchesSearch = !fileFilter || 
        f.title.toLowerCase().includes(fileFilter.toLowerCase()) || 
        f.path.toLowerCase().includes(fileFilter.toLowerCase()) ||
        f.content.toLowerCase().includes(fileFilter.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, fileFilter]);

  // Extract table of contents from current file
  const tableOfContents = useMemo(() => {
    if (!currentFile) return [];
    const lines = currentFile.content.split('\n');
    const toc: { title: string; level: number; lineIndex: number }[] = [];
    lines.forEach((line, idx) => {
      if (line.startsWith('# ')) {
        toc.push({ title: line.replace('# ', '').trim(), level: 1, lineIndex: idx });
      } else if (line.startsWith('## ')) {
        toc.push({ title: line.replace('## ', '').trim(), level: 2, lineIndex: idx });
      } else if (line.startsWith('### ')) {
        toc.push({ title: line.replace('### ', '').trim(), level: 3, lineIndex: idx });
      }
    });
    return toc;
  }, [currentFile]);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkJump = (targetPath: string) => {
    const clean = targetPath.replace(/^\//, '').replace(/\.md$/, '').replace(/\//g, '_');
    const matched = UNIVERSE_FILES.find(f => f.id === clean || f.path.endsWith(targetPath) || f.filename === targetPath);
    if (matched) {
      setSelectedFileId(matched.id);
      if (onSelectFile) onSelectFile(matched);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Core Canon': return <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />;
      case 'Real Research': return <Compass className="w-3.5 h-3.5 text-sky-400" />;
      case 'Chronicles & Prose': return <BookOpen className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Project Archives': return <Archive className="w-3.5 h-3.5 text-purple-400" />;
      default: return <FileText className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200">
      {/* Left Sidebar: Repository Files */}
      <aside className="w-full lg:w-80 shrink-0 border-r border-stone-800/80 bg-stone-950/70 backdrop-blur-sm flex flex-col h-auto lg:h-[calc(100vh-5rem)]">
        {/* Search header */}
        <div className="p-4 border-b border-stone-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-400 flex items-center gap-1.5 font-mono">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              Repository Codex
            </span>
            <span className="text-[11px] font-mono text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
              {UNIVERSE_FILES.length} documents
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
            <input
              type="text"
              placeholder="Search files or contents..."
              value={fileFilter}
              onChange={(e) => setFileFilter(e.target.value)}
              className="w-full bg-stone-900/90 border border-stone-800 text-stone-200 text-xs rounded-lg pl-9 pr-3 py-2 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 rounded text-xs transition font-medium ${
                  activeCategory === cat
                    ? 'bg-amber-950/80 text-amber-200 border border-amber-800/80'
                    : 'bg-stone-900/50 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {cat === 'All' ? 'All' : cat.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 divide-y divide-stone-900">
          {filteredFiles.map((file) => {
            const isSelected = file.id === currentFile.id;
            return (
              <button
                key={file.id}
                onClick={() => {
                  setSelectedFileId(file.id);
                  if (onSelectFile) onSelectFile(file);
                }}
                className={`w-full text-left p-2.5 rounded-lg transition group flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-amber-950/50 border border-amber-800/80 text-amber-100 shadow-sm'
                    : 'hover:bg-stone-900/80 text-stone-400 hover:text-stone-200 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    {getCategoryIcon(file.category)}
                    <span className="font-mono text-xs font-medium truncate text-stone-200 group-hover:text-amber-200">
                      {file.path}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  )}
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1 pl-5 font-serif">
                  {file.title}
                </div>
              </button>
            );
          })}

          {filteredFiles.length === 0 && (
            <div className="text-center py-8 text-stone-500 text-xs">
              No canonical documents match "{fileFilter}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-stone-800/80 bg-stone-950 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Authority: Git Canonical</span>
          <span className="font-mono text-amber-400/80">Reelfoot Rift Protocol</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto bg-stone-950/40">
        {/* Document Header Bar */}
        <div className="sticky top-0 z-20 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded bg-stone-900 border border-stone-800">
              {getCategoryIcon(currentFile.category)}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                <span>{currentFile.category}</span>
                <span>/</span>
                <span className="text-amber-400/90">{currentFile.path}</span>
              </div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-amber-100 line-clamp-1">
                {currentFile.title}
              </h1>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 text-xs">
            {/* Font size control */}
            <div className="hidden sm:flex items-center border border-stone-800 rounded-lg p-0.5 bg-stone-900/60">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded text-[11px] font-mono ${
                  fontSize === 'sm' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-1 rounded text-[11px] font-mono ${
                  fontSize === 'md' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded text-[11px] font-mono ${
                  fontSize === 'lg' ? 'bg-amber-950 text-amber-200' : 'text-stone-400'
                }`}
              >
                A+
              </button>
            </div>

            {/* View Mode Toggle */}
            <button
              onClick={() => setViewMode(viewMode === 'rendered' ? 'raw' : 'rendered')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 transition"
              title="Toggle rendered view vs raw markdown"
            >
              {viewMode === 'rendered' ? (
                <>
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Raw Source</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Rendered</span>
                </>
              )}
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopyContent}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 transition"
              title="Copy markdown text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Body with optional Table of Contents */}
        <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
          {/* Quick Context Banner for special documents */}
          {currentFile.id === 'CANON' && (
            <div className="mb-6 p-4 rounded-xl border border-amber-900/60 bg-amber-950/20 text-stone-300 text-xs space-y-1">
              <div className="font-semibold text-amber-300 flex items-center gap-2 text-sm font-serif">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Locked Canonical Authority
              </div>
              <p className="leading-relaxed">
                This document controls the in-universe reality of Alchul. Real science belongs in <code className="text-sky-300">RESEARCH/</code>; narrative fiction in <code className="text-emerald-300">WRITING/</code>.
              </p>
            </div>
          )}

          {currentFile.id === 'ALCHUL' && (
            <div className="mb-6 p-4 rounded-xl border border-purple-900/60 bg-purple-950/20 text-stone-300 text-xs space-y-1">
              <div className="font-semibold text-purple-300 flex items-center gap-2 text-sm font-serif">
                <Sparkles className="w-4 h-4 text-purple-400" />
                The Core Ontological Mystery
              </div>
              <p className="leading-relaxed">
                Alchul is canonically real inside the story and canonically unresolved. No agent or creator is permitted to explain Alchul away into a generic alien or deity.
              </p>
            </div>
          )}

          {/* Table of Contents Pill Bar */}
          {tableOfContents.length > 3 && (
            <div className="mb-6 p-3 rounded-lg border border-stone-800/80 bg-stone-900/40">
              <div className="text-[11px] font-mono uppercase text-stone-400 mb-2 flex items-center gap-1.5 font-semibold">
                <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
                Document Outline
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {tableOfContents.slice(0, 10).map((item, idx) => (
                  <a
                    key={idx}
                    href={`#section-${item.lineIndex}`}
                    className={`px-2 py-1 rounded border transition ${
                      item.level === 1
                        ? 'bg-stone-900 text-amber-200 border-stone-700 font-serif font-medium'
                        : 'bg-stone-950/70 text-stone-400 border-stone-800 hover:text-stone-200'
                    }`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Main Document Content */}
          <div className={
            fontSize === 'sm' ? 'text-sm' : fontSize === 'lg' ? 'text-lg leading-relaxed' : 'text-base'
          }>
            {viewMode === 'rendered' ? (
              <MarkdownRenderer
                content={currentFile.content}
                onLinkClick={handleLinkJump}
              />
            ) : (
              <pre className="p-4 rounded-xl border border-stone-800 bg-stone-950 text-stone-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {currentFile.content}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
