// The site is a drawing set: every route is a numbered sheet.
export interface Sheet {
  number: string;
  title: string;
  href: string;
}

export const SHEETS: Sheet[] = [
  { number: '00', title: 'Home', href: '/' },
  { number: '01', title: 'About', href: '/about' },
  { number: '02', title: 'Projects', href: '/projects' },
  { number: '03', title: 'Creative', href: '/creative' },
  { number: '04', title: 'Contact', href: '/contact' },
];

export const LAST_SHEET = SHEETS[SHEETS.length - 1].number;

export const NOT_FOUND_SHEET: Sheet = { number: '××', title: 'Sheet not found', href: '' };

export function sheetFor(pathname: string | null): Sheet {
  if (!pathname) return NOT_FOUND_SHEET;
  return SHEETS.find((s) => s.href === pathname) ?? NOT_FOUND_SHEET;
}

// Revision shown in the title block. Bump when the design changes.
export const REVISION = '2026.11';
