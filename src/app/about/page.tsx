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
    title: 'Real Estate Analyst Intern',
    company: 'Marcus and  Millichap',
    period: 'July 2025 - August 2025',
    description: '',
    skills: ['Excel', 'Financial Modeling', 'Python', 'AI']

  },
  {
    title: 'Marketing Intern',
    company: 'Gifts for Good',
    period: 'Jun 2023 - Aug 2023',
    description: 'Prospected eco-friendly corporate partners, improved automated marketing technology, and developed front-end product pages for buyer-to-consumer sales.',
    skills: ['Marketing', 'Partnership Development', 'Front-end Development', 'Email Marketing']
  },
  {
    title: 'Web Development Intern',
    company: 'YAD International',
    period: 'May 2023 - Aug 2023',
    description: 'Performed market research, developed full-stack Shopify website and online POS system, and initiated conversations with 50+ potential partners.',
    skills: ['Shopify', 'Full-stack Development', 'Market Research', 'Client Relations']
  },
  {
    title: 'Head Counselor – Engineering and Design',
    company: 'Camp X',
    period: 'Jun 2021 - Aug 2021',
    description: 'Instructed lessons on 3D modeling, programming, and computer hardware (Arduino and Raspberry Pi) for students in grades 3-8.',
    skills: ['Teaching', 'CAD', 'Arduino', 'Raspberry Pi', 'Design Thinking']
  }
];

const education = [
  {
    degree: 'Bachelor of Science in Engineering in Computer Science',
    school: 'University of Michigan College of Engineering',
    period: 'August 2024 - May 2028',
    details: 'Real Estate Minor • GPA: 3.92/4.0'
  },
  {
    degree: 'High School Diploma',
    school: 'Milken Community School',
    period: 'June 2024',
    details: 'GPA: 4.49/4.0 • SAT: 1530/1600 • Rank: 3/130'
  }
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
    refs.current.forEach((el, i) => {
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
          I&apos;m a passionate Computer Science student with a unique interest in the intersection of technology and business. I love building things that solve real problems, teaching others, and connecting with people who share similar interests.
        </p>

        {/* Hero: intro + photo, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-display font-bold">Ethan Saba</h2>
            <p className="text-lg text-brand-text-secondary leading-relaxed max-w-xl">
              I&apos;m a sophomore at the University of Michigan College of Engineering studying Computer Science with a minor in Real Estate. I&apos;m passionate about the intersection of technology and business, with experience in web development, marketing, and teaching.
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
            <Panel className="p-6" bracketsOnHover>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-brand-accent">Member</h3>
                  <p className="text-brand-text-secondary">Michigan Blockchain Club</p>
                </div>
                <CoordinateLabel>January 2025 - Present</CoordinateLabel>
              </div>
              <p className="text-brand-text-secondary mb-4">Exploring blockchain technology and financial technology, collaborating on research of blockchain trends and emerging technologies, participating in workshops focused on smart contract development and Web3.</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Blockchain</Badge>
                <Badge>Smart Contracts</Badge>
                <Badge>Web3</Badge>
                <Badge>FinTech</Badge>
              </div>
            </Panel>

            <Panel className="p-6" bracketsOnHover>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-brand-accent">Student Body President, Vice President, and House Representative</h3>
                  <p className="text-brand-text-secondary">Milken Student Government</p>
                </div>
                <CoordinateLabel>August 2021 - May 2024</CoordinateLabel>
              </div>
              <p className="text-brand-text-secondary mb-4">Organized school-wide events including dances, pep rallies, and graduation celebrations. Served as liaison for all student-faculty relations and directed all student media including social media content and announcements.</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Leadership</Badge>
                <Badge>Event Planning</Badge>
                <Badge>Student Government</Badge>
                <Badge>Media Management</Badge>
              </div>
            </Panel>

            <Panel className="p-6" bracketsOnHover>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-brand-accent">President and Fund Manager</h3>
                  <p className="text-brand-text-secondary">Milken Investment Leadership Club</p>
                </div>
                <CoordinateLabel>August 2021 - May 2024</CoordinateLabel>
              </div>
              <p className="text-brand-text-secondary mb-4">Maintained $5000 club portfolio as primary manager of stocks, bonds, and mutual funds. Taught investment workshops and organized recruitment for new investors.</p>
              <div className="flex flex-wrap gap-2">
                <Badge>Portfolio Management</Badge>
                <Badge>Investment Analysis</Badge>
                <Badge>Teaching</Badge>
                <Badge>Leadership</Badge>
              </div>
            </Panel>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel className="p-6">
              <CoordinateLabel className="block mb-3">Computer Science</CoordinateLabel>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Discrete Math</span>
                  <span className="text-brand-text-muted text-sm font-mono">EECS 203</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Programming &amp; Data Structures</span>
                  <span className="text-brand-text-muted text-sm font-mono">EECS 280</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Data Structures and Algorithms</span>
                  <span className="text-brand-text-muted text-sm font-mono">EECS 281</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Computational Linear Algebra</span>
                  <span className="text-brand-text-muted text-sm font-mono">ROB 101</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Minds and Machines - AI vs Human Thought</span>
                  <span className="text-brand-text-muted text-sm font-mono">PHIL 340</span>
                </div>
              </div>
            </Panel>

            <Panel className="p-6 md:mt-8">
              <CoordinateLabel className="block mb-3">Mathematics &amp; Sciences</CoordinateLabel>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Calculus I &amp; II</span>
                  <span className="text-brand-text-muted text-sm font-mono">MATH 115, 116</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-text-secondary">Chemistry</span>
                  <span className="text-brand-text-muted text-sm font-mono">CHEM 130</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
