'use client';

import { useState } from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

export default function ProjectsCarousel() {
  const [currentProject, setCurrentProject] = useState(0);

  const projects: Project[] = [
    {
      title: "Project 1",
      description: "A web application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "/project1.jpg"
    },
    {
      title: "Project 2", 
      description: "Mobile app for real estate management",
      technologies: ["React Native", "Firebase", "TypeScript"],
      image: "/project2.jpg"
    },
    {
      title: "Project 3",
      description: "Machine learning model for property valuation",
      technologies: ["Python", "TensorFlow", "Pandas"],
      image: "/project3.jpg"
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="container">
      <h2 className="text-2xl text-left mb-4">Projects</h2>
      <div className="container border-gray-700 border-2 rounded-lg mx-auto px-6 py-6 relative">
        {/* Project content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{projects[currentProject].title}</h3>
          <p className="text-gray-300 mb-4">{projects[currentProject].description}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {projects[currentProject].technologies.map((tech, index) => (
              <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevProject}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          onClick={nextProject}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
          aria-label="Next project"
        >
          →
        </button>

        {/* Project indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentProject ? 'bg-white' : 'bg-gray-600'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 