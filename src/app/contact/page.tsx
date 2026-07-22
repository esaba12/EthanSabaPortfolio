'use client';

import { useState, useRef } from 'react';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';
import Panel from '../components/Panel';
import CoordinateLabel from '../components/CoordinateLabel';
import HairlineRule from '../components/HairlineRule';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/motion-utils';

const contactMethods = [
  {
    name: 'Email',
    value: 'essaba@umich.edu',
    href: 'mailto:essaba@umich.edu',
    icon: Mail,
    description: 'Send me a direct email',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/ethansaba',
    href: 'https://linkedin.com/in/ethansaba',
    icon: Linkedin,
    description: 'Connect professionally',
  },
  {
    name: 'GitHub',
    value: 'github.com/esaba12',
    href: 'https://github.com/esaba12',
    icon: Github,
    description: 'Check out my code',
  },
  {
    name: 'Location',
    value: 'Ann Arbor, MI and Los Angeles, CA',
    href: '#',
    icon: MapPin,
    description: 'Based in Michigan and Los Angeles',
  },
];

const lookingFor = [
  {
    label: 'A',
    title: 'Internships',
    description: 'Software engineering and data science roles',
  },
  {
    label: 'B',
    title: 'Collaborations',
    description: 'Open source projects, hackathons, and side projects',
  },
  {
    label: 'C',
    title: 'Networking',
    description: 'Coffee chats, mentorship, and industry insights',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const methodsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lookingForRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    [methodsRef, formRef, lookingForRef].forEach((ref, i) => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xeoleqao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <div className="px-6 sm:px-12 lg:px-20 xl:px-28 pt-32 pb-24">
        {/* Header */}
        <CoordinateLabel className="block mb-4">{'[ 04 ] CONTACT'}</CoordinateLabel>
        <h1 className="text-[40px] sm:text-[64px] lg:text-[88px] font-display font-bold leading-[0.95] tracking-tight max-w-4xl mb-6">
          Let&apos;s Connect
        </h1>
        <p className="text-lg sm:text-xl text-brand-text-secondary leading-relaxed max-w-xl mb-16">
          I&apos;m always interested in new opportunities, collaborations, and interesting conversations. Whether you want to discuss a project, grab coffee, or just say hello, I&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Methods */}
          <div ref={methodsRef} className="lg:col-span-5">
            <CoordinateLabel className="block mb-3">{'A'}</CoordinateLabel>
            <h2 className="text-xl font-display font-bold mb-6">Get in Touch</h2>
            <div className="space-y-3">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={method.name}
                    href={method.href}
                    target={method.name === 'Location' ? undefined : '_blank'}
                    rel={method.name === 'Location' ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-4 p-4 bg-brand-surface border border-brand-border rounded-sm hover:border-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
                  >
                    <div className="flex-shrink-0 w-12 h-12 border border-brand-border rounded-sm flex items-center justify-center group-hover:border-brand-accent transition-colors duration-200">
                      <IconComponent className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                        {method.name}
                      </h3>
                      <p className="text-brand-text-secondary text-sm">{method.value}</p>
                      <p className="text-brand-text-muted text-xs mt-1">{method.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-7 lg:mt-16">
            <Panel className="p-8">
              <CoordinateLabel className="block mb-3">{'B'}</CoordinateLabel>
              <h2 className="text-xl font-display font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-[13px] uppercase tracking-[0.04em] text-brand-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-sm text-brand-text placeholder-brand-text-muted focus:outline-none focus:border-brand-accent transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-mono text-[13px] uppercase tracking-[0.04em] text-brand-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-sm text-brand-text placeholder-brand-text-muted focus:outline-none focus:border-brand-accent transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-mono text-[13px] uppercase tracking-[0.04em] text-brand-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-sm text-brand-text placeholder-brand-text-muted focus:outline-none focus:border-brand-accent transition-colors duration-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[13px] uppercase tracking-[0.04em] text-brand-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-sm text-brand-text placeholder-brand-text-muted focus:outline-none focus:border-brand-accent transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project, idea, or just say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-mono text-[13px] uppercase tracking-[0.04em] font-medium py-3 px-6 rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </Panel>
          </div>
        </div>

        {/* What I'm Looking For */}
        <div ref={lookingForRef} className="mt-24">
          <HairlineRule className="mb-12" />
          <CoordinateLabel className="block mb-3">{'[ NOTE ]'}</CoordinateLabel>
          <h3 className="text-xl font-display font-bold mb-8">What I&apos;m Looking For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lookingFor.map((item) => (
              <Panel key={item.label} className="p-6">
                <CoordinateLabel className="block mb-2">{item.label}</CoordinateLabel>
                <h4 className="font-medium text-brand-text mb-2">{item.title}</h4>
                <p className="text-brand-text-secondary text-sm leading-relaxed">{item.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
