import LiveDot from './LiveDot';
import now from '../../../content/now.json';
import creative from '../../../content/creative.json';

/** Building / Listening / Term. Listening reads the first track on the Creative sheet. */
export default function NowStrip() {
  const track = creative.music.tracks[0];
  const cells = [
    { key: 'Building', live: true, label: now.building.label, detail: now.building.detail, href: now.building.href },
    { key: 'Listening', live: false, label: track.title.split(' - ')[0], detail: track.artist, href: track.url },
    { key: 'Term', live: false, label: now.term.label, detail: now.term.detail, href: undefined },
  ];

  return (
    <dl className="mt-12 grid grid-cols-1 border-y border-brand-line md:grid-cols-3">
      {cells.map((c, i) => (
        <div
          key={c.key}
          className={`grid min-w-0 gap-1 py-4 md:pr-5 ${i > 0 ? 'border-t border-brand-line md:border-l md:border-t-0 md:pl-5' : ''}`}
        >
          <dt className="label flex items-center gap-2 text-brand-annot">
            {c.live && <LiveDot />}
            {c.key}
          </dt>
          <dd className="m-0 text-[15px]">
            {c.href ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent">
                {c.label}
              </a>
            ) : (
              c.label
            )}
            <span className="text-[13px] text-brand-text-muted"> · {c.detail}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
