'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          setValue(JSON.parse(stored));
        }
      } catch {
        // corrupted data — fall back to initial value
      }
      setLoaded(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [key]);

  const update = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = newValue instanceof Function ? newValue(prev) : newValue;
        try {
          localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // storage full or unavailable
        }
        return resolved;
      });
    },
    [key],
  );

  const clear = useCallback(() => {
    setValue(initialValue);
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key, initialValue]);

  return { value, update, clear, loaded } as const;
}
