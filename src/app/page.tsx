import Image from "next/image";
import TestTailwind from "./test-tailwind";
import Saba_Ethan_Photo from "../../public/Saba_Ethan_Photo.jpg";
import ProjectsGrid from "./components/ProjectsGrid";
import WaveUnderline from "./components/WaveUnderline";
import Badge from "./components/Badge";

export default function Home() {
  return (
    <div>
      <div className="relative min-h-screen bg-brand-bg text-brand-text">
        {/* Main content */}
        <div className="container flex flex-col justify-center items-center">
          <div className="bg-brand-bg min-h-screen">
            <div className="container mx-auto px-8 py-16">
              {/* introduction */}
              <div className="flex flex-row items-center justify-center gap-8 mb-30">
                <div className="flex-1">
                  <h1 className="sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">Hi. I'm Ethan, and this is the work that I'm proud of.</h1>
                  <WaveUnderline />
                  <h3 className="text-xl text-gray-300 leading-relaxed mt-6">
                    I'm in my Sophomore year at the University of Michigan learning about Computer Science (Major), Real Estate (minor), and everything in between.
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <Image src={Saba_Ethan_Photo} alt="Ethan Saba" width={400} height={400} className="rounded-xl mix-blend-lighten bg-brand-surface p-1 shadow-card" />
                </div>
              </div>

              {/* about me */}
              <div className="container">
                <h2 className="text-2xl text-left">About Me</h2>
                <p className="text-gray-300">
                  I'm a Sophomore at the University of Michigan studying Computer Science and Real Estate. I'm interested in the intersection of technology and real estate, and I'm always looking for new opportunities to learn and grow.
                </p>
              </div>

              {/* skills */}
              <div className="container">
                <h2 className="text-2xl text-left">Skills</h2>
                <div className="container border-gray-700 border-2 rounded-lg mx-auto px-2 py-2">
                  <div className="grid grid-cols-2 gap-0">
                    {/* left side */}
                    <div className="container">
                      <h3 className="text-xl">Programming skills</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge>C++/C</Badge>
                        <Badge>Python</Badge>
                        <Badge>JavaScript</Badge>
                      </div>
                    </div>

                    {/* right side */}
                    <div className="container">
                      <h3 className="text-xl">Real Estate</h3>
                      <p className="text-gray-300">
                        I'm proficient in Python, Java, C++, and JavaScript. I'm also familiar with HTML, CSS, and SQL.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* projects */}
              <div className="container">
                <h2 className="text-2xl text-left mb-6">Featured Projects</h2>
                <ProjectsGrid limit={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
