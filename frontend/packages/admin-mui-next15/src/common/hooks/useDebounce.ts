import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

type ReturnType = string;

export function useDebounce(value: string, delay = 500): ReturnType {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
