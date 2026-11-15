'use client';

import { useEffect, useRef, useState } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '../lib/motion-utils';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLenis(() => {
    ScrollTrigger.update();
  });

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, smoothWheel: !reducedMotion }}>
      {children}
    </ReactLenis>
  );
}
