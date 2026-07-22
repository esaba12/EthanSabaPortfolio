interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm bg-brand-surface border border-brand-border font-mono text-[13px] leading-[1.4] uppercase tracking-[0.04em] px-3 py-1 text-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg ${className}`}
      tabIndex={0}
    >
      {children}
    </span>
  );
}
