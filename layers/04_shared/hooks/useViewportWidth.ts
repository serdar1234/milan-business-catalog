'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsMobile,
  selectIsMobile,
} from '@/layers/04_shared/lib/store/slices/uiSlice';
import type { AppDispatch } from '@/layers/04_shared/lib/store';

const BREAKPOINT = 900;

/**
 * Hook for determining viewport width
 */
export const useViewportWidth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useSelector(selectIsMobile);

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < BREAKPOINT;
      if (currentIsMobile !== isMobile) {
        dispatch(setIsMobile(currentIsMobile));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, isMobile]);

  return isMobile;
};
