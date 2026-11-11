interface SectionHeadProps {
  /** Section letter on this sheet: A, B, C. Encodes real order. */
  letter: string;
  tag: string;
  title: string;
  id: string;
  note?: string;
}

export default function SectionHead({ letter, tag, title, id, note }: SectionHeadProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <div>
        <span className="label inline-flex items-center gap-3 text-brand-annot">
          <span
            aria-hidden="true"
            className="grid h-[26px] w-[26px] place-items-center rounded-full border border-brand-annot text-[11px]"
          >
            {letter}
          </span>
          <span>
            <span className="sr-only">Section {letter}: </span>
            {tag}
          </span>
        </span>
        <h2 id={id} className="mt-3 text-balance font-display text-[32px] font-bold leading-none tracking-[-0.01em] sm:text-[44px] lg:text-[56px]">
          {title}
        </h2>
      </div>
      {note && <p className="label max-w-[42ch] text-brand-text-muted">{note}</p>}
    </div>
  );
}
