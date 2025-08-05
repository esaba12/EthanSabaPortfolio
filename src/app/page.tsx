import Image from "next/image";
import TestTailwind from "./test-tailwind";
import Saba_Ethan_Photo from "../../public/Saba_Ethan_Photo.jpg";
import Navbar from "./navbar";
import ProjectsCarousel from "./components/ProjectsCarousel";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gray-950 text-white">
        {/* Main content */}
        <div className="container flex flex-col justify-center items-center">
          <div className="bg-gray-950 min-h-screen">
            <div className="container mx-auto px-8 py-16">
              {/* introduction */}
              <div className="flex flex-row items-center justify-center gap-8 mb-30">
                <div className="flex-1">
                  <h1 className="sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">Hi. I'm Ethan, and this is the work that I'm proud of.</h1>
                  <h3 className="text-xl text-gray-300 leading-relaxed">
                    I'm in my Sophomore year at the University of Michigan learning about Computer Science (Major), Real Estate (minor), and everything in between.
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <Image src={Saba_Ethan_Photo} alt="Ethan Saba" width={400} height={400} className="rounded-xl mix-blend-lighten bg-slate-900 p-1 shadow-xl" />
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
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <input type="checkbox" checked readOnly className="mr-2 h-4 w-4 text-gray-950 bg-gray-950 border-gray-600 rounded focus:ring-gray-500" />
                          <span>C++/C</span>
                        </li>
                        <li className="flex items-center">
                          <input type="checkbox" checked readOnly className="mr-2 h-4 w-4 text-gray-950 bg-gray-950 border-gray-600 rounded focus:ring-gray-500" />
                          <span>Python</span>
                        </li>
                        <li className="flex items-center">
                          <input type="checkbox" checked readOnly className="mr-2 h-4 w-4 text-gray-950 bg-gray-950 border-gray-600 rounded focus:ring-gray-500" />
                          <span>JavaScript</span>
                        </li>
                      </ul>
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
              <ProjectsCarousel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
