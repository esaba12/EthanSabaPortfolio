'use client';

import { useState } from 'react';
import Link from 'next/link';
import Figure from './drawing/Figure';
import LoopVideo from './drawing/LoopVideo';
import BigNumber from './drawing/BigNumber';
import Legend from './drawing/Legend';
import LiveDot from './drawing/LiveDot';
import VideoModal from './VideoModal';
import type { Project } from '../../types/project';

const linkClass =
  'label inline-flex items-center gap-1 rounded-sm text-brand-accent hover:underline hover:underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function FeaturedWork({ projects, total }: { projects: Project[]; total: number }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-[clamp(64px,8vw,104px)]">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={p.slug}
              aria-labelledby={`row-${p.slug}`}
              className="grid items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]"
            >
              <div className={flip ? 'lg:order-2' : ''}>
                <Figure number={i + 1} title={p.title} callouts={p.callouts}>
                  {p.videoStatus === 'in-progress' ? (
                    <WorkInProgress title={p.title} />
                  ) : (
                    <>
                      {p.loop && p.loopPoster && <LoopVideo src={p.loop} poster={p.loopPoster} />}
                      {p.video && (
                        <button
                          type="button"
                          onClick={() => setActive(p)}
                          className="label absolute bottom-3.5 left-3.5 z-10 inline-flex items-center gap-2 border border-brand-border bg-brand-bg/90 px-3 py-[7px] text-brand-text transition-colors hover:border-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                          <span aria-hidden="true" className="h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-brand-accent" />
                          Watch demo{p.durationLabel ? ` · ${p.durationLabel}` : ''}
                          <span className="sr-only"> of {p.title}, with sound</span>
                        </button>
                      )}
                    </>
                  )}
                </Figure>
              </div>

              <div className="grid min-w-0 gap-5">
                <p className="label m-0 flex flex-wrap gap-x-4 gap-y-1 text-brand-annot">
                  <span>
                    {p.category} · {p.year}
                  </span>
                  {p.award && <span className="text-brand-accent">{p.award}</span>}
                </p>
                <h3 id={`row-${p.slug}`} className="m-0 font-display text-[36px] font-bold leading-[0.95] tracking-[-0.01em] sm:text-[48px] lg:text-[60px]">
                  {p.title}
                </h3>
                <p className="m-0 max-w-[52ch] text-brand-text-secondary">{p.pitch ?? p.summary}</p>
                {p.metric && <BigNumber value={p.metric.value} label={p.metric.label} />}
                {p.callouts && p.callouts.length > 0 && <Legend items={p.callouts} />}
                <div className="flex flex-wrap gap-6">
                  {p.visibility === 'private' ? (
                    <span className="label text-brand-text-muted">Private · ask me about it</span>
                  ) : (
                    <>
                      {p.links.demo && (
                        <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          Live ↗<span className="sr-only">: {p.title} (opens in new tab)</span>
                        </a>
                      )}
                      {p.links.repo && (
                        <a href={p.links.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          Code ↗<span className="sr-only">: {p.title} on GitHub (opens in new tab)</span>
                        </a>
                      )}
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-16">
        <Link href="/projects" className={`${linkClass} text-[13px]`}>
          See all {total} projects →
        </Link>
      </p>

      {active?.video && active.videoPoster && (
        <VideoModal src={active.video} poster={active.videoPoster} title={active.title} onClose={() => setActive(null)} />
      )}
    </>
  );
}

function WorkInProgress({ title }: { title: string }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center text-center"
      style={{ backgroundImage: 'repeating-linear-gradient(135deg, rgba(143,180,198,0.06) 0 1px, transparent 1px 14px)' }}
    >
      <div className="grid justify-items-center gap-2.5 border border-dashed border-brand-border bg-brand-surface/70 px-8 py-6">
        <span className="label inline-flex items-center gap-2 text-brand-accent">
          <LiveDot />
          Work in progress
        </span>
        <span className="font-display text-[30px] font-bold leading-none">{title}</span>
        <span className="label text-brand-text-muted">Demo video in production</span>
      </div>
    </div>
  );
}
