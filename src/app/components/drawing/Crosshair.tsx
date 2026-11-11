'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion-utils';

const GRID = 32;
const pad = (n: number) => String(Math.max(0, Math.floor(n))).padStart(3, '0');

/**
 * Drafting crosshair that follows a mouse pointer and reads out the position in
 * grid cells. Mouse only, and never under reduced motion.
 */
export default function Crosshair() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);
  const readRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(fine && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setVisible(true);
      if (hRef.current) hRef.current.style.transform = `translateY(${e.clientY}px)`;
      if (vRef.current) vRef.current.style.transform = `translateX(${e.clientX}px)`;
      if (readRef.current) {
        readRef.current.style.transform = `translate(${e.clientX + 12}px, ${e.clientY + 12}px)`;
        readRef.current.textContent = `X ${pad(e.pageX / GRID)} · Y ${pad(e.pageY / GRID)}`;
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div ref={hRef} className="absolute left-0 right-0 top-0 h-px bg-brand-annot-dim" />
      <div ref={vRef} className="absolute bottom-0 left-0 top-0 w-px bg-brand-annot-dim" />
      <div ref={readRef} className="label absolute left-0 top-0 bg-brand-bg/85 px-1.5 py-0.5 text-brand-annot" />
    </div>
  );
}
