/** Amber pulse for things that are live or in progress. */
export default function LiveDot({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`live-dot inline-block h-[7px] w-[7px] rounded-full bg-brand-accent ${className}`} />;
}
