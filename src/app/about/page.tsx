import Image from 'next/image';
import SheetHero from '../components/drawing/SheetHero';
import SectionHead from '../components/drawing/SectionHead';
import Figure from '../components/drawing/Figure';
import DimensionLine from '../components/drawing/DimensionLine';
import SpecTable from '../components/drawing/SpecTable';
import about from '../../content/about.json';
import skills from '../../content/skills.json';

export const metadata = {
  title: 'About · Sheet 01 · Ethan Saba',
  description: 'Computer science at Michigan. Experience building developer tools, data systems, and software for everyday problems.',
};

const roles = [
  ...about.experiences.map((role) => ({ ...role, kind: 'Work' })),
  ...about.leadership.map((role) => ({ ...role, kind: 'Leadership' })),
];

function monthIndex(date: string) {
  const [year, month] = date.split('-').map(Number);
  return (year - about.timeline.startYear) * 12 + month - 1;
}

function RecordTimeline() {
  const months = (about.timeline.endYear - about.timeline.startYear + 1) * 12;
  return (
    <div className="mb-12" aria-label={`Experience timeline, ${about.timeline.startYear} to ${about.timeline.endYear}`}>
      <div className="mb-5 flex flex-wrap justify-between gap-3">
        <span className="label text-brand-annot">Work / leadership</span>
        <span className="label text-brand-text-muted">As of Nov 2026 · spans link to details</span>
      </div>
      <div className="hidden md:block">
        <div className="mb-4 flex justify-between border-b border-brand-annot pb-3 font-mono text-xs text-brand-annot"><span>Jan 2025</span><span>Jan 2026</span><span>Dec 2026</span></div>
        <div className="space-y-3 border-x border-brand-line" style={{ backgroundImage: 'linear-gradient(to right, transparent 49.9%, rgba(143,180,198,0.15) 50%, transparent 50.1%)' }}>
          {roles.map((role) => (
            <div key={role.id} className="relative h-11">
              <a href={`#${role.id}`} style={{ left: `${monthIndex(role.start) / months * 100}%`, width: `${(monthIndex(role.end ?? about.timeline.asOf) + 1 - monthIndex(role.start)) / months * 100}%` }} className={`absolute flex h-full items-center justify-center border px-2 font-mono text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent ${role.kind === 'Work' ? 'border-brand-accent text-brand-accent hover:bg-brand-accent/10' : 'border-brand-annot text-brand-annot hover:bg-brand-annot/10'}`}>
                {role.shortName}<span className="sr-only">: {role.period}. {role.kind}. Read details.</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      <ol className="ml-2 space-y-6 border-l border-brand-annot pl-6 md:hidden">
        {[...roles].sort((a, b) => a.start.localeCompare(b.start)).map((role) => (
          <li key={role.id} className="relative">
            <span aria-hidden="true" className="absolute -left-[29px] top-2 h-2 w-2 border border-brand-annot bg-brand-bg" />
            <a href={`#${role.id}`} className="inline-block py-1 text-brand-accent underline decoration-brand-border underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">{role.shortName}</a>
            <p className="font-mono text-xs leading-relaxed text-brand-text-muted">{role.period} · {role.kind}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function About() {
  return (
    <div className="px-4 pb-16 md:px-10">
      <div className="grid items-start gap-x-12 lg:grid-cols-[1.4fr_1fr]">
        <SheetHero sheet="01" sheetTitle="About" title="About" dimension={about.location} lede={about.lede} glow="35% 0%" />
        <div className="mb-12 w-full max-w-md lg:ml-auto lg:pt-44">
          <Figure number={1} title="E. Saba" aspect="portrait" callouts={[{ text: about.location, x: 76, y: 75, bx: 88, by: 90 }]}>
            <Image src="/Saba_Ethan_Photo.jpg" alt="Portrait of Ethan Saba" fill priority sizes="(max-width: 1023px) 90vw, 36vw" className="object-cover object-top" />
          </Figure>
          <p className="mt-4 flex items-center gap-3 text-sm text-brand-text-secondary"><span className="label grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand-annot text-brand-annot">1</span>{about.location}</p>
        </div>
      </div>
      <p className="mb-16 max-w-[65ch] text-lg leading-relaxed text-brand-text-secondary">{about.bio}</p>

      <section aria-labelledby="numbers" className="mb-20">
        <SectionHead letter="A" tag="In numbers" title="A few results" id="numbers" />
        <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 xl:grid-cols-4">
          {about.metrics.map((metric) => <div key={metric.value} className="flex flex-col border-y border-brand-line py-6"><dt className="mt-4 max-w-[30ch] text-sm leading-relaxed text-brand-text-secondary">{metric.label}</dt><dd className="order-first font-display text-4xl font-semibold tabular-nums">{metric.value}</dd></div>)}
        </dl>
      </section>

      <section aria-labelledby="record" className="mb-20">
        <SectionHead letter="B" tag="Record" title="Experience and leadership" id="record" />
        <RecordTimeline />
        <div className="border-t border-brand-border">
          {roles.map((role) => (
            <article key={role.id} id={role.id} className="grid scroll-mt-28 gap-4 border-b border-brand-border py-8 md:grid-cols-[210px_1fr] lg:gap-12">
              <div><p className="label text-brand-annot">{role.kind}</p><p className="mt-3 font-mono text-xs leading-relaxed text-brand-text-muted">{role.period}</p></div>
              <div><h3 className="font-display text-2xl font-semibold">{role.company}</h3><p className="mt-2 text-brand-text-secondary">{role.title}</p><p className="mt-4 max-w-[65ch] text-base leading-relaxed text-brand-text-secondary">{role.description}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="education" className="mb-20">
        <SectionHead letter="C" tag="Education" title="Michigan" id="education" />
        {about.education.map((entry) => <div key={entry.school} className="border-t border-brand-border py-6"><h3 className="font-display text-2xl font-semibold">{entry.degree}</h3><p className="mt-2 text-brand-text-secondary">{entry.school}</p><p className="mt-3 text-sm text-brand-text-muted">{entry.details}</p><p className="sr-only">{entry.period}</p><DimensionLine label={entry.period} className="mt-8 max-w-xl" /></div>)}
      </section>

      <section aria-labelledby="coursework" className="mb-20">
        <SectionHead letter="D" tag="Coursework" title="What I've studied" id="coursework" />
        <div className="border border-brand-border">
          <table className="w-full border-collapse text-left"><caption className="sr-only">University coursework</caption><thead><tr className="border-b border-brand-line"><th scope="col" className="label px-4 py-3 font-normal text-brand-annot">Course</th><th scope="col" className="label px-4 py-3 font-normal text-brand-annot">Name</th></tr></thead><tbody>
            {about.coursework.map((course) => <tr key={course.code} className="border-b border-brand-line last:border-0"><th scope="row" className="whitespace-nowrap px-4 py-4 align-top font-mono text-xs font-normal text-brand-annot">{course.code}</th><td className="px-4 py-4 text-sm text-brand-text-secondary">{course.name}{course.note && <span className="mt-1 block font-mono text-xs text-brand-text-muted">{course.note}</span>}</td></tr>)}
          </tbody></table>
        </div>
      </section>

      <section aria-labelledby="toolkit">
        <SectionHead letter="E" tag="Bill of materials" title="What I build with" id="toolkit" note="Pulled from shipped projects, plus design and spoken languages." />
        <SpecTable rows={skills} caption="Languages, frameworks, tools, design and spoken languages" />
      </section>
    </div>
  );
}
