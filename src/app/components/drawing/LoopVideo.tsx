'use client';

import { useEffect, useRef } from 'react';

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/** Silent loops load only when visible and respect changes to reduced motion. */
export default function LoopVideo({ src, poster, className = '' }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    const update = () => {
      if (preference.matches) {
        video.pause();
        if (video.hasAttribute('src')) {
          video.removeAttribute('src');
          video.load();
        }
      } else if (visible && !document.hidden) {
        if (!video.hasAttribute('src')) video.src = src;
        void video.play().then(() => {
          if (disposed || !visible || preference.matches || document.hidden) video.pause();
        }).catch(() => { /* Keep the poster if autoplay is unavailable. */ });
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold: 0.25 });
    observer.observe(video);
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      disposed = true;
      observer.disconnect();
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
      video.pause();
    };
  }, [src]);

  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={`h-full w-full object-cover ${className}`} />;
}
