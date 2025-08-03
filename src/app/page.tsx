import Image from "next/image";
import TestTailwind from "./test-tailwind";
import Saba_Ethan_Photo from "../../public/Saba_Ethan_Photo.jpg";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gray-900 text-white">
        {/* Main content */}
        <div className="bg-gray-950 min-h-screen">
          <div className="container mx-auto px-8 py-16">
            <div className="flex flex-row items-center justify-center gap-8">
              <div className="flex-1">
                <h1 className="sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">Hi. I'm Ethan, and this is the work that I'm proud of.</h1>
              </div>
              <div className="flex-shrink-0">
                <Image src={Saba_Ethan_Photo} alt="Ethan Saba" width={400} height={400} className="rounded-xl mix-blend-lighten bg-slate-900 p-1 shadow-xl" />
              </div>
            </div>
            <h3 className="text-xl text-gray-300 leading-relaxed">
              My name is Ethan Saba, and I'm a Sophomore at the University of Michigan. I'm studying computer science,
              intending to minor in both real estate development and entrepreneurship.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
