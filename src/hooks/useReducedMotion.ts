'use client';

import { useSyncExternalStore, useCallback } from 'react';

/**
 * Check if user prefers reduced motion
 */
function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Custom hook to detect user's reduced motion preference
 * Requirements: 10.4 - Reduced motion support for accessibility
 * 
 * Uses useSyncExternalStore to avoid setState in useEffect
 * 
 * @returns boolean - true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', callback);
    
    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  }, []);

  const getSnapshot = useCallback(() => getReducedMotionPreference(), []);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useReducedMotion;
