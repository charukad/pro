import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, Calendar, Tag, Filter, X, Loader2 } from 'lucide-react';
import GlobalCursor from '@/components/GlobalCursor';
import { API_ENDPOINTS } from '@/config/config';

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  category: string;
  status: string;
  clientName: string;
  projectUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  images: { url: string; filename: string }[];
  startDate?: string;
  endDate?: string;
  featured: boolean;
  tags: string[];
  createdTime: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Backend Development', 'DevOps'];
  const statuses = ['All', 'Completed', 'In Progress', 'Planning'];

  useEffect(() => {
    fetchProjects();
  }, []);


  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.PROJECTS);
      if (!response.ok) {
        throw new Error(`Backend not available: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
        setError(null);
      } else {
        throw new Error('Invalid data format from local backend');
      }
    } catch (err) {
      setError('❌ Local backend server is not running. Please run "npm run dev".');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = useCallback(() => {
    let filtered = projects;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }
    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedStatus]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const ProjectModal = ({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="glass-dark rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-2">{project.title}</h2>
              <p className="text-foreground/60">{project.clientName}</p>
            </div>
            <button
              onClick={onClose}
              className="glass p-2 rounded-lg hover:glow-blue transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
          {project.imageUrl && (
            <div className="mb-6 rounded-xl overflow-hidden bg-gray-900/30">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-80 md:h-96 object-contain"
              />
            </div>
          )}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Project Details</h3>
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {project.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 glass rounded-full text-xs font-medium flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="glass rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3">Project Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Category:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Status:</span>
                    <span className={`font-medium px-2 py-1 rounded text-xs ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  {project.startDate && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Started:</span>
                      <span className="font-medium">{formatDate(project.startDate)}</span>
                    </div>
                  )}
                  {project.endDate && (
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Completed:</span>
                      <span className="font-medium">{formatDate(project.endDate)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 glass px-4 py-3 rounded-lg font-semibold hover:glow-blue transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <GlobalCursor />
        <section id="all-projects" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                All <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Explore our complete portfolio of projects.
              </p>
            </div>
            <div className="flex justify-center items-center py-20">
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin" size={24} />
                <span className="text-lg">Loading projects...</span>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <GlobalCursor />
        <section id="all-projects" className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                All <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Explore our complete portfolio of projects.
              </p>
            </div>
            <div className="text-center py-20">
              <div className="glass-dark rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4 text-red-400">Unable to load projects</h3>
                <p className="text-foreground/60 mb-4">{error}</p>
                <button
                  onClick={fetchProjects}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <GlobalCursor />
      <section id="all-projects" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              All <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Explore our complete portfolio of projects.
            </p>
          </div>
          {/* Filters */}
          <div className="glass-dark rounded-2xl p-6 mb-12 max-w-4xl mx-auto border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Filter Label Section */}
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl border border-blue-500/20">
                <Filter size={18} className="text-blue-400" />
                <span className="text-sm font-semibold text-blue-400">Filter Projects:</span>
              </div>
              
              {/* Filter Controls Section */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Category Filter */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-foreground/60 mb-1 ml-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="glass px-4 py-3 rounded-xl text-sm font-medium min-w-[180px] 
                             focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50
                             hover:glow-blue transition-all duration-300 cursor-pointer
                             border border-white/10 hover:border-blue-400/30
                             bg-gradient-to-r from-gray-900/50 to-gray-800/50"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-gray-800 text-white">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Status Filter */}
                <div className="relative group">
                  <label className="block text-xs font-medium text-foreground/60 mb-1 ml-1">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="glass px-4 py-3 rounded-xl text-sm font-medium min-w-[160px]
                             focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50
                             hover:glow-purple transition-all duration-300 cursor-pointer
                             border border-white/10 hover:border-purple-400/30
                             bg-gradient-to-r from-gray-900/50 to-gray-800/50"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status} className="bg-gray-800 text-white">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Filter Results Counter */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-lg border border-green-500/20">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-xs font-medium text-green-400">
                    {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>
            </div>
            
            {/* Active Filters Display */}
            {(selectedCategory !== 'All' || selectedStatus !== 'All') && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <span className="text-xs text-foreground/60 font-medium">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="ml-1 hover:bg-blue-500/30 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedStatus !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium border border-purple-500/30">
                    {selectedStatus}
                    <button
                      onClick={() => setSelectedStatus('All')}
                      className="ml-1 hover:bg-purple-500/30 rounded-full p-0.5 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                  className="text-xs text-foreground/60 hover:text-red-400 font-medium underline transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="glass-dark rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4">No projects found</h3>
                <p className="text-foreground/60">Try adjusting your filters to see more projects.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group glass-dark rounded-xl overflow-hidden hover:glow-purple transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden h-64 md:h-72 lg:h-80">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-contain bg-gray-900/50 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full text-xs font-bold text-black">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold gradient-text group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                        project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-foreground/80 mb-4 text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 glass rounded text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {project.startDate ? formatDate(project.startDate) : 'TBD'}
                      </div>
                      <div className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-600/10 px-2 py-1 rounded">
                        {project.category}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.projectUrl && (
                        <button className="flex-1 glass px-3 py-2 rounded text-xs font-medium hover:glow-blue transition-all duration-300 flex items-center justify-center gap-1">
                          <ExternalLink size={12} />
                          Live
                        </button>
                      )}
                      {project.githubUrl && (
                        <button className="flex-1 glass px-3 py-2 rounded text-xs font-medium hover:glow-blue transition-all duration-300 flex items-center justify-center gap-1">
                          <Github size={12} />
                          Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Project Detail Modal */}
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
          {/* Back Button */}
          <div className="flex justify-center mt-12">
            <a
              href="/"
              className="bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProjects; 