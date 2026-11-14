'use client';

import { useEffect, useRef } from 'react';

interface VideoModalProps {
  src: string;
  poster: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ src, poster, title, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    // Native modal dialogs make the rest of the document inert and contain focus,
    // including the browser's video controls. No entrance motion is necessary.
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-label={`${title} demo video`}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-4xl overflow-auto border border-brand-border bg-brand-bg p-4 text-brand-text backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-brand-line pb-3">
        <p className="label text-brand-annot">{title} · Demo</p>
        <button ref={closeRef} type="button" onClick={onClose} className="label min-h-11 shrink-0 px-3 text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent" aria-label="Close video">Close ×</button>
      </div>
      <video key={src} src={src} poster={poster} controls autoPlay className="mx-auto block max-h-[65dvh] w-full bg-black" aria-label={`${title} demo`} />
    </dialog>
  );
}
