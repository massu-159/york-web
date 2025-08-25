'use client';

import { FormEvent, useState } from 'react';
import { CONTACT_TEXTS, ARIA_LABELS } from '@/lib/constants/texts';

export function Contact() {
  const [formStatus, setFormStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <section
      id='contact'
      className='relative py-20 overflow-hidden'
      role='region'
      aria-labelledby='contact-heading'
    >
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple [animation-delay:4s]'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2
          id='contact-heading'
          className='text-3xl font-bold text-center mb-2'
        >
          {CONTACT_TEXTS.TITLE}
        </h2>
        <p className='text-muted-foreground text-center mb-12'>
          {CONTACT_TEXTS.SUBTITLE}
        </p>
        <div className='max-w-2xl mx-auto'>
          <form
            className='space-y-6'
            role='form'
            aria-labelledby='contact-form-heading'
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor='contact-name' className='sr-only'>
                {CONTACT_TEXTS.FORM.NAME_PLACEHOLDER}
              </label>
              <input
                id='contact-name'
                type='text'
                placeholder={CONTACT_TEXTS.FORM.NAME_PLACEHOLDER}
                className='w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500'
                aria-required='true'
                aria-describedby='name-description'
              />
              <span id='name-description' className='sr-only'>
                {ARIA_LABELS.FORM.NAME_DESCRIPTION}
              </span>
            </div>
            <div>
              <label htmlFor='contact-email' className='sr-only'>
                {CONTACT_TEXTS.FORM.EMAIL_PLACEHOLDER}
              </label>
              <input
                id='contact-email'
                type='email'
                placeholder={CONTACT_TEXTS.FORM.EMAIL_PLACEHOLDER}
                className='w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500'
                aria-required='true'
                aria-describedby='email-description'
              />
              <span id='email-description' className='sr-only'>
                {ARIA_LABELS.FORM.EMAIL_DESCRIPTION}
              </span>
            </div>
            <div>
              <label htmlFor='contact-message' className='sr-only'>
                {CONTACT_TEXTS.FORM.MESSAGE_PLACEHOLDER}
              </label>
              <textarea
                id='contact-message'
                placeholder={CONTACT_TEXTS.FORM.MESSAGE_PLACEHOLDER}
                rows={4}
                className='w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500'
                aria-required='true'
                aria-describedby='message-description'
              ></textarea>
              <span id='message-description' className='sr-only'>
                {ARIA_LABELS.FORM.MESSAGE_DESCRIPTION}
              </span>
            </div>
            <button
              type='submit'
              className='bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors w-full'
              aria-label={ARIA_LABELS.SUBMIT_MESSAGE}
            >
              {CONTACT_TEXTS.FORM.SUBMIT_BUTTON}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
