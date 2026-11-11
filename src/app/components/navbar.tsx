'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SHEETS, sheetFor } from '../lib/sheets';

// Set once the résumé PDF is in /public. Until then the link is not shown.
const RESUME_URL: string | null = null;

const linkBase =
  'label rounded-sm px-2.5 py-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent';

export default function Navbar() {
  const pathname = usePathname();
  const current = sheetFor(pathname);

  return (
    <Disclosure
      as="header"
      className="fixed inset-x-0 top-0 z-50 border-b border-brand-line bg-brand-bg/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 md:px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Ethan Saba, home"
            className="rounded-sm transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className="h-9 w-9" />
          </Link>
          <span className="label hidden text-brand-annot sm:inline">Sheet {current.number}</span>
        </div>

        <nav aria-label="Sheets" className="hidden items-center gap-1 md:flex">
          {SHEETS.map((s) => {
            const active = s.href === pathname;
            return (
              <Link
                key={s.href}
                href={s.href}
                aria-current={active ? 'page' : undefined}
                className={`${linkBase} border-b-2 ${
                  active ? 'border-brand-accent text-brand-text' : 'border-transparent text-brand-text-secondary hover:text-brand-accent'
                }`}
              >
                <span className="text-brand-text-muted">{s.number}</span> {s.title}
              </Link>
            );
          })}
          {RESUME_URL && (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkBase} ml-3 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-bg`}
            >
              Résumé ↗
            </a>
          )}
        </nav>

        <DisclosureButton className="group inline-flex items-center justify-center rounded-sm p-2 text-brand-text hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent md:hidden">
          <span className="sr-only">Open menu</span>
          <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
          <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
        </DisclosureButton>
      </div>

      <DisclosurePanel className="border-t border-brand-line md:hidden">
        <ul className="m-0 list-none px-4 py-2">
          {SHEETS.map((s) => {
            const active = s.href === pathname;
            return (
              <li key={s.href} className="border-b border-brand-line last:border-b-0">
                <DisclosureButton
                  as={Link}
                  href={s.href}
                  aria-current={active ? 'page' : undefined}
                  className={`label flex items-center gap-4 py-3.5 ${active ? 'text-brand-accent' : 'text-brand-text-secondary'}`}
                >
                  <span className="text-brand-text-muted">{s.number}</span>
                  {s.title}
                </DisclosureButton>
              </li>
            );
          })}
          {RESUME_URL && (
            <li>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="label flex py-3.5 text-brand-accent">
                Résumé ↗
              </a>
            </li>
          )}
        </ul>
      </DisclosurePanel>
    </Disclosure>
  );
}
