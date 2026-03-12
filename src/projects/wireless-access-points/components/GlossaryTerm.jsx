import React, { useState } from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';

export default function GlossaryTerm({ term, definition, deepDive }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-cyan-400 border-b border-cyan-400 border-dotted hover:text-cyan-300 hover:border-cyan-300 transition-colors cursor-help"
      >
        {term}
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-80 bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl z-50 p-4">
            <div className="flex items-start gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">{term}</h4>
                <p className="text-gray-300 text-xs leading-relaxed">{definition}</p>
              </div>
            </div>
            
            {deepDive && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(deepDive)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Deep dive: {deepDive}</span>
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </span>
  );
}
