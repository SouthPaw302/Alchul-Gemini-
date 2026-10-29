import React, { useState, useMemo } from 'react';
import { UNIVERSE_FILES, UniverseFile } from '../data/universeData.ts';
import { Search, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (fileId: string, query?: string) => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query || query.trim().length < 2) return [];

    const q = query.toLowerCase().trim();
    const results: { file: UniverseFile; excerpt: string; matchCount: number }[] = [];

    UNIVERSE_FILES.forEach(file => {
      const contentLower = file.content.toLowerCase();
      if (contentLower.includes(q) || file.title.toLowerCase().includes(q)) {
        // Find best excerpt
        const index = contentLower.indexOf(q);
        const start = Math.max(0, index - 60);
        const end = Math.min(file.content.length, index + 140);
        let excerpt = file.content.substring(start, end).replace(/\n/g, ' ');
        if (start > 0) excerpt = '...' + excerpt;
        if (end < file.content.length) excerpt = excerpt + '...';

        const matchCount = (contentLower.match(new RegExp(q, 'g')) || []).length;

        results.push({
          file,
          excerpt,
          matchCount
        });
      }
    });

    return results.sort((a, b) => b.matchCount - a.matchCount);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search across canon, species anatomy, timeline, research, and chronicles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-stone-800 text-stone-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono px-2 py-1 rounded bg-stone-800 text-stone-400 hover:text-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 divide-y divide-stone-800/60 flex-1">
          {searchResults.length > 0 ? (
            searchResults.map(({ file, excerpt, matchCount }) => (
              <button
                key={file.id}
                onClick={() => {
                  onSelectResult(file.id, query);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-800/60 transition group flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-mono text-xs text-amber-300 font-medium">
                      {file.path}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                    {matchCount} {matchCount === 1 ? 'match' : 'matches'}
                  </span>
                </div>

                <div className="font-serif font-bold text-sm text-stone-100 group-hover:text-amber-200">
                  {file.title}
                </div>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {excerpt}
                </p>
              </button>
            ))
          ) : query.length >= 2 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              No canonical records found matching "{query}"
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-stone-500 space-y-2">
              <p>Type at least 2 characters to search the entire 3,500-line Alchul archive.</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Alchul', 'Reelfoot', 'The Harvest', 'Sen', 'Eru', 'incubation', 'feathers', 'maniraptoran'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-stone-950 border border-stone-800 text-stone-400 hover:text-amber-300 text-xs font-mono"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-800 bg-stone-950 text-[11px] text-stone-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3.5 h-3.5" /> Press Enter or click to open document
          </span>
          <span className="font-mono text-amber-500/80">Canonical Index</span>
        </div>
      </div>
    </div>
  );
};
