interface PanelProps {
  children: React.ReactNode;
  className?: string;
  bracketsOnHover?: boolean;
}

export default function Panel({
  children,
  className = '',
  bracketsOnHover = false,
}: PanelProps) {
  const bracketVisibility = bracketsOnHover
    ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-200'
    : 'opacity-100';

  return (
    <div
      className={`relative border border-brand-border rounded-sm bg-brand-surface ${
        bracketsOnHover ? 'group' : ''
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-brand-accent ${bracketVisibility}`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-brand-accent ${bracketVisibility}`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-brand-accent ${bracketVisibility}`}
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-brand-accent ${bracketVisibility}`}
      />
      {children}
    </div>
  );
}
