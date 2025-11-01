'use client';

import { Box, Container } from '@mui/material';
import { DesktopView, MobileView } from '@/layers/04_shared/ui/WinterSpecials';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

export const WinterSpecials: React.FC = () => {
  const isMobile = useViewportWidth();
  return (
    <Box
      component="section"
      sx={{ py: 6, backgroundColor: 'background.paper' }}
    >
      <Container maxWidth="lg">
        {isMobile ? <MobileView /> : <DesktopView />}
      </Container>
    </Box>
  );
};
