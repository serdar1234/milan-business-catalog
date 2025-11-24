'use client';

import { useState, useCallback, useEffect } from 'react';

export function useClientSetting<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const update = useCallback(
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
        window.dispatchEvent(new Event('local-storage-update'));
      } catch {}
    },
    [key],
  );

  useEffect(() => {
    const handleStorage = () => {
      try {
        const stored = window.localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : defaultValue);
      } catch {
        setValue(defaultValue);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage-update', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage-update', handleStorage);
    };
  }, [key, defaultValue]);

  return [value, update] as const;
}
