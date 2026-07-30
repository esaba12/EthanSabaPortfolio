'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface VideoModalProps {
  src: string;
  poster: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ src, poster, title, onClose }: VideoModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} demo video`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            aria-hidden="true"
            className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-brand-accent"
          />
          <span
            aria-hidden="true"
            className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-brand-accent"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-brand-accent"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-brand-accent"
          />

          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-10 right-0 text-brand-text-secondary hover:text-brand-accent transition-colors font-mono text-[13px] uppercase tracking-[0.04em] focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            Close ✕
          </button>

          <div className="border border-brand-border rounded-sm bg-black overflow-hidden shadow-card-hover flex items-center justify-center max-h-[80vh]">
            <video
              key={src}
              src={src}
              poster={poster}
              controls
              autoPlay
              className="w-auto h-auto max-w-full max-h-[80vh] block mx-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
