import ProjectsGrid from '../components/ProjectsGrid';
import SheetHero from '../components/drawing/SheetHero';
import SectionHead from '../components/drawing/SectionHead';
import projects from '../../content/projects.json';

export const metadata = {
  title: 'Projects · Sheet 02 · Ethan Saba',
  description: 'Software, data, audio, and hardware projects by Ethan Saba, with demos and source code.',
};

export default function Projects() {
  return (
    <div className="px-4 md:px-10">
      <SheetHero
        sheet="02"
        sheetTitle="Projects"
        title="Projects"
        dimension={`${Math.min(...projects.map((p) => p.year))} · ${projects.length} projects`}
        lede="Tools for a job search, a dinner table, a song, and the things in between. Explore the live apps, browse the code, or watch a demo."
        glow="15% 10%"
      />
      <section aria-labelledby="project-index" className="pb-16 pt-12">
        <SectionHead letter="A" tag="Project index" title="The full set" id="project-index" note="Filter by field. Open a project to try it yourself." />
        <ProjectsGrid showFilter />
      </section>
    </div>
  );
}
