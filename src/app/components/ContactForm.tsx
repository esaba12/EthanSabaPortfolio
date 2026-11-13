'use client';

import { useRef, useState, type FormEvent } from 'react';
import { submitContact } from '../lib/contact';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const inputClass = 'w-full rounded-none border border-brand-border bg-brand-bg px-4 py-3 text-base text-brand-text placeholder:text-brand-text-muted focus:border-brand-accent focus:outline focus:outline-1 focus:outline-brand-accent disabled:opacity-60';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const [sentAt, setSentAt] = useState('');
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    submitting.current = true;
    setStatus('sending');
    setFeedback('');
    const result = await submitContact({
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      subject: String(values.get('subject') ?? '').trim(),
      message: String(values.get('message') ?? '').trim(),
    });
    submitting.current = false;
    if (result.ok) {
      setSentAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setStatus('sent');
      form.reset();
    } else {
      setStatus('error');
      setFeedback(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'sending'} className="border-t border-brand-border pt-6">
      <fieldset disabled={status === 'sending'} className="space-y-6">
        <legend className="sr-only">Your message</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div><label htmlFor="contact-name" className="label mb-3 block text-brand-annot">01 Name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={120} pattern=".*\S.*" placeholder="Your name" className={inputClass} /></div>
          <div><label htmlFor="contact-email" className="label mb-3 block text-brand-annot">02 Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={inputClass} /></div>
        </div>
        <div><label htmlFor="contact-subject" className="label mb-3 block text-brand-annot">03 Subject</label><input id="contact-subject" name="subject" required maxLength={200} pattern=".*\S.*" placeholder="What's this about?" className={inputClass} /></div>
        <div><label htmlFor="contact-message" className="label mb-3 block text-brand-annot">04 Message</label><textarea id="contact-message" name="message" required maxLength={10000} rows={7} placeholder="A few lines is plenty." className={`${inputClass} min-h-40 resize-y`} /></div>
        <button type="submit" className="label min-h-12 border border-brand-accent bg-brand-accent px-8 py-3 text-brand-bg hover:bg-brand-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send'}</button>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true" className="mt-6 min-h-20">
        {status === 'sending' && <p className="label text-brand-text-secondary">Sending your message…</p>}
        {status === 'sent' && <><p className="label text-brand-annot">[ Sent · {sentAt} ]</p><p className="mt-2 text-sm text-brand-text-secondary">Thanks. I&apos;ll reply from essaba@umich.edu.</p></>}
        {status === 'error' && <><p className="label text-brand-annot">[ Not sent ]</p><p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{feedback} Your message is still in the form. You can also <a href="mailto:essaba@umich.edu" className="text-brand-accent underline underline-offset-4">email me directly</a>.</p></>}
      </div>
    </form>
  );
}
