'use client';

import { useEffect } from 'react';

// First field a visitor fills in; skips the honeypot (tabIndex -1) and hidden inputs.
const FIELD_SELECTOR =
  'input:not([type="hidden"]):not([tabindex="-1"]):not([disabled]), textarea:not([disabled]), select:not([disabled])';
// Smooth scroll has no reliable end event in every browser, so wait until scrollY settles.
const SETTLE_FRAMES = 6;
const MAX_WAIT_MS = 2000;

function focusAfterScroll(id: string): void {
  const target = document.getElementById(id);
  const field = target?.querySelector<HTMLElement>(FIELD_SELECTOR);
  if (!field) return;

  const started = performance.now();
  let lastY = window.scrollY;
  let still = 0;

  const tick = (): void => {
    const y = window.scrollY;
    still = y === lastY ? still + 1 : 0;
    lastY = y;
    if (still >= SETTLE_FRAMES || performance.now() - started > MAX_WAIT_MS) {
      field.focus({ preventScroll: true });
      return;
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Puts the cursor into the first form field after an in-page link (e.g. #contact) scrolls to it. */
export function HashFocus(): null {
  useEffect(() => {
    const onClick = (e: MouseEvent): void => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
      if (!link) return;
      const url = new URL(link.href);
      if (url.pathname !== window.location.pathname || url.hash.length < 2) return;
      focusAfterScroll(decodeURIComponent(url.hash.slice(1)));
    };

    // Arriving from another page, e.g. /contacts#contact.
    if (window.location.hash.length > 1) {
      focusAfterScroll(decodeURIComponent(window.location.hash.slice(1)));
    }

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  return null;
}
