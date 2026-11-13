'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <a href={`mailto:${email}`} className="break-all text-brand-accent underline decoration-brand-border underline-offset-4 hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">{email}</a>
        <button type="button" onClick={copy} aria-label="Copy email address" className="label min-h-11 px-2 text-brand-accent hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">{status === 'copied' ? 'Copied' : 'Copy'}</button>
      </div>
      <p role="status" aria-live="polite" className={status === 'error' ? 'mt-2 text-sm text-brand-text-secondary' : 'sr-only'}>{status === 'copied' ? 'Email address copied.' : status === 'error' ? 'Copy is unavailable. Select the email address above to copy it manually.' : ''}</p>
    </div>
  );
}
