import React from 'react';

interface MarkdownRendererProps {
  content: string;
  onLinkClick?: (path: string) => void;
  highlightQuery?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  onLinkClick,
  highlightQuery
}) => {
  // Simple yet powerful markdown parser that preserves typography and adds custom styling
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLang = '';

  const formatInline = (text: string): React.ReactNode => {
    // If highlight query is present
    let formatted = text;

    // Check for inline badges like [Established], [Plausible], [Unknown / fictional]
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|\b(?:Established|Plausible|Unknown \/ fictional|fictional|canon)\b)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    let counter = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(renderTextWithHighlight(text.substring(lastIndex, match.index), highlightQuery, counter++));
      }
      const token = match[0];

      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={counter++} className="font-semibold text-amber-200">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('*') && token.endsWith('*')) {
        parts.push(
          <em key={counter++} className="italic text-stone-300">
            {token.slice(1, -1)}
          </em>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        const codeText = token.slice(1, -1);
        const isFileRef = codeText.endsWith('.md') || codeText.includes('/');
        parts.push(
          <code
            key={counter++}
            onClick={() => {
              if (isFileRef && onLinkClick) {
                onLinkClick(codeText);
              }
            }}
            className={`px-1.5 py-0.5 rounded text-xs font-mono border ${
              isFileRef
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/60 cursor-pointer hover:bg-amber-900/60 transition'
                : 'bg-stone-900 text-amber-200/90 border-stone-800'
            }`}
          >
            {codeText}
          </code>
        );
      } else if (token === 'Established') {
        parts.push(
          <span key={counter++} className="inline-block px-2 py-0.5 text-xs rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-mono font-medium">
            Established Science
          </span>
        );
      } else if (token === 'Plausible') {
        parts.push(
          <span key={counter++} className="inline-block px-2 py-0.5 text-xs rounded bg-sky-950/80 text-sky-300 border border-sky-800 font-mono font-medium">
            Plausible Inference
          </span>
        );
      } else if (token.toLowerCase().includes('fictional') || token.toLowerCase() === 'canon') {
        parts.push(
          <span key={counter++} className="inline-block px-2 py-0.5 text-xs rounded bg-purple-950/80 text-purple-300 border border-purple-800 font-mono font-medium">
            Canon Constraint
          </span>
        );
      } else {
        parts.push(renderTextWithHighlight(token, highlightQuery, counter++));
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(renderTextWithHighlight(text.substring(lastIndex), highlightQuery, counter++));
    }

    return parts;
  };

  const renderTextWithHighlight = (text: string, query?: string, key?: number | string) => {
    if (!query || !query.trim()) {
      return <span key={key}>{text}</span>;
    }
    const q = query.trim().toLowerCase();
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return <span key={key}>{text}</span>;

    return (
      <span key={key}>
        {text.substring(0, idx)}
        <mark className="bg-amber-500/40 text-amber-100 rounded px-1 py-0.5 font-medium">
          {text.substring(idx, idx + q.length)}
        </mark>
        {renderTextWithHighlight(text.substring(idx + q.length), query, `${key}-tail`)}
      </span>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // close block
        renderedElements.push(
          <div key={`code-${i}`} className="my-4 rounded-lg overflow-hidden border border-stone-800 bg-stone-950/90 font-mono text-xs">
            <div className="bg-stone-900/80 px-3 py-1.5 text-stone-400 border-b border-stone-800 flex justify-between items-center">
              <span>{codeBlockLang || 'text'}</span>
              <span className="text-[10px] text-stone-500 uppercase">Archive Record</span>
            </div>
            <pre className="p-4 text-stone-300 overflow-x-auto leading-relaxed">
              <code>{codeBlockContent.join('\n')}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '');
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      renderedElements.push(<hr key={`hr-${i}`} className="my-8 border-stone-800/80" />);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${i}`} id={`section-${i}`} className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mt-8 mb-4 tracking-tight border-b border-amber-900/40 pb-3 flex items-center gap-3">
          <span className="w-1.5 h-6 bg-amber-500/80 rounded-sm"></span>
          <span>{formatInline(line.replace('# ', ''))}</span>
        </h1>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${i}`} id={`section-${i}`} className="text-xl sm:text-2xl font-serif font-semibold text-amber-200 mt-7 mb-3 border-b border-stone-800/60 pb-2">
          {formatInline(line.replace('## ', ''))}
        </h2>
      );
      continue;
    }
    if (line.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${i}`} id={`section-${i}`} className="text-lg font-serif font-medium text-stone-200 mt-5 mb-2">
          {formatInline(line.replace('### ', ''))}
        </h3>
      );
      continue;
    }
    if (line.startsWith('#### ')) {
      renderedElements.push(
        <h4 key={`h4-${i}`} className="text-base font-sans font-semibold text-stone-300 mt-4 mb-1">
          {formatInline(line.replace('#### ', ''))}
        </h4>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteText = line.replace(/^>\s?/, '');
      renderedElements.push(
        <blockquote key={`quote-${i}`} className="border-l-2 border-amber-600/70 pl-4 py-1.5 my-3 italic text-stone-300 bg-amber-950/15 rounded-r">
          {formatInline(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Unordered List item
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const listText = line.trim().replace(/^[-*]\s+/, '');
      renderedElements.push(
        <div key={`li-${i}`} className="flex items-start gap-2.5 my-1.5 text-stone-300 leading-relaxed pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80 mt-2 shrink-0"></span>
          <div>{formatInline(listText)}</div>
        </div>
      );
      continue;
    }

    // Numbered List
    const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      renderedElements.push(
        <div key={`nli-${i}`} className="flex items-start gap-3 my-1.5 text-stone-300 leading-relaxed pl-2">
          <span className="font-mono text-xs text-amber-400/80 mt-1 font-semibold w-5 shrink-0 text-right">
            {numMatch[1]}.
          </span>
          <div>{formatInline(numMatch[2])}</div>
        </div>
      );
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      renderedElements.push(<div key={`empty-${i}`} className="h-3" />);
      continue;
    }

    // Standard paragraph
    renderedElements.push(
      <p key={`p-${i}`} className="my-2 text-stone-300 leading-relaxed">
        {formatInline(line)}
      </p>
    );
  }

  return (
    <article className="prose-invert max-w-none text-stone-300 font-sans text-[15px] selection:bg-amber-900/60 selection:text-amber-100">
      {renderedElements}
    </article>
  );
};
