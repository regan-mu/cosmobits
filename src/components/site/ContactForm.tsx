'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { AlertCircle, Loader2 } from 'lucide-react';
import { ENQUIRY_TOPICS } from '@/content/site';
import { CONTACT } from '@/lib/contact';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),
  email: z.string().trim().email('Enter an email like name@company.co.ke.'),
  company: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || /^\+?[\d\s()-]{7,}$/.test(v), 'Enter a phone number like +254 712 345 678, or leave it blank.'),
  service: z.string().min(1, 'Choose what your enquiry is about.'),
  message: z.string().trim().min(10, 'Tell us a little more: at least 10 characters.'),
  // Honeypot: hidden from people, filled in by bots
  website: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Status = { kind: 'idle' } | { kind: 'sent' } | { kind: 'error'; message: string };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="cb-small mt-2 flex items-start gap-1.5 text-cb-brand">
      <AlertCircle size={16} aria-hidden="true" className="mt-px shrink-0" />
      {message}
    </p>
  );
}

/** Enquiry / quote form (spec 7.3 block 10). Posts to /api/contact with a reCAPTCHA v3 token. */
export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = useCallback(
    async (data: FormData) => {
      setStatus({ kind: 'idle' });
      if (!executeRecaptcha) {
        setStatus({ kind: 'error', message: 'The form is still loading. Wait a moment and try again.' });
        return;
      }
      try {
        const recaptchaToken = await executeRecaptcha('contact_form');
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, recaptchaToken }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Your message could not be sent.');
        reset();
        setStatus({ kind: 'sent' });
      } catch (error) {
        setStatus({
          kind: 'error',
          message: `${error instanceof Error ? error.message : 'Your message could not be sent.'} You can also email ${CONTACT.email}.`,
        });
      }
    },
    [executeRecaptcha, reset],
  );

  if (status.kind === 'sent') {
    return (
      <div role="status" className="rounded-xl border border-cb-border bg-cb-surface p-6 lg:p-8">
        <h3 className="cb-h4">Message sent</h3>
        <p className="mt-2 text-cb-muted">
          Thanks, we&apos;ve got your message and will reply {CONTACT.replyTime}.
        </p>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="cb-link mt-4">
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: keyof FormData) => ({
    id: `contact-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="contact-form-heading"
      className="rounded-xl border border-cb-border bg-cb-surface p-6 lg:p-8"
    >
      <h3 id="contact-form-heading" className="cb-h4">
        Send us a message
      </h3>
      <p className="cb-small mt-1 text-cb-muted">For quotes and general enquiries. All fields are required unless marked optional.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block font-medium">
            Name
          </label>
          <input type="text" autoComplete="name" className="cb-field" {...field('name')} {...register('name')} />
          <FieldError id="contact-name-error" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-2 block font-medium">
            Email
          </label>
          <input type="email" autoComplete="email" className="cb-field" {...field('email')} {...register('email')} />
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="contact-company" className="mb-2 block font-medium">
            Company <span className="font-normal text-cb-muted">(optional)</span>
          </label>
          <input type="text" autoComplete="organization" className="cb-field" {...field('company')} {...register('company')} />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-2 block font-medium">
            Phone <span className="font-normal text-cb-muted">(optional)</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+254"
            className="cb-field"
            {...field('phone')}
            {...register('phone')}
          />
          <FieldError id="contact-phone-error" message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-service" className="mb-2 block font-medium">
            What&apos;s it about?
          </label>
          <select className="cb-field" defaultValue="" {...field('service')} {...register('service')}>
            <option value="" disabled>
              Choose one
            </option>
            {ENQUIRY_TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <FieldError id="contact-service-error" message={errors.service?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="mb-2 block font-medium">
            Message
          </label>
          <textarea rows={5} className="cb-field resize-y" {...field('message')} {...register('message')} />
          <FieldError id="contact-message-error" message={errors.message?.message} />
        </div>

        {/* Honeypot: off-screen and skipped by keyboard and screen readers */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
        </div>
      </div>

      {status.kind === 'error' && (
        <p role="alert" className="mt-6 flex items-start gap-2 rounded-md border border-cb-brand p-3 text-[0.9375rem]">
          <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-cb-brand" />
          {status.message}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="cb-small text-cb-muted">
          We&apos;ll only use these details to reply to you.{' '}
          <a href="/privacy" className="cb-link">
            Privacy policy
          </a>
        </p>
        <button type="submit" disabled={isSubmitting} className="cb-btn cb-btn--lg shrink-0">
          {isSubmitting && <Loader2 size={18} aria-hidden="true" className="animate-spin" />}
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
