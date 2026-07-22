'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { gsap } from '../lib/motion-utils';

export interface WaveUnderlineHandle {
  draw: (options?: { duration?: number; ease?: string }) => void;
}

const WaveUnderline = forwardRef<WaveUnderlineHandle>(function WaveUnderline(_props, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Transform scroll progress to horizontal wiggle (disabled if reduced motion)
  const xOffset = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 20]
  );

  // Set the initial DrawSVG state once we know the reduced-motion preference:
  // fully drawn immediately under reduced motion, hidden and awaiting the
  // imperative draw() call otherwise.
  useEffect(() => {
    if (!pathRef.current) return;
    gsap.set(pathRef.current, { drawSVG: prefersReducedMotion ? '100%' : '0%' });
  }, [prefersReducedMotion]);

  useImperativeHandle(ref, () => ({
    draw: (options) => {
      if (!pathRef.current) return;
      if (prefersReducedMotion) {
        gsap.set(pathRef.current, { drawSVG: '100%' });
        return;
      }
      gsap.to(pathRef.current, {
        drawSVG: '100%',
        duration: options?.duration ?? 1.2,
        ease: options?.ease ?? 'power3.out',
      });
    },
  }), [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative w-full h-8">
      <motion.svg
        width="100%"
        height="8"
        viewBox="0 0 100 8"
        className="absolute bottom-0 left-0"
        style={{ x: xOffset }}
      >
        <motion.path
          ref={pathRef}
          d="M0,4 Q25,0 50,4 T100,4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="text-brand-accent"
        />
      </motion.svg>
    </div>
  );
});

export default WaveUnderline;
