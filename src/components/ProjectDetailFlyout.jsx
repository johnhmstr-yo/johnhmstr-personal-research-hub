import React from 'react';
import { X } from 'lucide-react';

export default function ProjectDetailFlyout({ project, allProjects, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-2xl h-full bg-gray-900 border-l border-gray-800 shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{project.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-400">Extended telemetry details will appear here.</p>
        </div>
      </div>
    </div>
  );
}
