import SheetHero from './components/drawing/SheetHero';
import NowStrip from './components/drawing/NowStrip';
import SectionHead from './components/drawing/SectionHead';
import SpecTable from './components/drawing/SpecTable';
import FeaturedWork from './components/FeaturedWork';
import projectsData from '../content/projects.json';
import skills from '../content/skills.json';
import type { Project } from '../types/project';

const projects = projectsData as Project[];
const featured = projects.filter((p) => p.featured);
const toolkit = skills.filter((s) => !('aboutOnly' in s && s.aboutOnly));

const strong = 'font-medium text-brand-text';

export default function Home() {
  return (
    <div className="px-4 md:px-10">
      <SheetHero
        sheet="00"
        sheetTitle="Home"
        ghost
        glow="78% 4%"
        title={
          <>
            Hi. I&apos;m Ethan. This is the work I&apos;m <span className="outline-word">proud</span> of.
          </>
        }
        dimension="CS · University of Michigan · Class of 2028"
        lede={
          <>
            I build tools that hold up when the input is messy: <b className={strong}>AI pipelines over real inboxes</b>,{' '}
            <b className={strong}>payments that only trust the webhook</b>, and{' '}
            <b className={strong}>an alarm clock that refuses to guess</b>.
          </>
        }
      >
        <NowStrip />
      </SheetHero>

      <section aria-labelledby="featured" className="pt-[clamp(64px,8vw,104px)]">
        <SectionHead
          letter="A"
          tag="Selected work"
          title="Featured work"
          id="featured"
          note={`${featured.length} of ${projects.length} projects. Numbered callouts point at the parts worth asking about.`}
        />
        <FeaturedWork projects={featured} total={projects.length} />
      </section>

      <section aria-labelledby="toolkit" className="pt-[clamp(64px,8vw,104px)]">
        <SectionHead letter="B" tag="Bill of materials" title="What I build with" id="toolkit" note="Pulled from shipped projects." />
        <SpecTable rows={toolkit} caption="Languages, frameworks and tools I build with" />
      </section>
    </div>
  );
}
