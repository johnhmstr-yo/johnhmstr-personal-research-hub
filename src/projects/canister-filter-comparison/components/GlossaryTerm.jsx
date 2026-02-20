import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { glossaryTerms } from '../data/glossaryTerms';

export default function GlossaryTerm({ term, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const flyoutRef = useRef(null);

  const termData = glossaryTerms[term];
  if (!termData) return <span>{children}</span>;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(termData.researchPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="relative inline-block">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className="border-b border-dotted border-indigo-400/40 cursor-pointer hover:border-indigo-400 hover:bg-indigo-500/10 transition-colors"
      >
        {children}
      </span>
      
      {isOpen && (
        <div
          ref={flyoutRef}
          className="absolute z-50 w-96 max-w-[90vw] bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 mt-2 left-0"
          style={{ top: '100%' }}
        >
          <h4 className="font-bold text-white mb-2">{term}</h4>
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">{termData.definition}</p>
          
          <div className="mb-1">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Deep dive with Research Visualizer:</p>
          </div>
          
          <div className="bg-gray-950 border border-gray-700 rounded-lg px-3 py-2 flex items-start gap-2">
            <p className="font-mono text-[11px] text-gray-300 leading-relaxed flex-1">
              {termData.researchPrompt}
            </p>
            <button
              onClick={handleCopy}
              className="text-gray-500 hover:text-white cursor-pointer flex-shrink-0 mt-0.5 transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </span>
  );
}
