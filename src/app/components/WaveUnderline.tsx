'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function WaveUnderline() {
  const containerRef = useRef<HTMLDivElement>(null);
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
  const pathLength = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const xOffset = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReducedMotion ? [0, 0] : [0, 20]
  );

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
          d="M0,4 Q25,0 50,4 T100,4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            pathLength,
            strokeDasharray: 1,
            strokeDashoffset: 0,
          }}
          className="text-brand-accent"
        />
      </motion.svg>
    </div>
  );
}
