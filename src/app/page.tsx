'use client';

import { useRef } from "react";
import ProjectsGrid from "./components/ProjectsGrid";
import WaveUnderline, { WaveUnderlineHandle } from "./components/WaveUnderline";
import Badge from "./components/Badge";
import Panel from "./components/Panel";
import CoordinateLabel from "./components/CoordinateLabel";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "./lib/motion-utils";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const ghostNumeralRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const waveUnderlineRef = useRef<WaveUnderlineHandle>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const skillsLeftRef = useRef<HTMLDivElement>(null);
  const skillsRightRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Hero: SplitText line-wipe reveal synced with the WaveUnderline stroke draw-in,
  // followed by the SCROLL cue fading in and fading out on first scroll input.
  // Also drives a scroll-scrubbed parallax on the headline vs. the giant ghost
  // numeral so the hero has depth once you start scrolling, not just a static load-in.
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
    tl.from(ghostNumeralRef.current, {
      opacity: 0,
      xPercent: 8,
      duration: 1.4,
    }, '<0.1');
    tl.call(() => {
      waveUnderlineRef.current?.draw({ duration: 1.2, ease: 'power3.out' });
    }, [], '<0.3');
    tl.to(scrollCueRef.current, { opacity: 1, duration: 0.3 });

    const handleFirstScroll = () => {
      gsap.to(scrollCueRef.current, { opacity: 0, duration: 0.3 });
    };
    window.addEventListener('scroll', handleFirstScroll, { once: true });

    // Parallax depth: headline content drifts up slower than the viewport,
    // the giant background numeral drifts up faster — separation between the
    // two layers is what reads as depth while scrolling out of the hero.
    gsap.to(heroContentRef.current, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to(ghostNumeralRef.current, {
      yPercent: -28,
      ease: 'none',
      scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
    });

    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
      split.revert();
    };
  }, { scope: heroRef });

  // Skills: the two panels slide in from opposite edges as they enter the
  // viewport. Plays once on entry (not pinned/scrubbed) — a pinned scrub was
  // tried here first but left a large blank void if you landed early in its
  // scroll range, since the panels started fully invisible for the whole
  // pinned distance. This is simpler and never has a dead-space state.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!skillsLeftRef.current || !skillsRightRef.current) return;

    gsap.from(skillsLeftRef.current, {
      xPercent: -15,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: skillsLeftRef.current, start: 'top 85%' },
    });
    gsap.from(skillsRightRef.current, {
      xPercent: 15,
      opacity: 0,
      duration: 0.6,
      delay: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: skillsRightRef.current, start: 'top 85%' },
    });
  }, []);

  // Projects: fade + rise into view, slightly more pronounced than a
  // micro-interaction to match the heavier motion vocabulary established above.
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (!projectsRef.current) return;

    gsap.from(projectsRef.current, {
      opacity: 0,
      y: 32,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' },
    });
  }, []);

  return (
    <div className="bg-brand-bg text-brand-text">
      {/* HERO — full viewport, full-bleed, asymmetric */}
      <div ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center">
        <div
          ref={ghostNumeralRef}
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 select-none font-display font-bold text-brand-accent/[0.05] text-[340px] sm:text-[420px] lg:text-[520px] leading-none z-0"
        >
          00
        </div>

        <div ref={heroContentRef} className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-32 pb-24">
          <CoordinateLabel className="block mb-6">{'[ 00 ] INTRO'}</CoordinateLabel>
          <h1
            ref={headlineRef}
            className="text-[44px] sm:text-[64px] lg:text-[96px] xl:text-[120px] font-display font-bold leading-[0.95] tracking-tight max-w-5xl text-brand-text"
          >
            Hi. I&apos;m Ethan, and this is the work that I&apos;m proud of.
          </h1>
          <div className="max-w-md mt-8">
            <WaveUnderline ref={waveUnderlineRef} />
          </div>
          <h3 className="text-lg sm:text-xl text-brand-text-secondary leading-relaxed mt-6 max-w-md">
            I&apos;m in my Junior year at the University of Michigan learning about Computer Science (Major), Real Estate (minor), and everything in between.
          </h3>

          <div ref={scrollCueRef} className="mt-20 flex flex-col items-start gap-2 opacity-0">
            <CoordinateLabel>SCROLL</CoordinateLabel>
            <div className="w-px h-6 bg-brand-border" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* SKILLS — pinned reveal, asymmetric split, break from the centered column */}
      <div ref={skillsSectionRef} className="relative px-6 sm:px-12 lg:px-20 xl:px-28 py-24 sm:py-32">
        <CoordinateLabel className="block mb-2">{'[ 01 ] SKILLS'}</CoordinateLabel>
        <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-12">Skills</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div ref={skillsLeftRef} className="lg:col-span-5">
            <Panel className="p-8 h-full">
              <CoordinateLabel className="block mb-3">{'A'}</CoordinateLabel>
              <h3 className="text-xl font-display font-bold mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>C++</Badge>
                <Badge>Java</Badge>
                <Badge>Python</Badge>
                <Badge>TypeScript</Badge>
                <Badge>JavaScript</Badge>
                <Badge>SQL</Badge>
              </div>
            </Panel>
          </div>

          <div ref={skillsRightRef} className="lg:col-span-7 lg:mt-16">
            <Panel className="p-8 h-full">
              <CoordinateLabel className="block mb-3">{'B'}</CoordinateLabel>
              <h3 className="text-xl font-display font-bold mb-4">Tools &amp; Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>Node.js</Badge>
                <Badge>Postgres</Badge>
                <Badge>Git</Badge>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div ref={projectsRef} className="px-6 sm:px-12 lg:px-20 xl:px-28 py-24 max-w-[1800px] mx-auto">
        <CoordinateLabel className="block mb-2">{'[ 02 ] PROJECTS'}</CoordinateLabel>
        <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-12">Featured Projects</h2>
        <ProjectsGrid limit={3} />
      </div>
    </div>
  );
}
