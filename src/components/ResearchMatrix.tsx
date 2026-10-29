import React, { useState } from 'react';
import { RESEARCH_TOPICS, ResearchTopic, EvidenceStatus } from '../data/researchData.ts';
import { 
  Compass, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ExternalLink, 
  Filter,
  Layers,
  Search
} from 'lucide-react';

export const ResearchMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Paleontology & Anatomy',
    'Geology & Deep Earth',
    'Botany & Fermentation',
    'Cognition & Culture',
    'Catastrophe & Survival'
  ];

  const statuses: ('All' | EvidenceStatus)[] = [
    'All',
    'Established Science',
    'Plausible Inference',
    'In-Universe Canon'
  ];

  const filteredTopics = RESEARCH_TOPICS.filter(t => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    const matchesSearch = !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.realWorldEvidence.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: EvidenceStatus) => {
    switch (status) {
      case 'Established Science':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            Established Science
          </span>
        );
      case 'Plausible Inference':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-sky-950/80 text-sky-300 border border-sky-800">
            <HelpCircle className="w-3 h-3 text-sky-400" />
            Plausible Inference
          </span>
        );
      case 'In-Universe Canon':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800">
            <Sparkles className="w-3 h-3 text-purple-400" />
            In-Universe Canon
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-5rem)] bg-stone-950 text-stone-200 overflow-y-auto">
      {/* Banner */}
      <div className="p-6 lg:p-8 border-b border-stone-800/80 bg-gradient-to-r from-stone-950 via-stone-900 to-sky-950/20">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400 font-bold tracking-wider">
            <Compass className="w-4 h-4 text-sky-400" />
            Empirical Validation & Methodology
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            Real Paleontology & Geology vs Speculative Extrapolation
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-4xl leading-relaxed">
            Core Rule of Alchul: The universe is built from evidence outward. Real geological, paleontological, botanical, and evolutionary evidence is strictly segregated from speculative and fictional canon.
          </p>

          {/* Search and Filters */}
          <div className="pt-2 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                placeholder="Filter by keyword, formation, or research paper..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-1">
              {statuses.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition ${
                    selectedStatus === st
                      ? 'bg-sky-950 text-sky-200 border border-sky-700'
                      : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:text-stone-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs transition ${
                  selectedCategory === cat
                    ? 'bg-stone-800 text-amber-200 font-medium'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto w-full p-6 lg:p-8 space-y-6 flex-1">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span>Showing {filteredTopics.length} documented research topics</span>
          <span>Source: RESEARCH/ directory</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-6 rounded-2xl border border-stone-800 bg-stone-900/40 space-y-4 hover:border-stone-700 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-stone-400 uppercase">
                    {topic.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-100">
                    {topic.title}
                  </h3>
                </div>
                <div>{getStatusBadge(topic.status)}</div>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {topic.summary}
              </p>

              {/* Side-by-side Evidence vs Extrapolation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2">
                  <div className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Published Empirical Evidence
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {topic.realWorldEvidence}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800/80 space-y-2">
                  <div className="text-xs font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Speculative Fictional Extrapolation
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    {topic.speculativeExtrapolation}
                  </p>
                </div>
              </div>

              {/* Citations & In-Universe Application */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-stone-500 font-mono">Published References:</span>
                  {topic.fossilOrGeologicalRefs.map((ref, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-400 font-mono text-[11px]"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
                <div className="text-stone-400 italic text-[11px]">
                  <strong>Canon Impact:</strong> {topic.canonicalApplication}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
