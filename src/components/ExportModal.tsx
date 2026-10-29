import React, { useState } from 'react';
import { UNIVERSE_FILES } from '../data/universeData.ts';
import { Download, X, Copy, Check, GitBranch, ShieldCheck, Terminal } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(UNIVERSE_FILES, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'alchul_canonical_archive.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyAll = () => {
    const fullText = UNIVERSE_FILES.map(f => `=== FILE: ${f.path} ===\n\n${f.content}\n\n`).join('\n' + '='.repeat(40) + '\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-500" />
            <h2 className="font-serif font-bold text-lg text-amber-100">
              Repository Provenance & Export
            </h2>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-stone-800 text-stone-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm">
          <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
              Upstream Source
            </span>
            <div className="font-mono text-xs text-stone-200 select-all">
              https://github.com/SouthPaw302/Alchul
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Canonical repository for the Alchul universe: reconstructed natural history and deep-time history.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-stone-200 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Download & Export Archive
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadJSON}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-700 text-amber-200 font-medium text-xs transition shadow"
              >
                <Download className="w-4 h-4" />
                Download JSON Bundle
              </button>

              <button
                onClick={handleCopyAll}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 font-medium text-xs transition shadow"
              >
                {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copiedAll ? 'Copied Full Archive' : 'Copy All 19 Markdown Files'}
              </button>
            </div>
          </div>

          {/* Agent Boot Rules */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/60 space-y-2 text-xs">
            <div className="font-serif font-bold text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Agent Boot Rules (AGENT_BOOT.md)
            </div>
            <ul className="text-stone-300 space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
              <li>Treat Git repository as canonical authority.</li>
              <li>Do not turn the founders into generic raptors, birds, or reptilian humanoids.</li>
              <li>Do not assume human-style technology, writing, government, or spacecraft.</li>
              <li>Do not define Alchul's true nature or ontology.</li>
              <li>Real science and in-universe interpretation must remain visibly separate.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
