'use client';

import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useMemo, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export type UseScrollOffSetTopReturn = {
  offsetTop: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
};

export function useScrollOffSetTop(top = 0): UseScrollOffSetTopReturn {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [offsetTop, setOffsetTop] = useState(false);

  const handleScrollChange = useCallback(
    (val: number) => {
      const scrollHeight = Math.round(val);

      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementTop = Math.round(rect.top);

        setOffsetTop(elementTop < top);
      } else {
        setOffsetTop(scrollHeight > top);
      }
    },
    [elementRef, top]
  );

  useMotionValueEvent(
    scrollY,
    'change',
    useMemo(() => handleScrollChange, [handleScrollChange])
  );

  const memoizedValue = useMemo(() => ({ elementRef, offsetTop }), [offsetTop]);

  return memoizedValue;
}

/*
 * 1: Applies to top <header/>
 * const { offsetTop } = useScrollOffSetTop(80);
 *
 * Or
 *
 * 2: Applies to element
 * const { offsetTop, elementRef } = useScrollOffSetTop(80);
 * <div ref={elementRef} />
 *
 */
