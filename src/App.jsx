import React, { useState, Suspense } from 'react';
import {
  Search, ChevronLeft, ChevronRight, ArrowLeft, Menu, X,
  Microscope, FlaskConical, Library, Sparkles,
} from 'lucide-react';
import { projectRegistry, projectComponents } from './projects';
import HubHome from './components/HubHome';

// Import public library projects via Vite alias — resolves to the public library's src/projects
let publicProjectRegistry = [];
let publicProjectComponents = {};
try {
  const publicLib = await import('@public-library/projects');
  publicProjectRegistry = publicLib.projectRegistry || [];
  publicProjectComponents = publicLib.projectComponents || {};
} catch (e) {
  // Public library not configured or not available — show personal projects only
  console.log('Public library not available:', e.message);
}

const allMyProjects = projectRegistry.map(p => ({ ...p, visibility: p.visibility || 'personal' }));
const allMyComponents = { ...projectComponents };

// Dedup: remove user's own projects from public library (if any match)
const dedupPublicProjects = publicProjectRegistry.filter(libProject => {
  return !allMyProjects.some(
    myP => myP.title === libProject.title && myP.createdAt === libProject.createdAt
  );
});

const hasPublicLibrary = publicProjectRegistry.length > 0;

function ProjectIcon({ iconName, className }) {
  const icons = {
    Building2: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
      </svg>
    ),
    Filter: (props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
      </svg>
    ),
    FlaskConical: (props) => <FlaskConical {...props} />,
  };
  const Icon = icons[iconName] || FlaskConical;
  return <Icon className={className} />;
}

const ACCENT_COLORS = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500', ring: 'ring-cyan-500/20' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500', ring: 'ring-orange-500/20' },
  violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500', ring: 'ring-violet-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500', ring: 'ring-emerald-500/20' },
  rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500', ring: 'ring-rose-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500', ring: 'ring-blue-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500', ring: 'ring-amber-500/20' },
};

function getAccent(color) {
  return ACCENT_COLORS[color] || ACCENT_COLORS.cyan;
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function SidebarProjectList({ projects, searchQuery, activeProject, activeSource, source, onProjectClick, sidebarOpen }) {
  const filtered = searchQuery
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.query && p.query.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : projects;

  if (filtered.length === 0 && sidebarOpen) {
    return (
      <div className="px-3 py-3 text-center text-xs text-gray-600">
        {searchQuery ? 'No matches' : 'No projects yet'}
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {filtered.map((project) => {
        const isActive = activeProject === project.slug && activeSource === source;
        const accent = getAccent(project.accentColor);
        return (
          <button
            key={project.slug}
            onClick={() => onProjectClick(project.slug, source)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 group ${
              isActive
                ? `${accent.bg} ${accent.text}`
                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
            }`}
            title={project.title}
          >
            <div className={`flex-shrink-0 ${isActive ? accent.text : 'text-gray-500 group-hover:text-gray-400'}`}>
              <ProjectIcon iconName={project.icon} className="w-4 h-4" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0 text-left">
                <div className="truncate font-medium text-[13px] leading-tight">
                  {project.title}
                </div>
                <div className="truncate text-[10px] text-gray-500 mt-0.5">
                  {formatDate(project.createdAt)}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeSource, setActiveSource] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personalSearch, setPersonalSearch] = useState('');

  const sortedProjects = [...allMyProjects].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleProjectClick = (slug, source = 'local') => {
    setActiveProject(slug);
    setActiveSource(source);
    setMobileMenuOpen(false);
  };

  const handleBack = () => {
    setActiveProject(null);
    setActiveSource(null);
    setMobileMenuOpen(false);
  };

  const ActiveProjectComponent = activeProject ? allMyComponents[activeProject] : null;
  const activeProjectMeta = activeProject
    ? allMyProjects.find(p => p.slug === activeProject)
    : null;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800/90 backdrop-blur p-2 rounded-lg border border-gray-700 shadow-lg"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-300" />
        )}
      </button>

      <aside
        className={`
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'w-72' : 'w-16'}
          fixed lg:static inset-y-0 left-0 z-40
          bg-gray-900/95 backdrop-blur-sm border-r border-gray-800
          flex flex-col transition-all duration-300
        `}
      >
        <div className="p-4 border-b border-gray-800 flex-shrink-0">
          {sidebarOpen ? (
            <button onClick={handleBack} className="flex items-center gap-3 w-full text-left group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Microscope className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                  Research Hub
                </h1>
                <p className="text-[10px] text-gray-500 truncate">
                  {allMyProjects.length} project{allMyProjects.length !== 1 ? 's' : ''}
                </p>
              </div>
            </button>
          ) : (
            <button onClick={handleBack} className="flex justify-center w-full group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/20 transition-shadow">
                <Microscope className="w-4.5 h-4.5 text-white" />
              </div>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {sidebarOpen && (
            <div className="px-4 pt-4 pb-1 flex-shrink-0">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                My Research
              </span>
            </div>
          )}

          {sidebarOpen && (
            <div className="px-3 pt-2 pb-1 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search my research..."
                  value={personalSearch}
                  onChange={(e) => setPersonalSearch(e.target.value)}
                  className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
                />
              </div>
            </div>
          )}

          <nav className="px-2 py-1">
            <SidebarProjectList
              projects={sortedProjects}
              searchQuery={personalSearch}
              activeProject={activeProject}
              activeSource={activeSource}
              source="local"
              onProjectClick={handleProjectClick}
              sidebarOpen={sidebarOpen}
            />
          </nav>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden lg:flex p-3 border-t border-gray-800 text-gray-500 hover:text-gray-300 transition-colors items-center justify-center flex-shrink-0"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </aside>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className={`flex-1 flex flex-col ${activeProject ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {activeProject && ActiveProjectComponent ? (
          <>
            <div className="flex-shrink-0 border-b bg-gray-900/50 border-gray-800 px-4 py-2 flex items-center gap-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <span className="text-gray-700">|</span>
              <span className="text-xs text-gray-400 truncate">{activeProjectMeta?.title}</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {ActiveProjectComponent && (
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm text-gray-500">Loading {activeProjectMeta?.title || 'project'}...</p>
                      </div>
                    </div>
                  }
                >
                  <ActiveProjectComponent />
                </Suspense>
              )}
            </div>
          </>
        ) : (
          <HubHome
            projects={sortedProjects}
            publicProjects={dedupPublicProjects}
            onProjectClick={handleProjectClick}
            getAccent={getAccent}
            formatDate={formatDate}
            ProjectIcon={ProjectIcon}
          />
        )}
      </main>
    </div>
  );
}
