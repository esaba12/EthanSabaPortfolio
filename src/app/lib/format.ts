const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Formats a "YYYY-MM-DD" string as "24 JUN 2023" without constructing a Date.
// new Date("YYYY-MM-DD") parses as UTC midnight, which renders as the previous day
// in US time zones, and toLocaleDateString() differs between server and client,
// which causes a hydration mismatch.
export function formatShotDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const monthName = MONTHS[Number(month) - 1];
  if (!year || !monthName || !day) return iso;
  return `${Number(day)} ${monthName} ${year}`;
}
