interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span 
      className={`inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 text-sm px-3 py-1 font-medium text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg ${className}`}
      tabIndex={0}
    >
      {children}
    </span>
  );
}
