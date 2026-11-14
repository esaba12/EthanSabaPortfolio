export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactResult = { ok: true } | { ok: false; message: string };

/** Send only after submission; keep failures recoverable without losing the draft. */
export async function submitContact(message: ContactMessage): Promise<ContactResult> {
  if (Object.values(message).some((value) => !value.trim())) {
    return { ok: false, message: 'Please fill in every field before sending.' };
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch('https://formspree.io/f/xeoleqao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    if (response.ok) return { ok: true };
    return {
      ok: false,
      message: response.status === 429
        ? 'Too many attempts. Wait a little before trying again.'
        : 'The form service could not accept your message. Please try again.',
    };
  } catch {
    return { ok: false, message: 'Delivery could not be confirmed. Check your connection before trying again.' };
  } finally {
    clearTimeout(timeout);
  }
}
