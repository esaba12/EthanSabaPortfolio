import { ArrowUpRight } from 'lucide-react';
import SheetHero from '../components/drawing/SheetHero';
import SectionHead from '../components/drawing/SectionHead';
import ContactForm from '../components/ContactForm';
import CopyEmail from '../components/CopyEmail';

export const metadata = {
  title: 'Contact · Sheet 04 · Ethan Saba',
  description: 'Contact Ethan Saba about Summer 2027 software engineering and forward deployed engineering internships, AI, developer tools, and audio projects.',
};

export default function Contact() {
  return (
    <div className="px-4 pb-16 md:px-10">
      <SheetHero sheet="04" sheetTitle="Contact" title="Contact" dimension="Summer 2027 · SWE and FDE internships" lede="I'm looking for a Summer 2027 internship in software engineering or forward deployed engineering. I'm also happy to talk with anyone building in AI, developer tools, or anything involving sound." glow="20% 10%" />
      <div className="grid gap-16 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12">
        <section aria-labelledby="channels" className="min-w-0">
          <SectionHead letter="A" tag="Channels" title="Find me here" id="channels" />
          <dl className="border-t border-brand-border">
            <div className="border-b border-brand-border py-5"><dt className="label mb-3 text-brand-annot">Email</dt><dd><CopyEmail email="essaba@umich.edu" /></dd></div>
            {[
              { label: 'LinkedIn', value: 'linkedin.com/in/ethansaba', href: 'https://linkedin.com/in/ethansaba' },
              { label: 'GitHub', value: 'github.com/esaba12', href: 'https://github.com/esaba12' },
            ].map((channel) => <div key={channel.label} className="border-b border-brand-border py-5"><dt className="label mb-3 text-brand-annot">{channel.label}</dt><dd><a href={channel.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 break-all text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">{channel.value}<ArrowUpRight size={16} className="shrink-0" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></dd></div>)}
            <div className="border-b border-brand-border py-5"><dt className="label mb-3 text-brand-annot">Based in</dt><dd className="text-brand-text-secondary">Ann Arbor, MI ↔ Los Angeles, CA</dd></div>
          </dl>
        </section>
        <section aria-labelledby="work-order" className="min-w-0">
          <SectionHead letter="B" tag="Work order" title="Send a message" id="work-order" />
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
