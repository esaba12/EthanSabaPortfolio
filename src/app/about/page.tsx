'use client';

import Image from "next/image";
import Saba_Ethan_Photo from "../../../public/Saba_Ethan_Photo.jpg";
import Badge from "../components/Badge";
import { GraduationCap, MapPin, Calendar, Code, Building, Users, Award, BookOpen } from 'lucide-react';

const skills = {
  programming: ['Java', 'C++', 'Ruby', 'HTML/CSS', 'Python (Learning)'],
  design: ['Photoshop', 'Figma', 'CAD'],
  tools: ['Excel', 'Shopify', 'Arduino', 'Raspberry Pi'],
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
    details: 'Real Estate Minor • GPA: 3.92/4.0 • Relevant Coursework: Discrete Math (EECS203), Intro to Programming and Data Structures (EECS280)'
  },
  {
    degree: 'High School Diploma',
    school: 'Milken Community School',
    period: 'June 2024',
    details: 'GPA: 4.49/4.0 • SAT: 1530/1600 • Rank: 3/130 • Relevant Coursework: Physics, Calculus, Computer Science, Economics, Chemistry, Finance'
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate Computer Science student with a unique interest in the intersection of technology and business. 
              I love building things that solve real problems, teaching others, and connecting with people who share similar interests.
            </p>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Ethan Saba</h2>
                          <p className="text-lg text-brand-text/80 leading-relaxed">
              I'm a freshman at the University of Michigan College of Engineering studying Computer Science with a minor in Real Estate. 
              I'm passionate about the intersection of technology and business, with experience in web development, marketing, and teaching.
            </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-brand-accent" />
                  <span className="text-brand-text/80">University of Michigan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                  <span className="text-brand-text/80">Ann Arbor, MI & Los Angeles, CA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-brand-accent" />
                  <span className="text-brand-text/80">Class of 2028</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <Image 
                src={Saba_Ethan_Photo} 
                alt="Ethan Saba" 
                width={400} 
                height={400} 
                className="rounded-xl mix-blend-lighten bg-brand-surface p-1 shadow-card" 
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-xl font-semibold">Programming</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.programming.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-xl font-semibold">Design & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.design.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-xl font-semibold">Tools & Hardware</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                  ))}
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <div className="flex items-center space-x-3 mb-4">
                  <Users className="w-6 h-6 text-brand-accent" />
                  <h3 className="text-xl font-semibold">Languages</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((language) => (
                    <Badge key={language}>{language}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="bg-brand-surface rounded-lg p-6 border border-brand-border hover:bg-brand-surface-light transition-all duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-brand-accent">{experience.title}</h3>
                      <p className="text-brand-text/80">{experience.company}</p>
                    </div>
                    <span className="text-sm text-brand-text/60 mt-2 md:mt-0">{experience.period}</span>
                  </div>
                  <p className="text-brand-text/80 mb-4">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Leadership & Involvement</h2>
            <div className="space-y-6">
              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border hover:bg-brand-surface-light transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-accent">Member</h3>
                    <p className="text-brand-text/80">Michigan Blockchain Club</p>
                  </div>
                  <span className="text-sm text-brand-text/60 mt-2 md:mt-0">January 2025 - Present</span>
                </div>
                <p className="text-brand-text/80 mb-4">Exploring blockchain technology and financial technology, collaborating on research of blockchain trends and emerging technologies, participating in workshops focused on smart contract development and Web3.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Blockchain</Badge>
                  <Badge>Smart Contracts</Badge>
                  <Badge>Web3</Badge>
                  <Badge>FinTech</Badge>
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border hover:bg-brand-surface-light transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-accent">Student Body President, Vice President, and House Representative</h3>
                    <p className="text-brand-text/80">Milken Student Government</p>
                  </div>
                  <span className="text-sm text-brand-text/60 mt-2 md:mt-0">August 2021 - May 2024</span>
                </div>
                <p className="text-brand-text/80 mb-4">Organized school-wide events including dances, pep rallies, and graduation celebrations. Served as liaison for all student-faculty relations and directed all student media including social media content and announcements.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Leadership</Badge>
                  <Badge>Event Planning</Badge>
                  <Badge>Student Government</Badge>
                  <Badge>Media Management</Badge>
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border hover:bg-brand-surface-light transition-all duration-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-accent">President and Fund Manager</h3>
                    <p className="text-brand-text/80">Milken Investment Leadership Club</p>
                  </div>
                  <span className="text-sm text-brand-text/60 mt-2 md:mt-0">August 2021 - May 2024</span>
                </div>
                <p className="text-brand-text/80 mb-4">Maintained $5000 club portfolio as primary manager of stocks, bonds, and mutual funds. Taught investment workshops and organized recruitment for new investors.</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Portfolio Management</Badge>
                  <Badge>Investment Analysis</Badge>
                  <Badge>Teaching</Badge>
                  <Badge>Leadership</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
            <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
              {education.map((edu, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-brand-accent">{edu.degree}</h3>
                      <p className="text-brand-text/80">{edu.school}</p>
                      <p className="text-brand-text/60 text-sm">{edu.details}</p>
                    </div>
                    <span className="text-sm text-brand-text/60 mt-2 md:mt-0">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relevant Courses Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Relevant Coursework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Computer Science</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Discrete Math</span>
                    <span className="text-brand-text/60 text-sm">EECS 203</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Programming & Data Structures</span>
                    <span className="text-brand-text/60 text-sm">EECS 280</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Data Structures and Algorithms</span>
                    <span className="text-brand-text/60 text-sm">EECS 281</span>
                  </div>
                </div>
              </div>

              <div className="bg-brand-surface rounded-lg p-6 border border-brand-border">
                <h3 className="text-lg font-semibold text-brand-accent mb-3">Mathematics & Sciences</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Calculus I & II</span>
                    <span className="text-brand-text/60 text-sm">MATH 115, 116</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Physics I</span>
                    <span className="text-brand-text/60 text-sm">PHYSICS 140</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-text/80">Chemistry</span>
                    <span className="text-brand-text/60 text-sm">CHEM 130</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
