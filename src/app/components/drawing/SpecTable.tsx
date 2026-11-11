interface SpecRow {
  category: string;
  parts: string[];
}

/** Skills as a drafting bill of materials: Item / Category / Parts / Qty. */
export default function SpecTable({ rows, caption }: { rows: SpecRow[]; caption: string }) {
  return (
    <div className="overflow-x-auto border border-brand-border bg-brand-surface/60">
      <table className="w-full border-collapse tabular-nums sm:min-w-[620px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-brand-annot/[0.04]">
            {['Item', 'Category', 'Parts', 'Qty'].map((h) => (
              <th
                key={h}
                scope="col"
                className={`label border-b border-brand-line px-4 py-3 font-normal text-brand-annot sm:px-[18px] ${h === 'Qty' ? 'text-right' : 'text-left'} ${h === 'Item' || h === 'Qty' ? 'hidden sm:table-cell' : ''}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.category} className="border-b border-brand-line last:border-b-0">
              <td className="hidden w-16 px-[18px] py-[13px] align-top font-mono text-[13px] text-brand-text-muted sm:table-cell">
                {String(i + 1).padStart(2, '0')}
              </td>
              <th scope="row" className="w-[38%] px-4 py-[13px] text-left align-top font-display text-[16px] font-semibold sm:w-[210px] sm:px-[18px] sm:text-[18px]">
                {row.category}
              </th>
              <td className="px-4 py-[13px] align-top text-[15px] text-brand-text-secondary sm:px-[18px] sm:text-base">{row.parts.join(' · ')}</td>
              <td className="hidden w-[70px] px-[18px] py-[13px] text-right align-top font-mono text-[13px] text-brand-text-muted sm:table-cell">
                {String(row.parts.length).padStart(2, '0')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
