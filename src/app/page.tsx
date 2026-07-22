'use client';

import { useRef } from "react";
import ProjectsGrid from "./components/ProjectsGrid";
import WaveUnderline, { WaveUnderlineHandle } from "./components/WaveUnderline";
import Badge from "./components/Badge";
import Panel from "./components/Panel";
import CoordinateLabel from "./components/CoordinateLabel";
import { gsap, useGSAP, SplitText, ScrollTrigger, prefersReducedMotion } from "./lib/motion-utils";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const waveUnderlineRef = useRef<WaveUnderlineHandle>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Hero: SplitText line-wipe reveal synced with the WaveUnderline stroke draw-in,
  // followed by the SCROLL cue fading in and fading out on first scroll input.
  useGSAP(() => {
    if (prefersReducedMotion()) {
      if (scrollCueRef.current) {
        gsap.set(scrollCueRef.current, { opacity: 1 });
      }
      const hideCueInstantly = () => {
        if (scrollCueRef.current) {
          gsap.set(scrollCueRef.current, { opacity: 0 });
        }
      };
      window.addEventListener('scroll', hideCueInstantly, { once: true });
      return () => window.removeEventListener('scroll', hideCueInstantly);
    }

    if (!headlineRef.current) return;

    const split = new SplitText(headlineRef.current, { type: 'lines', mask: 'lines' });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(split.lines, {
      yPercent: 100,
      duration: 1.2,
      stagger: 0.08,
    });
    tl.call(() => {
      waveUnderlineRef.current?.draw({ duration: 1.2, ease: 'power3.out' });
    }, [], '<0.3');
    tl.to(scrollCueRef.current, { opacity: 1, duration: 0.3 });

    const handleFirstScroll = () => {
      gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.3 });
    };
    window.addEventListener('scroll', handleFirstScroll, { once: true });

    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      split.revert();
    };
  }, { scope: heroRef });

  // Section entries: Skills panel and Featured Projects fade+rise into view.
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    if (skillsRef.current) {
      gsap.from(skillsRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: skillsRef.current, start: 'top 80%' },
      });
    }

    if (projectsRef.current) {
      gsap.from(projectsRef.current, {
        opacity: 0,
        y: 8,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' },
      });
    }
  }, []);

  return (
    <div>
      <div className="relative min-h-screen bg-brand-bg text-brand-text">
        {/* Main content */}
        <div className="container flex flex-col justify-center items-center">
          <div className="bg-brand-bg min-h-screen">
            <div className="container mx-auto px-8 pt-32 pb-16">
              {/* introduction */}
              <div ref={heroRef} className="text-center mb-30">
                <CoordinateLabel className="block mb-4">{'[ 00 ] INTRO'}</CoordinateLabel>
                <h1
                  ref={headlineRef}
                  className="text-[40px] lg:text-[64px] font-display font-bold leading-[1.05] tracking-tight mb-6 text-brand-text"
                >
                  Hi. I&apos;m Ethan, and this is the work that I&apos;m proud of.
                </h1>
                <WaveUnderline ref={waveUnderlineRef} />
                <h3 className="text-xl text-gray-300 leading-relaxed mt-6 max-w-4xl mx-auto">
                  I&apos;m in my Sophomore year at the University of Michigan learning about Computer Science (Major), Real Estate (minor), and everything in between.
                </h3>
                <div ref={scrollCueRef} className="mt-12 flex flex-col items-center gap-2 opacity-0">
                  <CoordinateLabel>SCROLL</CoordinateLabel>
                  <div className="w-px h-6 bg-brand-border" aria-hidden="true" />
                </div>
              </div>

              {/* skills */}
              <div className="container">
                <CoordinateLabel className="block mt-8 mb-2">{'[ 01 ] SKILLS'}</CoordinateLabel>
                <h2 className="text-[22px] sm:text-[28px] font-display font-bold leading-[1.2] text-left mb-4">Skills</h2>
                <div ref={skillsRef}>
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
              </div>

              {/* projects */}
              <div ref={projectsRef} className="container">
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
