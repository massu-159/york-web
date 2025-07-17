'use client';

import { useCallback, useEffect, useRef } from 'react';

interface UseFocusManagementOptions {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
}

export function useFocusManagement(options: UseFocusManagementOptions = {}) {
  const { autoFocus = false, restoreFocus = true, trapFocus = false } = options;
  const elementRef = useRef<HTMLFormElement>(null);
  const previouslyFocusedElement = useRef<HTMLFormElement | null>(null);

  const focusFirst = useCallback(() => {
    if (!elementRef.current) return;

    const focusableElements = getFocusableElements(elementRef.current);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, []);

  const focusLast = useCallback(() => {
    if (!elementRef.current) return;

    const focusableElements = getFocusableElements(elementRef.current);
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus();
    }
  }, []);

  const handleTabTrap = useCallback(
    (event: KeyboardEvent) => {
      if (!trapFocus || !elementRef.current || event.key !== 'Tab') return;

      const focusableElements = getFocusableElements(elementRef.current);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    },
    [trapFocus],
  );

  useEffect(() => {
    if (autoFocus) {
      previouslyFocusedElement.current =
        document.activeElement as HTMLFormElement;
      focusFirst();
    }

    if (trapFocus) {
      document.addEventListener('keydown', handleTabTrap);
    }

    return () => {
      if (trapFocus) {
        document.removeEventListener('keydown', handleTabTrap);
      }

      if (restoreFocus && previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [autoFocus, restoreFocus, trapFocus, focusFirst, handleTabTrap]);

  return {
    elementRef,
    focusFirst,
    focusLast,
  };
}

function getFocusableElements(element: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input[type="text"]:not([disabled])',
    'input[type="email"]:not([disabled])',
    'input[type="password"]:not([disabled])',
    'input[type="search"]:not([disabled])',
    'input[type="tel"]:not([disabled])',
    'input[type="url"]:not([disabled])',
    'input[type="number"]:not([disabled])',
    'input[type="date"]:not([disabled])',
    'input[type="datetime-local"]:not([disabled])',
    'input[type="month"]:not([disabled])',
    'input[type="time"]:not([disabled])',
    'input[type="week"]:not([disabled])',
    'input[type="radio"]:not([disabled])',
    'input[type="checkbox"]:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(element.querySelectorAll(selector)) as HTMLElement[];
}

export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite',
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
