interface CoordinateLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function CoordinateLabel({
  children,
  className = '',
}: CoordinateLabelProps) {
  return (
    <span
      className={`font-mono text-[13px] leading-[1.4] uppercase tracking-[0.04em] text-brand-accent ${className}`}
    >
      {children}
    </span>
  );
}
