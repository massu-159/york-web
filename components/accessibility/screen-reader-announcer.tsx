"use client";

import { useEffect } from 'react';

interface ScreenReaderAnnouncerProps {
  message: string;
  priority?: 'polite' | 'assertive';
  clearAfter?: number;
}

export function ScreenReaderAnnouncer({ 
  message, 
  priority = 'polite', 
  clearAfter = 3000 
}: ScreenReaderAnnouncerProps) {
  useEffect(() => {
    if (!message) return;

    const announcer = document.getElementById('announcements');
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;

      const timer = setTimeout(() => {
        announcer.textContent = '';
      }, clearAfter);

      return () => clearTimeout(timer);
    }
  }, [message, priority, clearAfter]);

  return null;
}

export function announceToScreenReader(
  message: string, 
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcer = document.getElementById('announcements');
  if (announcer) {
    announcer.setAttribute('aria-live', priority);
    announcer.textContent = message;
    
    setTimeout(() => {
      announcer.textContent = '';
    }, 3000);
  }
}