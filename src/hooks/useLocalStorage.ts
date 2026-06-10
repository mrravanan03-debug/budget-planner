"use client";

import { useCallback, useSyncExternalStore, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Cache the last serialized string and parsed value to prevent infinite loops.
  // useSyncExternalStore compares snapshots with Object.is(), so we must return
  // the same reference when the underlying data has not changed.
  const cachedString = useRef<string | null>(null);
  const cachedValue = useRef<T>(initialValue);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) {
          onStoreChange();
        }
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const serialised = raw ?? null;

      // Return the cached object if the serialized string is identical
      if (serialised === cachedString.current) {
        return cachedValue.current;
      }

      // Parse and cache the new value
      const parsed = raw ? (JSON.parse(raw) as T) : initialValue;
      cachedString.current = serialised;
      cachedValue.current = parsed;
      return parsed;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const storedValue = useSyncExternalStore(subscribe, getSnapshot, () => initialValue);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const currentValue = (() => {
          const item = window.localStorage.getItem(key);
          return item ? (JSON.parse(item) as T) : initialValue;
        })();
        const newValue = value instanceof Function ? value(currentValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        // Dispatch a storage event so same-tab subscribers re-render
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error);
      }
    },
    [key, initialValue]
  );

  return [storedValue, setValue] as const;
}
