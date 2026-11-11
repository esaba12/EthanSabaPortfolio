import type { Callout } from '../../../types/project';

/** Numbered key for a figure's callouts. Unplaced callouts get a "+" marker. */
export default function Legend({ items }: { items: Callout[] }) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      {items.map((item, i) => {
        const placed = item.x !== undefined && item.bx !== undefined;
        return (
          <li key={item.text} className="grid grid-cols-[24px_1fr] items-start gap-3 text-[14px] text-brand-text-secondary">
            <span
              aria-hidden="true"
              className={`label mt-px grid h-5 w-5 place-items-center text-[10px] text-brand-annot ${placed ? 'rounded-full border border-brand-annot' : ''}`}
            >
              {placed ? i + 1 : '+'}
            </span>
            <span>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
