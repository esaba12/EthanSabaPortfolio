'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

// Single site-wide GSAP plugin registration point. No other file may call
// gsap.registerPlugin — every consumer imports gsap/plugins/useGSAP from here.
gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP);

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, useGSAP };

/**
 * SSR-safe check for the user's reduced-motion preference. Returns false
 * during server rendering (no `window`) and otherwise reflects the
 * `prefers-reduced-motion: reduce` media query. Every GSAP ScrollTrigger
 * effect must check this and fall back to the final visual state.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
