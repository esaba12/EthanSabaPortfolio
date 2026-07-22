interface HairlineRuleProps {
  className?: string;
}

export default function HairlineRule({ className = '' }: HairlineRuleProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`h-px w-full bg-brand-border ${className}`}
    />
  );
}
