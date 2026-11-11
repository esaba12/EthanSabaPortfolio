'use client';

import { useRef } from 'react';
import DimensionLine from './DimensionLine';
import { gsap, useGSAP, SplitText, prefersReducedMotion } from '../../lib/motion-utils';

interface SheetHeroProps {
  sheet: string;
  sheetTitle: string;
  /** H1 content. Wrap at most one word in <span className="outline-word">. */
  title: React.ReactNode;
  dimension: string;
  lede?: React.ReactNode;
  /** Draws the sheet number as a large outlined numeral behind the headline. */
  ghost?: boolean;
  /** Position of the warm glow, so sheets don't look stamped. */
  glow?: string;
  children?: React.ReactNode;
}

export default function SheetHero({
  sheet,
  sheetTitle,
  title,
  dimension,
  lede,
  ghost = false,
  glow = '80% 0%',
  children,
}: SheetHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // The headline wipes up line by line on load. Text is in the server HTML, so
  // it is readable before this runs and without JS.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !headlineRef.current) return;
      const split = new SplitText(headlineRef.current, { type: 'lines', mask: 'lines' });
      gsap.from(split.lines, { yPercent: 100, duration: 1.1, stagger: 0.08, ease: 'power3.out' });
      return () => split.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative pb-10 pt-[clamp(120px,14vw,176px)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -right-4 top-0 h-[640px] md:-left-10 md:-right-10"
        style={{ background: `radial-gradient(900px 520px at ${glow}, rgba(255, 140, 60, 0.09), transparent 70%)` }}
      />
      {ghost && (
        <svg
          aria-hidden="true"
          className="ghost-numeral pointer-events-none absolute right-0 top-[clamp(330px,30vw,400px)] hidden w-[min(36vw,480px)] lg:block"
          viewBox="0 0 720 460"
        >
          <text x="0" y="420" className="font-display" style={{ fontSize: 520, fontWeight: 700 }}>
            {sheet}
          </text>
        </svg>
      )}

      <div className="relative">
        <span className="label text-brand-annot">
          Sheet {sheet} · {sheetTitle}
        </span>
        <h1
          ref={headlineRef}
          className="mt-5 max-w-[11.5ch] text-balance font-display text-[44px] font-bold leading-[0.93] tracking-[-0.02em] sm:text-[72px] lg:text-[104px] xl:text-[118px]"
        >
          {title}
        </h1>
        <DimensionLine label={dimension} className="mt-9 max-w-[760px]" />
        {lede && (
          <p className="mt-8 max-w-[54ch] text-[17px] leading-relaxed text-brand-text-secondary sm:text-[20px]">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
