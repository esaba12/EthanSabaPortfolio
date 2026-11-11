'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '../../lib/motion-utils';

interface DimensionLineProps {
  label: string;
  className?: string;
}

/**
 * A drafting dimension: end ticks, arrowheads and a centered label. The line
 * draws outward from the center when it scrolls into view. It renders fully
 * drawn without JS or under reduced motion.
 */
export default function DimensionLine({ label, className = '' }: DimensionLineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !lineRef.current) return;
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.1,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: rootRef.current, start: 'top 92%' },
      });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-6 w-full items-center text-brand-annot ${className}`}
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-6 w-px bg-brand-annot" />
      <span className="absolute right-0 top-0 h-6 w-px bg-brand-annot" />
      <span ref={lineRef} className="absolute inset-x-0 top-1/2 h-px origin-center bg-brand-annot" />
      <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-brand-annot" />
      <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-brand-annot" />
      <span className="label relative mx-auto max-w-[calc(100%-40px)] truncate bg-brand-bg px-2 text-[10px] tracking-[0.03em] sm:px-3 sm:text-[12px] sm:tracking-[0.08em]">
        {label}
      </span>
    </div>
  );
}
