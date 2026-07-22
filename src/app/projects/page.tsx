import ProjectsGrid from '../components/ProjectsGrid';
import CoordinateLabel from '../components/CoordinateLabel';

export default function Projects() {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-32 pb-16">
        <CoordinateLabel className="block mb-4">{'[ 02 ] PROJECTS'}</CoordinateLabel>
        <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-display font-bold leading-[0.95] tracking-tight max-w-4xl mb-8">
          Projects
        </h1>
        <p className="text-lg sm:text-xl text-brand-text-secondary leading-relaxed max-w-xl mb-16">
          Here are some of the projects I&apos;ve worked on, showcasing my skills in software development and building products end to end.
        </p>

        <ProjectsGrid />
      </div>
    </div>
  );
}
