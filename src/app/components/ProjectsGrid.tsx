'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Badge from './Badge';
import Panel from './Panel';
import CoordinateLabel from './CoordinateLabel';
import projectsData from '../../content/projects.json';

interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  cover?: string;
  links: {
    demo?: string;
    repo?: string;
  };
  highlights: string[];
}

interface ProjectsGridProps {
  limit?: number;
}

export default function ProjectsGrid({ limit }: ProjectsGridProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Get all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projectsData.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on selected tag and limit
  const filteredProjects = useMemo(() => {
    let filtered = projectsData;
    
    if (selectedTag !== 'all') {
      filtered = projectsData.filter(project => 
        project.tags.includes(selectedTag)
      );
    }
    
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    
    return filtered;
  }, [selectedTag, limit]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-4 py-2 rounded-sm font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg ${
            selectedTag === 'all'
              ? 'bg-brand-accent text-white'
              : 'bg-brand-surface text-brand-text hover:bg-white/10'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-sm font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg ${
              selectedTag === tag
                ? 'bg-brand-accent text-white'
                : 'bg-brand-surface text-brand-text hover:bg-white/10'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project: Project, index: number) => {
            const link = project.links.repo || project.links.demo;
            const interactiveProps = link
              ? {
                  tabIndex: 0,
                  role: 'button' as const,
                  className: 'group focus-within:ring-2 focus-within:ring-brand-accent focus-within:ring-offset-2 focus-within:ring-offset-brand-bg cursor-pointer',
                  onClick: () => window.open(link, '_blank', 'noopener,noreferrer'),
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      window.open(link, '_blank', 'noopener,noreferrer');
                    }
                  },
                  'aria-label': `View ${project.title} project`,
                }
              : { className: 'group' };

            return (
              <motion.article
                key={project.slug}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                {...interactiveProps}
              >
                <Panel bracketsOnHover className="h-full overflow-hidden flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  {/* Project Image */}
                  {project.cover ? (
                    <div className="relative h-48 bg-gray-800 overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 bg-brand-surface overflow-hidden flex items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="font-display font-bold text-brand-accent/[0.08] text-[120px] leading-none select-none"
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <CoordinateLabel className="absolute bottom-3 left-3">{project.tags[0]}</CoordinateLabel>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Click indicator */}
                    {link && (
                      <div className="flex items-center gap-2 pt-2 text-brand-accent text-sm">
                        <span>Click to view project</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Panel>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">
            No projects found with the selected filter.
          </p>
        </motion.div>
      )}
    </div>
  );
}
