'use client';

import { useSyncExternalStore } from 'react';

const BREAKPOINT = 900;

/**
 * Functions for subscribing to viewport width changes
 * @param callback - function that will be called on resize
 */
function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

/**
 * Function that returns current value
 */
function getSnapshot() {
  return window.innerWidth < BREAKPOINT;
}

/**
 * Function that returns initial value during SSR.
 */
function getServerSnapshot() {
  // Safe fallback during SSR
  return false;
}

/**
 * Concurrent-safe hook for detecting mobile viewport
 */
export function useViewportWidth() {
  const isMobile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return isMobile;
}
