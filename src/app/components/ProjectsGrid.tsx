'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Lock, Play } from 'lucide-react';
import Figure from './drawing/Figure';
import LiveDot from './drawing/LiveDot';
import VideoModal from './VideoModal';
import projectsData from '../../content/projects.json';
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '../../types/project';

const projects = projectsData as Project[];
const linkClass = 'inline-flex min-h-11 items-center gap-1 font-mono text-xs uppercase tracking-wider text-brand-accent transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent';
type Filter = 'all' | ProjectCategory;

export default function ProjectsGrid({ featuredOnly = false, showFilter = false }: { featuredOnly?: boolean; showFilter?: boolean }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [activeVideo, setActiveVideo] = useState<Project | null>(null);
  const pool = projects.filter((p) => !featuredOnly || p.featured).sort((a, b) =>
    Number(!!b.featured) - Number(!!a.featured) || b.year - a.year,
  );
  const categories = PROJECT_CATEGORIES.filter((category) => pool.some((p) => p.category === category));
  const visible = pool.filter((p) => filter === 'all' || p.category === filter);

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-brand-border" role="group" aria-label="Filter projects by category">
          {(['all', ...categories] as Filter[]).map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              className={`min-h-12 border-b-2 py-3 font-mono text-xs uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent ${filter === category ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-text-secondary hover:text-brand-text'}`}
            >
              {category === 'all' ? 'All' : category}{' '}
              <span className="ml-1 text-brand-text-muted">{category === 'all' ? pool.length : pool.filter((p) => p.category === category).length}</span>
            </button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status">Showing {visible.length} of {pool.length} projects.</p>
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCell key={project.slug} project={project} number={projects.findIndex((p) => p.slug === project.slug) + 1} onWatch={() => setActiveVideo(project)} />
        ))}
      </div>
      {activeVideo?.video && activeVideo.videoPoster && (
        <VideoModal src={activeVideo.video} poster={activeVideo.videoPoster} title={activeVideo.title} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}

function ProjectCell({ project, number, onWatch }: { project: Project; number: number; onWatch: () => void }) {
  const privateCode = project.visibility === 'private';
  const primaryLink = privateCode ? undefined : project.links.demo ?? project.links.repo;
  const hasVideo = !!(project.video && project.videoPoster);

  return (
    <article className="relative flex min-w-0 flex-col border-b border-brand-border pb-8 pt-6">
      {/* Visual order puts the figure first; DOM order keeps title, Live, Code, Watch together. */}
      <h3 className="mt-6 font-display text-3xl font-bold leading-tight">
        {primaryLink ? <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">{project.title}<span className="sr-only"> (opens in a new tab)</span></a> : project.title}
      </h3>
      {project.award && <p className="label mt-3 text-brand-accent">{project.award}</p>}
      <p className="mt-4 text-sm leading-relaxed text-brand-text-secondary">{project.summary}</p>
      <p className="mb-5 mt-4 font-mono text-xs leading-relaxed text-brand-text-muted">{project.tags.join(' · ')}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1">
        {privateCode ? <span className="label inline-flex items-center gap-2 text-brand-text-muted"><Lock size={12} aria-hidden="true" />Private code</span> : <>
          {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>Live <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">: {project.title} (opens in a new tab)</span></a>}
          {project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>Code <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only">: {project.title} (opens in a new tab)</span></a>}
        </>}
        {hasVideo && <button type="button" onClick={onWatch} className={linkClass}><Play size={12} aria-hidden="true" />Watch <span className="sr-only">{project.title} demo</span>{project.durationLabel && <span className="text-brand-text-muted">{project.durationLabel}</span>}</button>}
      </div>
      <div className="order-first">
        <Figure number={number} title={`${project.category} · ${project.year}`}>
          <ProjectPreview project={project} />
          {hasVideo && <button type="button" tabIndex={-1} onClick={onWatch} aria-label={`Watch ${project.title} demo`} className="absolute inset-0 cursor-pointer"><span className="label absolute bottom-3 left-3 inline-flex items-center gap-2 border border-brand-border bg-brand-bg/90 px-3 py-2 text-brand-text"><Play size={12} className="text-brand-accent" aria-hidden="true" />Watch demo</span></button>}
        </Figure>
      </div>
    </article>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const poster = project.loopPoster ?? project.videoPoster ?? project.cover;

  useEffect(() => {
    const target = root.current?.parentElement;
    if (!target || !project.loop) return;
    const media = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let active = false;
    const stop = () => { active = false; video.current?.pause(); setPlaying(false); };
    const start = () => {
      if (!media.matches || !video.current) return;
      active = true;
      if (!video.current.getAttribute('src')) video.current.src = project.loop!;
      void video.current.play().then(() => { if (active) setPlaying(true); else video.current?.pause(); }).catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    observer.observe(target);
    target.addEventListener('pointerenter', start);
    target.addEventListener('pointerleave', stop);
    media.addEventListener('change', stop);
    return () => { stop(); observer.disconnect(); target.removeEventListener('pointerenter', start); target.removeEventListener('pointerleave', stop); media.removeEventListener('change', stop); };
  }, [project.loop]);

  return (
    <div ref={root} className="absolute inset-0">
      {poster ? <Image src={poster} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw" className="object-cover" /> : <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center" style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgb(143 180 198 / 0.07) 0 1px, transparent 1px 12px)' }}><span className="label flex items-center gap-2 text-brand-text-secondary"><LiveDot />{project.videoStatus === 'in-progress' ? 'Demo in production' : project.category}</span><span className="font-display text-2xl font-bold">{project.title}</span><span className="label text-brand-text-muted">{project.videoStatus === 'in-progress' ? 'Try the live app below' : 'Explore the project below'}</span></div>}
      {project.loop && <video ref={video} muted loop playsInline preload="none" aria-hidden="true" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${playing ? 'opacity-100' : 'opacity-0'}`} />}
    </div>
  );
}
