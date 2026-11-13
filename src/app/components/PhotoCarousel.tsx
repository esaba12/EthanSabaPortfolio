'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { PhotoItem } from '../../types/creative';
import { formatShotDate } from '../lib/format';

export default function PhotoCarousel({ photos }: { photos: PhotoItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!photos.length) return <p className="text-brand-text-secondary">Photographs coming soon.</p>;
  const index = currentIndex % photos.length;
  const photo = photos[index];
  const frame = (n: number) => `${String(n + 1).padStart(2, '0')}A`;
  const select = (n: number) => setCurrentIndex((n + photos.length) % photos.length);
  const annotations = [
    { label: 'Cam', value: photo.camera },
    { label: 'Stock', value: photo.stock },
    { label: 'Loc', value: photo.location },
    { label: 'Date', value: photo.date ? formatShotDate(photo.date) : undefined },
  ].filter((item) => item.value);
  const controls = 'inline-flex min-h-11 items-center gap-2 px-3 font-mono text-xs uppercase tracking-wider text-brand-accent hover:bg-brand-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent disabled:opacity-40';

  return (
    <div role="region" aria-label="Film photographs" aria-roledescription="carousel" onKeyDown={(event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight') { event.preventDefault(); select(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); select(index - 1); }
    }}>
      <figure className="m-0">
        <figcaption className="label mb-4 flex flex-wrap justify-between gap-2 text-brand-annot"><span>Fig. 1 · Film specimens</span><span className="text-brand-text-muted">35 mm · Frame {frame(index)}</span></figcaption>
        <div className="reg-marks relative border border-brand-border bg-brand-surface">
          <div className="relative aspect-[3/2] w-full">
            {failedSrc === photo.src ? <p role="status" className="absolute inset-0 flex items-center justify-center px-6 text-center text-brand-text-secondary">This photograph couldn&apos;t load. Choose another frame below.</p> : <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(max-width: 767px) 100vw, 90vw" quality={90} className="object-contain" onError={() => setFailedSrc(photo.src)} />}
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 px-2 pb-6 pt-5 lg:grid-cols-4">
          {annotations.map((item) => <div key={item.label} className="relative border-t border-brand-annot/40 pt-3"><span aria-hidden="true" className="absolute -top-5 left-0 h-5 w-px bg-brand-annot/40" /><dt className="label text-brand-annot">{item.label}</dt><dd className="mt-1 text-sm text-brand-text-secondary">{item.value}</dd></div>)}
        </dl>
      </figure>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-y border-brand-line py-2">
        <button type="button" className={controls} disabled={photos.length < 2} onClick={() => select(index - 1)} aria-label="Previous photo"><ArrowLeft size={16} aria-hidden="true" />Previous</button>
        <p className="label text-brand-text-muted" role="status" aria-live="polite" aria-atomic="true">Frame {frame(index)} · {index + 1} / {photos.length}<span className="sr-only">: {photo.alt}</span></p>
        <button type="button" className={controls} disabled={photos.length < 2} onClick={() => select(index + 1)} aria-label="Next photo">Next<ArrowRight size={16} aria-hidden="true" /></button>
      </div>

      <div className="border-y border-brand-border px-2 py-5" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent 0 10px, rgba(143,180,198,0.18) 10px 18px, transparent 18px 28px), repeating-linear-gradient(to right, transparent 0 10px, rgba(143,180,198,0.18) 10px 18px, transparent 18px 28px)', backgroundSize: '100% 5px', backgroundPosition: 'top 4px left, bottom 4px left', backgroundRepeat: 'no-repeat' }}>
        <div className="flex gap-3 overflow-x-auto p-1" role="group" aria-label="Choose a film frame">
          {photos.map((item, n) => <button key={item.src} type="button" aria-label={`Show frame ${frame(n)}: ${item.alt}`} aria-pressed={n === index} onClick={() => select(n)} className={`w-24 shrink-0 border p-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent sm:w-32 ${n === index ? 'border-brand-accent text-brand-accent' : 'border-brand-border text-brand-text-muted hover:border-brand-annot'}`}><span className="relative block aspect-[3/2]"><Image src={item.src} alt="" fill sizes="128px" quality={60} className="object-cover" /></span><span className="mt-2 block font-mono text-xs">{frame(n)}</span></button>)}
        </div>
      </div>
      <p className="mt-4 font-mono text-xs text-brand-text-muted">Choose a frame, or use the left and right arrow keys while the controls are focused.</p>
    </div>
  );
}
