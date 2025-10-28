import { useEffect } from 'react';

const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';

  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

/**
 * Hook for locking and compensating scrollbar width
 * by adding overflowY: hidden to <html> and compensating right padding.
 * @param isLocked - if true, blocks scrolling.
 */
export const useScrollLock = (isLocked: boolean) => {
  let scrollbarWidth = 0;
  if (typeof window !== 'undefined') {
    scrollbarWidth = getScrollbarWidth();
  }

  useEffect(() => {
    const html = document.documentElement;
    const fixedElement = document.getElementById('mobile-nav-bar');

    if (isLocked) {
      const originalOverflowY = html.style.overflowY;
      const originalPaddingRight = html.style.paddingRight;
      const originalFixedPaddingRight = fixedElement
        ? fixedElement.style.paddingRight
        : '';

      html.style.overflowY = 'hidden';

      if (scrollbarWidth > 0) {
        html.style.paddingRight = `${scrollbarWidth}px`;
        if (fixedElement) {
          fixedElement.style.paddingRight = `${scrollbarWidth}px`;
        }
      }

      return () => {
        html.style.overflowY = originalOverflowY;
        html.style.paddingRight = originalPaddingRight;
        if (fixedElement) {
          fixedElement.style.paddingRight = originalFixedPaddingRight;
        }
      };
    }
  }, [isLocked, scrollbarWidth]);
};
