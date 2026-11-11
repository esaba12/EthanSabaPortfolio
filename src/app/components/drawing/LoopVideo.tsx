'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/motion-utils';

interface LoopVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Silent product loop. Downloads nothing until it is near the viewport, plays
 * only while visible, and stays on its poster frame under reduced motion.
 */
export default function LoopVideo({ src, poster, className = '' }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (prefersReducedMotion()) {
      setStill(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            /* Autoplay refused (e.g. low-power mode): the poster stays up. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
