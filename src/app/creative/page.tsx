import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PhotoCarousel from '../components/PhotoCarousel';
import SheetHero from '../components/drawing/SheetHero';
import SectionHead from '../components/drawing/SectionHead';
import Figure from '../components/drawing/Figure';
import creativeData from '../../content/creative.json';

export const metadata = {
  title: 'Creative · Sheet 03 · Ethan Saba',
  description: 'Film photographs from a Canon AE-1 and the songs Ethan Saba has on repeat.',
};

export default function Creative() {
  const [featured, ...tracks] = creativeData.music.tracks;
  return (
    <div className="px-4 pb-16 md:px-10">
      <SheetHero sheet="03" sheetTitle="Creative" title="Creative" dimension="35 mm · Canon AE-1" lede="Film photos from my Canon AE-1, and the songs I've had on repeat." glow="65% 15%" />
      <section aria-labelledby="photographs" className="mb-20 pt-12">
        <SectionHead letter="A" tag="Specimens" title={creativeData.photography.title} id="photographs" note={creativeData.photography.description} />
        <PhotoCarousel photos={creativeData.photography.photos} />
      </section>

      <section aria-labelledby="music">
        <SectionHead letter="B" tag="Listening notes" title={creativeData.music.title} id="music" note={creativeData.music.description} />
        {featured && <div className="mb-10 grid items-center gap-8 border-y border-brand-border py-8 md:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
          <div className="w-full max-w-[280px]">
            <Figure number={2} title="On repeat" aspect="square"><Image src={featured.cover} alt={`Cover art for ${featured.title}`} fill sizes="280px" className="object-cover" /></Figure>
          </div>
          <div>
            <p className="label text-brand-annot">01 · {featured.genre} · {featured.duration}</p>
            <h3 className="mt-4 max-w-[22ch] font-display text-3xl font-bold leading-tight sm:text-5xl">{featured.title}</h3>
            <p className="mt-4 text-lg text-brand-text-secondary">{featured.artist}</p>
            <a href={featured.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-sm text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent">Spotify <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">: {featured.title} (opens in a new tab)</span></a>
          </div>
        </div>}
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">More tracks on repeat. Track links open Spotify in a new tab.</caption>
          <thead><tr className="border-b border-brand-border">
            <th scope="col" className="label w-10 py-3 font-normal text-brand-annot sm:w-16">No.</th>
            <th scope="col" className="label py-3 font-normal text-brand-annot">Track<span className="md:hidden"> / Artist</span></th>
            <th scope="col" className="label hidden w-[24%] py-3 font-normal text-brand-annot md:table-cell">Artist</th>
            <th scope="col" className="label hidden w-[22%] py-3 font-normal text-brand-annot lg:table-cell">Genre</th>
            <th scope="col" className="label w-12 py-3 text-right font-normal text-brand-annot sm:w-16">Time</th>
          </tr></thead>
          <tbody>{tracks.map((track, index) => <tr key={track.url} className="border-b border-brand-line">
            <td className="py-4 align-top font-mono text-xs text-brand-text-muted">{String(index + 2).padStart(2, '0')}</td>
            <th scope="row" className="py-3 pr-4 text-left align-top font-normal"><a href={track.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent sm:text-base"><span>{track.title}</span><ArrowUpRight size={14} className="shrink-0" aria-hidden="true" /><span className="sr-only"> on Spotify (opens in a new tab)</span></a><span className="block text-sm text-brand-text-secondary md:hidden">{track.artist}</span><span className="mt-1 block text-xs text-brand-text-muted lg:hidden">{track.genre}</span></th>
            <td className="hidden py-5 pr-4 align-top text-sm text-brand-text-secondary md:table-cell">{track.artist}</td>
            <td className="hidden py-5 pr-4 align-top font-mono text-xs text-brand-text-muted lg:table-cell">{track.genre}</td>
            <td className="py-5 text-right align-top font-mono text-xs text-brand-text-muted">{track.duration}</td>
          </tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
