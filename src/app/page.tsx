'use client';

import ProjectsGrid from "./components/ProjectsGrid";
import WaveUnderline from "./components/WaveUnderline";
import Badge from "./components/Badge";
import Panel from "./components/Panel";
import CoordinateLabel from "./components/CoordinateLabel";

export default function Home() {
  return (
    <div>
      <div className="relative min-h-screen bg-brand-bg text-brand-text">
        {/* Main content */}
        <div className="container flex flex-col justify-center items-center">
          <div className="bg-brand-bg min-h-screen">
            <div className="container mx-auto px-8 pt-32 pb-16">
              {/* introduction */}
              <div className="text-center mb-30">
                <CoordinateLabel className="block mb-4">{'[ 00 ] INTRO'}</CoordinateLabel>
                <h1 className="text-[40px] lg:text-[64px] font-display font-bold leading-[1.05] tracking-tight mb-6 text-brand-text">
                  Hi. I&apos;m Ethan, and this is the work that I&apos;m proud of.
                </h1>
                <WaveUnderline />
                <h3 className="text-xl text-gray-300 leading-relaxed mt-6 max-w-4xl mx-auto">
                  I&apos;m in my Sophomore year at the University of Michigan learning about Computer Science (Major), Real Estate (minor), and everything in between.
                </h3>
              </div>

              {/* skills */}
              <div className="container">
                <CoordinateLabel className="block mt-8 mb-2">{'[ 01 ] SKILLS'}</CoordinateLabel>
                <h2 className="text-[22px] sm:text-[28px] font-display font-bold leading-[1.2] text-left mb-4">Skills</h2>
                <Panel className="mx-auto px-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
                    {/* left side */}
                    <div className="container">
                      <h3 className="text-xl">Programming skills</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge>C++/C</Badge>
                        <Badge>Python</Badge>
                        <Badge>JavaScript</Badge>
                        <Badge>Java</Badge>
                      </div>
                    </div>

                    {/* right side */}
                    <div className="container">
                      <h3 className="text-xl">Real Estate</h3>
                      <p className="text-gray-300">
                        I&apos;m proficient in Excel and have expericence underwriting properties and making financial models.
                      </p>
                    </div>
                  </div>
                </Panel>
              </div>

              {/* projects */}
              <div className="container">
                <CoordinateLabel className="block mt-8 mb-2">{'[ 02 ] PROJECTS'}</CoordinateLabel>
                <h2 className="text-[22px] sm:text-[28px] font-display font-bold leading-[1.2] text-left mb-4">Featured Projects</h2>
                <ProjectsGrid limit={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
