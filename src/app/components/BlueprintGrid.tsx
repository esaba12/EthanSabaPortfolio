/**
 * Drafting paper behind every sheet: a 32px minor grid and a 160px major grid,
 * both tinted blueprint cyan. Fixed, so it stays put while the sheet scrolls.
 */
export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: [
          'linear-gradient(to right, rgba(143,180,198,0.075) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(143,180,198,0.075) 1px, transparent 1px)',
          'linear-gradient(to right, rgba(143,180,198,0.045) 1px, transparent 1px)',
          'linear-gradient(to bottom, rgba(143,180,198,0.045) 1px, transparent 1px)',
        ].join(','),
        backgroundSize: '160px 160px, 160px 160px, 32px 32px, 32px 32px',
      }}
    />
  );
}
