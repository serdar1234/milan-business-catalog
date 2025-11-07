'use client';

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

  const isMobile = isClient ? isMobileClient : initialIsMobile;

  return isMobile ? mobile : desktop;
};
