'use client';

import { useRef } from 'react';
import type { Callout } from '../../../types/project';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion-utils';

interface FigureProps {
  number: number;
  title: string;
  callouts?: Callout[];
  children: React.ReactNode;
  className?: string;
  aspect?: 'video' | 'portrait' | 'square';
}

/**
 * A framed figure in the drawing: "Fig. N · Title" above, registration marks at
 * the bottom corners, and optional numbered callouts whose leader lines draw in.
 */
export default function Figure({ number, title, callouts = [], children, className = '', aspect = 'video' }: FigureProps) {
  const rootRef = useRef<HTMLElement>(null);
  const placed = callouts
    .map((c, i) => ({ ...c, n: i + 1 }))
    .filter((c) => c.x !== undefined && c.y !== undefined && c.bx !== undefined && c.by !== undefined);

  useGSAP(
    () => {
      if (prefersReducedMotion() || placed.length === 0) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: rootRef.current, start: 'top 75%' } });
      tl.from('.callout-leader', { drawSVG: '0%', duration: 0.7, stagger: 0.15, ease: 'power2.inOut' })
        .from('.callout-balloon', { scale: 0, duration: 0.3, stagger: 0.15, ease: 'back.out(2)' }, '-=0.4');
    },
    { scope: rootRef },
  );

  return (
    <figure ref={rootRef} className={`relative m-0 pt-7 ${className}`}>
      <figcaption className="label absolute inset-x-0 top-0 flex justify-between gap-4">
        <span className="text-brand-annot">
          Fig. {number} · {title}
        </span>
        <span className="text-brand-text-muted">Scale 1:1</span>
      </figcaption>
      <div className={`reg-marks relative max-w-full border border-brand-border bg-brand-surface ${aspect === 'portrait' ? 'aspect-[4/5]' : aspect === 'square' ? 'aspect-square' : 'aspect-video'}`}>
        <div className="absolute inset-0 overflow-hidden">{children}</div>
        {placed.length > 0 && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
              {placed.map((c) => (
                <line
                  key={c.n}
                  className="callout-leader"
                  x1={c.x}
                  y1={c.y}
                  x2={c.bx}
                  y2={c.by}
                  stroke="#8fb4c6"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            {placed.map((c) => (
              <span key={`dot-${c.n}`}>
                <span
                  className="absolute h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-annot"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                />
                <span
                  className="callout-balloon label absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand-annot bg-brand-bg text-[11px] text-brand-annot"
                  style={{ left: `${c.bx}%`, top: `${c.by}%` }}
                >
                  {c.n}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
