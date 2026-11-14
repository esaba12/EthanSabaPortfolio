import Link from 'next/link';
import SheetHero from './components/drawing/SheetHero';
import SectionHead from './components/drawing/SectionHead';
import { SHEETS } from './lib/sheets';

export default function NotFound() {
  return (
    <div className="px-4 pb-20 md:px-10">
      <SheetHero sheet="××" sheetTitle="Not found" title="Sheet not found" dimension="404 · Outside the drawing set" lede="This sheet isn't in the set. Here are the ones that are:" />
      <section aria-labelledby="sheet-index" className="pt-10">
        <SectionHead letter="A" tag="Drawing index" title="Find your way" id="sheet-index" />
        <nav aria-label="Available pages">
          <ul className="border-t border-brand-border">
            {SHEETS.map((sheet) => <li key={sheet.href} className="border-b border-brand-border"><Link href={sheet.href} className="flex min-h-16 items-center justify-between gap-4 py-4 text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent"><span><span className="mr-6 font-mono text-sm text-brand-annot">{sheet.number}</span><span className="font-display text-2xl">{sheet.title}</span></span><span aria-hidden="true">↗</span></Link></li>)}
          </ul>
        </nav>
      </section>
    </div>
  );
}
