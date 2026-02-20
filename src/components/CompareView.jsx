import React from 'react';
import { X } from 'lucide-react';

export default function CompareView({ projects, allProjects, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-6xl max-h-[90vh] bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gray-900/95 backdrop-blur border-b border-gray-800 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Compare Projects</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-400">Comparing {projects.length} projects...</p>
        </div>
      </div>
    </div>
  );
}
