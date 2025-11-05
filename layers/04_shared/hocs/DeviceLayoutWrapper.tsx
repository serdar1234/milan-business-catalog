'use client';

import { useSyncExternalStore } from 'react';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

interface DeviceLayoutWrapperProps {
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}
export const DeviceLayoutWrapper: React.FC<DeviceLayoutWrapperProps> = ({
  mobile,
  desktop,
}) => {
  const isMobile = useViewportWidth();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true, // client snapshot
    () => false, // server snapshot
  );

  if (!isClient) {
    return null;
  }

  return isMobile ? mobile : desktop;
};
