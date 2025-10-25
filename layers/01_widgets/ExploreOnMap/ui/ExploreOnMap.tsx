'use client';

import { Box } from '@mui/material';
import { DesktopView } from './DesktopView';
import { MobileView } from './MobileView';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

export const ExploreOnMap: React.FC = () => {
  const isMobile = useViewportWidth();

  return (
    <Box component="section" sx={{ py: 6 }}>
      {isMobile ? <MobileView /> : <DesktopView />}
    </Box>
  );
};
