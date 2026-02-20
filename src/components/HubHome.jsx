import React, { useState } from 'react';
import {
  FlaskConical, Sparkles, Clock, Search, BarChart3,
  FileText, Database, Package, Timer, BookOpen, Zap, GraduationCap, Brain, Eye,
  Library, Users, HardDrive, GitBranch, Globe, ChevronRight,
} from 'lucide-react';
import ProjectDetailFlyout from './ProjectDetailFlyout';
import CompareView from './CompareView';

const LENS_BADGES = {
  standard: { label: 'Research', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  product: { label: 'Product Compare', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  population: { label: 'Population', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  behavior: { label: 'Behavior', bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
  industry: { label: 'Industry', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  culture: { label: 'Culture', bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
};

function LensBadge({ lens }) {
  const badge = LENS_BADGES[lens] || LENS_BADGES.standard;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
      {badge.label}
    </span>
  );
}

const VISIBILITY_CONFIG = {
  local: { icon: HardDrive, label: 'Local', bg: 'bg-gray-800/50', text: 'text-gray-400', border: 'border-gray-700/50' },
  personal: { icon: GitBranch, label: 'Synced', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  public: { icon: Globe, label: 'Public', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
};

function VisibilityBadge({ visibility = 'personal' }) {
  const config = VISIBILITY_CONFIG[visibility] || VISIBILITY_CONFIG.personal;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${config.bg} ${config.text} ${config.border}`}
      title={`Visibility: ${config.label}`}>
      <Icon className="w-2.5 h-2.5" />
      {config.label}
    </span>
  );
}

function ProjectCard({ project, onProjectClick, getAccent, formatDate, ProjectIcon, source = 'local' }) {
  const accent = getAccent(project.accentColor);

  return (
    <div
      onClick={() => onProjectClick(project.slug, source)}
      role="button"
      tabIndex={0}
      className="group relative text-left p-5 rounded-xl border bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 cursor-pointer border-gray-800/80"
    >
      <div className={`absolute top-0 left-4 right-4 h-px ${accent.border} opacity-50 group-hover:opacity-100 transition-opacity`} />

      <div className="flex items-start gap-3.5">
        <div className={`w-9 h-9 rounded-lg ${accent.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <ProjectIcon iconName={project.icon} className={`w-4.5 h-4.5 ${accent.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-100 text-sm leading-tight group-hover:text-white transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            {project.subtitle}
          </p>
        </div>
      </div>

      {project.query && (
        <p className="text-[11px] text-gray-600 mt-3 line-clamp-2 leading-relaxed italic">
          "{project.query}"
        </p>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/50">
        <div className="flex items-center gap-2">
          <LensBadge lens={project.lens} />
          <VisibilityBadge visibility={project.visibility || 'personal'} />
          <span className="text-[10px] text-gray-600">
            {formatDate(project.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function HubHome({ projects, publicProjects = [], onProjectClick, getAccent, formatDate, ProjectIcon }) {
  const projectsWithVisibility = projects.map(p => ({
    ...p,
    visibility: p.visibility || 'personal',
  }));

  return (
    <div className="min-h-full">
      <div className="border-b border-gray-800/50 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Research Hub
              </h1>
            </div>
          </div>
          <p className="text-gray-400 text-sm lg:text-base max-w-2xl leading-relaxed">
            Your collection of AI-powered research dashboards. Each project is an interactive
            visualization built from deep research on a topic you explored.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          My Research
        </h2>
        {projects.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-800 rounded-xl">
            <FlaskConical className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-400 mb-1">No research yet</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Start a new research project by asking your AI assistant to research any topic.
              It will appear here as an interactive dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {projectsWithVisibility.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                onProjectClick={onProjectClick}
                getAccent={getAccent}
                formatDate={formatDate}
                ProjectIcon={ProjectIcon}
                source="local"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
