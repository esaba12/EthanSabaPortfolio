import ProjectsGrid from '../components/ProjectsGrid';

export default function Projects() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="container mx-auto px-8 py-40">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Projects</h1>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Here are some of the projects I&apos;ve worked on, showcasing my skills in software development, 
            data science, and real estate technology.
          </p>
          
          <ProjectsGrid />
        </div>
      </div>
    </div>
  );
}
