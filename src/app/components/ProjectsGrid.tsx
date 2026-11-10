'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Lock, Play } from 'lucide-react';
import Badge from './Badge';
import Panel from './Panel';
import CoordinateLabel from './CoordinateLabel';
import VideoModal from './VideoModal';
import projectsData from '../../content/projects.json';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '../../types/project';

const projects = projectsData as Project[];

interface ProjectsGridProps {
  /** Only show projects marked `featured` (home page). */
  featuredOnly?: boolean;
  /** Show the category filter row (projects page). */
  showFilter?: boolean;
}

type Filter = 'all' | ProjectCategory;

// Featured first (in array order), then newest first. Array order breaks ties,
// since Array.prototype.sort is stable.
function sortProjects(list: Project[]): Project[] {
  return [...list].sort((a, b) => {
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return b.year - a.year;
  });
}

const chipBase =
  'px-4 py-2 rounded-sm font-mono text-[13px] uppercase tracking-[0.04em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg';

const linkBase =
  'inline-flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.04em] text-brand-accent hover:text-brand-text transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface rounded-sm';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function ProjectsGrid({ featuredOnly = false, showFilter = false }: ProjectsGridProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);

  const pool = useMemo(
    () => sortProjects(featuredOnly ? projects.filter((p) => p.featured) : projects),
    [featuredOnly],
  );

  // Only offer categories that actually have projects, in canonical order.
  const categories = useMemo(
    () => PROJECT_CATEGORIES.filter((c) => pool.some((p) => p.category === c)),
    [pool],
  );

  const visible = useMemo(
    () => (filter === 'all' ? pool : pool.filter((p) => p.category === filter)),
    [pool, filter],
  );

  return (
    <div className="space-y-6">
      {showFilter && categories.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {(['all', ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`${chipBase} ${
                filter === c
                  ? 'bg-brand-accent text-white'
                  : 'bg-brand-surface text-brand-text hover:bg-white/10'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.article
              key={project.slug}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <ProjectCard
                project={project}
                index={index}
                onWatch={() => setActiveVideo(project)}
              />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="text-center py-12 text-brand-text-muted text-lg">No projects in this category yet.</p>
      )}

      {activeVideo?.video && activeVideo.videoPoster && (
        <VideoModal
          src={activeVideo.video}
          poster={activeVideo.videoPoster}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onWatch,
}: {
  project: Project;
  index: number;
  onWatch: () => void;
}) {
  const isPrivate = project.visibility === 'private';
  const primaryLink = isPrivate ? undefined : project.links.demo ?? project.links.repo;
  const hasLinks = !isPrivate && (project.links.demo || project.links.repo);

  return (
    <Panel
      bracketsOnHover
      className="h-full overflow-hidden flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Media */}
      {project.video && project.videoPoster ? (
        <button
          type="button"
          onClick={onWatch}
          aria-label={`Watch ${project.title} demo video`}
          className="group/media relative block h-48 w-full bg-brand-surface overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
        >
          <Image
            src={project.videoPoster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover/media:scale-105 transition-transform duration-300"
          />
          <span className="absolute inset-0 bg-black/0 group-hover/media:bg-black/30 transition-colors duration-200" />
          {/* Corner chip instead of a centered button, so poster titles stay readable */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sm bg-brand-bg/85 border border-brand-border group-hover/media:border-brand-accent px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.04em] text-brand-text transition-colors duration-200">
            <Play className="w-3 h-3 fill-brand-accent text-brand-accent" aria-hidden="true" />
            Watch demo
          </span>
        </button>
      ) : project.cover ? (
        <div className="relative h-48 bg-brand-surface overflow-hidden">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
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
          <CoordinateLabel className="absolute bottom-3 left-3">{project.category}</CoordinateLabel>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <CoordinateLabel className="text-brand-text-muted">
              {project.category} · {project.year}
            </CoordinateLabel>
            {project.award && <CoordinateLabel className="text-right">{project.award}</CoordinateLabel>}
          </div>
          <h3 className="text-xl font-semibold text-brand-text">
            {primaryLink ? (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-sm"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
        </div>

        <p className="text-brand-text-secondary text-sm leading-relaxed">{project.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Explicit destinations, pinned to the card bottom so rows line up */}
        {(isPrivate || hasLinks) && (
          <div className="mt-auto pt-4 border-t border-brand-border flex flex-wrap items-center gap-x-6 gap-y-2">
            {isPrivate ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.04em] text-brand-text-muted">
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                Private · ask me about it
              </span>
            ) : hasLinks ? (
              <>
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={linkBase}>
                    Live
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">: {project.title} live demo (opens in new tab)</span>
                  </a>
                )}
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={linkBase}>
                    Code
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    <span className="sr-only">: {project.title} source on GitHub (opens in new tab)</span>
                  </a>
                )}
              </>
            ) : null}
          </div>
        )}
      </div>
    </Panel>
  );
}
