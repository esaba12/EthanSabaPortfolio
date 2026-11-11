'use client';

import { usePathname } from 'next/navigation';
import { LAST_SHEET, REVISION, sheetFor } from '../lib/sheets';

const LINKS = [
  { name: 'GitHub', href: 'https://github.com/esaba12' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/ethansaba' },
  { name: 'Email', href: 'mailto:essaba@umich.edu' },
];

/** The drawing's title block, used as the site footer on every sheet. */
export default function Footer() {
  const sheet = sheetFor(usePathname());

  const cells = [
    { k: 'Project', v: 'Ethan Saba · Portfolio', wide: true },
    { k: 'Sheet', v: `${sheet.number} / ${LAST_SHEET} · ${sheet.title}` },
    { k: 'Drawn', v: 'E. Saba' },
    { k: 'Rev', v: REVISION },
  ];

  return (
    <footer className="mt-[clamp(80px,9vw,120px)]">
      <div className="grid grid-cols-2 border-t border-brand-border lg:grid-cols-[2fr_1.3fr_1fr_1fr_1.4fr]">
        {cells.map((c) => (
          <div
            key={c.k}
            className={`grid min-w-0 gap-1 border-b border-r border-brand-line px-[18px] py-3.5 lg:border-b-0 ${c.wide ? 'col-span-2 lg:col-span-1' : ''}`}
          >
            <span className="label text-[10px] text-brand-annot">{c.k}</span>
            <span className="break-words font-display text-[17px] font-semibold">{c.v}</span>
          </div>
        ))}
        <div className="grid min-w-0 gap-1 border-b border-brand-line px-[18px] py-3.5 lg:border-b-0">
          <span className="label text-[10px] text-brand-annot">Links</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1 font-display text-[17px] font-semibold">
            {LINKS.map((l) => (
              <a
                key={l.name}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="rounded-sm text-brand-accent hover:underline hover:underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                {l.name}
                {l.href.startsWith('http') ? ' ↗' : ''}
              </a>
            ))}
          </span>
        </div>
      </div>
      <p className="label border-t border-brand-line px-[18px] py-4 text-brand-text-muted">
        © {new Date().getFullYear()} Ethan Saba. Built with Next.js and Tailwind.
      </p>
    </footer>
  );
}
