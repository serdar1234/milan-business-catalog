'use client';

import { useSyncExternalStore } from 'react';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

interface DeviceLayoutWrapperProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
  initialIsMobile: boolean;
}
export const DeviceLayoutWrapper: React.FC<DeviceLayoutWrapperProps> = ({
  mobile,
  desktop,
  initialIsMobile,
}) => {
  const isMobileClient = useViewportWidth();

  const isClient = typeof window !== 'undefined';

  // Use server guess first, then update silently if needed
  const isMobile = isClient ? isMobileClient : initialIsMobile;

  return isMobile ? mobile : desktop;
};

// const isClient = useSyncExternalStore(
//   () => () => {},
//   () => true, // client snapshot
//   () => false, // server snapshot
// );

// if (!isClient) {
//   return null;
// }
