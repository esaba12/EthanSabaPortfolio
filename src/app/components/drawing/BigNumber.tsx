/** One number that carries the point, on a ruled row. */
export default function BigNumber({ value, label }: { value: string; label: string }) {
  return (
    <p className="m-0 flex items-baseline gap-4 border-y border-brand-line py-3">
      <b className="font-display text-[36px] font-semibold leading-none tabular-nums sm:text-[44px]">{value}</b>
      <span className="text-[14px] text-brand-text-secondary">{label}</span>
    </p>
  );
}
