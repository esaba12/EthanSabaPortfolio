'use client';

import { usePathname } from 'next/navigation';
import { Linkedin, Github, Mail } from 'lucide-react';
import Link from 'next/link';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Creative', href: '/creative' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/ethansaba',
    icon: Linkedin,
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/esaba12',
    icon: Github,
    ariaLabel: 'Visit GitHub profile',
  },
  {
    name: 'Email',
    href: 'mailto:ethansaba12@gmail.com',
    icon: Mail,
    ariaLabel: 'Send email',
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-brand-bg border-t border-brand-border/20">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 max-w-6xl mx-auto">
          {/* Branding Section */}
          <div className="flex flex-col items-start space-y-6">
            <div>
              <Link 
                href="/" 
                className="text-2xl font-bold text-brand-text hover:text-brand-accent transition-colors duration-200"
                aria-label="Go to homepage"
              >
                ES
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="w-10 h-10 bg-brand-surface rounded-lg flex items-center justify-center text-brand-text/70 hover:text-brand-accent hover:bg-brand-surface-light transition-all duration-200"
                  >
                    <IconComponent className="w-5 h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            
            <p className="text-brand-text/60 text-sm max-w-xs">
              CS @ Michigan · Builder · Creative
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={classNames(
                    isActive ? 'text-brand-accent' : 'text-brand-text/70 hover:text-brand-text',
                    'text-sm font-medium transition-colors duration-200',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Credits */}
        <div className="border-t border-brand-border/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-brand-text/50 text-sm">
              © {new Date().getFullYear()} Ethan Saba. All rights reserved.
            </p>
            <p className="text-brand-text/50 text-sm">
              Built with Next.js & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}