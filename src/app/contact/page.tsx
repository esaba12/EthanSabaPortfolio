'use client';

import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

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
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <div className="container mx-auto px-8 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-blue-500 to-violet-600 bg-clip-text text-transparent">
              Let&apos;s Connect
            </h1>
            <p className="text-xl text-brand-text/80 max-w-3xl mx-auto leading-relaxed">
              I&apos;m always interested in new opportunities, collaborations, and interesting conversations. 
              Whether you want to discuss a project, grab coffee, or just say hello, I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {contactMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={method.name}
                      href={method.href}
                      target={method.name === 'Location' ? undefined : '_blank'}
                      rel={method.name === 'Location' ? undefined : 'noopener noreferrer'}
                      className="group flex items-center space-x-4 p-4 bg-brand-surface rounded-lg hover:bg-brand-surface-light transition-all duration-200"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors duration-200">
                        <IconComponent className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                          {method.name}
                        </h3>
                        <p className="text-brand-text/70 text-sm">{method.value}</p>
                        <p className="text-brand-text/50 text-xs mt-1">{method.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-text/80 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border/50 rounded-lg text-brand-text placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-text/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-surface border border-brand-border/50 rounded-lg text-brand-text placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-text/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border/50 rounded-lg text-brand-text placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-text/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-brand-surface border border-brand-border/50 rounded-lg text-brand-text placeholder-brand-text/50 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project, idea, or just say hello..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-brand-surface rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">What I&apos;m Looking For</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-brand-accent mb-2">Internships</h4>
                  <p className="text-brand-text/70">Software engineering, data science, or real estate tech roles</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-accent mb-2">Collaborations</h4>
                  <p className="text-brand-text/70">Open source projects, hackathons, and side projects</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-accent mb-2">Networking</h4>
                  <p className="text-brand-text/70">Coffee chats, mentorship, and industry insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
