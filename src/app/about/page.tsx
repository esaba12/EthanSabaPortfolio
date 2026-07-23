'use client';

import { useRef } from "react";
import Image from "next/image";
import Saba_Ethan_Photo from "../../../public/Saba_Ethan_Photo.jpg";
import Badge from "../components/Badge";
import Panel from "../components/Panel";
import CoordinateLabel from "../components/CoordinateLabel";
import HairlineRule from "../components/HairlineRule";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion-utils";
import { GraduationCap, MapPin, Calendar, Code, Building, Users, Award } from 'lucide-react';

const skills = {
  programming: ['C++', 'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  design: ['Photoshop', 'Figma', 'CAD'],
  tools: ['Git', 'React', 'Node.js', 'Postgres'],
  languages: ['English', 'Farsi (Persian)', 'Hebrew']
};

const experiences = [
  {
    title: 'Software Engineering Intern',
    company: 'Axonius',
    period: 'June 2026 - Present',
    description: 'Building internal developer tooling with MCP, Claude Skills, and LangGraph to automate low-priority bug fixes from Jira tickets. Joined the front-end testing suite migration, cutting suite runtime 40%+, and shipped accessible reusable front-end components.',
    skills: ['TypeScript', 'Python', 'YAML', 'MCP', 'LangGraph']
  },
  {
    title: 'Software Engineer',
    company: 'Alias Intelligence',
    period: 'October 2025 - May 2026',
    description: "Built internal tools for Alias's due diligence platform. Implemented an automated scoring system that compares draft and final reports to flag missed findings and errors, and a coverage map that surfaces gaps in investigative data.",
    skills: ['Python', 'SQL', 'TypeScript', 'Postgres']
  },
];

const leadership = [
  {
    title: 'Consulting Analyst and Associate Project Manager',
    company: 'TAMID at Michigan',
    period: 'September 2025 - Present',
    description: 'Advising EIT Hub Israel on European startup benchmarking, pricing, and VC partnership strategy. Also consulting for Tailor Brands, an LLC formation service, on market entry for the college-aged demographic.',
    skills: ['Consulting', 'Market Research', 'Project Management']
  },
  {
    title: 'Member',
    company: "City of Beverly Hills - Mayor's Innovation Circle",
    period: 'May 2025 - Present',
    description: "Planned citywide events for LA Tech Week and helped create Beverly Blends, a music and coffee meetup that brought 1000+ young professionals, artists, and entrepreneurs together with local firms.",
    skills: ['Event Planning', 'Community Building']
  },
  {
    title: 'Fellow',
    company: 'Birthright Israel Excel',
    period: 'June 2026 - Present',
    description: 'One of 80 selected from 2,000+ applicants to join a community of entrepreneurs and 15+ unicorn founders.',
    skills: ['Entrepreneurship']
  },
  {
    title: 'Student Body President, Vice President, and House Representative',
    company: 'Milken Student Government',
    period: 'August 2021 - May 2024',
    description: 'Organized school-wide events, served as liaison for student-faculty relations, and directed student media and communications.',
    skills: ['Leadership', 'Event Planning', 'Media Management']
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Engineering in Computer Science',
    school: 'University of Michigan College of Engineering',
    period: 'August 2024 - May 2028',
    details: 'Real Estate Minor • GPA: 3.90/4.0'
  },
  {
    degree: 'High School Diploma',
    school: 'Milken Community School',
    period: 'June 2024',
    details: 'GPA: 4.49/4.0 • SAT: 1530/1600 • Rank: 3/130'
  }
];

const coursework = [
  'EECS 484', 'EECS 445', 'EECS 376', 'EECS 370',
  'EECS 281', 'EECS 280', 'EECS 203', 'ROB 101',
];

const skillPanels = [
  { label: 'A', icon: Code, title: 'Programming', items: skills.programming },
  { label: 'B', icon: Award, title: 'Design & Tools', items: skills.design },
  { label: 'C', icon: Building, title: 'Tools & Hardware', items: skills.tools },
  { label: 'D', icon: Users, title: 'Languages', items: skills.languages },
];

function useRevealOnScroll<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([]);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    refs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }, [count]);
  return refs;
}

export default function About() {
  const sectionRefs = useRevealOnScroll<HTMLDivElement>(5);

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-32 pb-24">
        {/* Header */}
        <CoordinateLabel className="block mb-4">{'[ 01 ] ABOUT'}</CoordinateLabel>
        <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-display font-bold leading-[0.95] tracking-tight max-w-4xl mb-6">
          About Me
        </h1>
        <p className="text-lg sm:text-xl text-brand-text-secondary leading-relaxed max-w-xl mb-20">
          I&apos;m a CS student at Michigan who spends most of my time building things — internal tools at work, side projects on nights and weekends, and a lot of half-finished ideas in between.
        </p>

        {/* Hero: intro + photo, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-display font-bold">Ethan Saba</h2>
            <p className="text-lg text-brand-text-secondary leading-relaxed max-w-xl">
              I&apos;m a sophomore studying Computer Science at the University of Michigan College of Engineering, with a minor in Real Estate. Right now that means internal tooling at Axonius, due-diligence infrastructure at Alias Intelligence, and consulting work through TAMID — plus a few side projects I ship on my own time.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-brand-accent" />
                <span className="text-brand-text-secondary">University of Michigan</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-accent" />
                <span className="text-brand-text-secondary">Ann Arbor, MI &amp; Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand-accent" />
                <span className="text-brand-text-secondary">Class of 2028</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:mt-12 flex justify-start lg:justify-end">
            <div className="relative w-full max-w-sm">
              <span aria-hidden="true" className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-brand-accent" />
              <span aria-hidden="true" className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-brand-accent" />
              <Image
                src={Saba_Ethan_Photo}
                alt="Ethan Saba"
                width={400}
                height={400}
                className="w-full mix-blend-lighten bg-brand-surface p-1 rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} className="mb-24">
          <CoordinateLabel className="block mb-2">{'[ SKILLS ]'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-10">Skills &amp; Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillPanels.map(({ label, icon: Icon, title, items }, i) => (
              <Panel key={title} className={`p-6 ${i % 2 === 1 ? 'lg:mt-8' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <CoordinateLabel>{label}</CoordinateLabel>
                  <Icon className="w-5 h-5 text-brand-accent" />
                </div>
                <h3 className="text-lg font-display font-bold mb-4">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div ref={(el) => { sectionRefs.current[1] = el; }} className="mb-24">
          <CoordinateLabel className="block mb-2">{'[ EXPERIENCE ]'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-10">Experience</h2>
          <div className="space-y-4">
            {experiences.map((experience, index) => (
              <Panel key={index} className="p-6" bracketsOnHover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-accent">{experience.title}</h3>
                    <p className="text-brand-text-secondary">{experience.company}</p>
                  </div>
                  <CoordinateLabel>{experience.period}</CoordinateLabel>
                </div>
                {experience.description && (
                  <p className="text-brand-text-secondary mb-4">{experience.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>

        {/* Leadership & Involvement */}
        <div ref={(el) => { sectionRefs.current[2] = el; }} className="mb-24">
          <CoordinateLabel className="block mb-2">{'[ LEADERSHIP ]'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-10">Leadership &amp; Involvement</h2>
          <div className="space-y-4">
            {leadership.map((role, index) => (
              <Panel key={index} className="p-6" bracketsOnHover>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-accent">{role.title}</h3>
                    <p className="text-brand-text-secondary">{role.company}</p>
                  </div>
                  <CoordinateLabel>{role.period}</CoordinateLabel>
                </div>
                <p className="text-brand-text-secondary mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </div>

        {/* Education */}
        <div ref={(el) => { sectionRefs.current[3] = el; }} className="mb-24">
          <CoordinateLabel className="block mb-2">{'[ EDUCATION ]'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-10">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <Panel key={index} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-accent">{edu.degree}</h3>
                    <p className="text-brand-text-secondary">{edu.school}</p>
                    <p className="text-brand-text-muted text-sm">{edu.details}</p>
                  </div>
                  <CoordinateLabel>{edu.period}</CoordinateLabel>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        {/* Relevant Coursework */}
        <div ref={(el) => { sectionRefs.current[4] = el; }}>
          <HairlineRule className="mb-12" />
          <CoordinateLabel className="block mb-2">{'[ COURSEWORK ]'}</CoordinateLabel>
          <h2 className="text-[28px] sm:text-[40px] font-display font-bold leading-[1.05] mb-10">Relevant Coursework</h2>
          <Panel className="p-6 max-w-xl">
            <CoordinateLabel className="block mb-3">EECS &amp; Robotics</CoordinateLabel>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <Badge key={course}>{course}</Badge>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
