'use client';

import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

/**
 * ViewportListener is a wrapper component that calls the useViewportWidth hook.
 */
export const ViewportListener = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useViewportWidth();
  return <>{children}</>;
};
