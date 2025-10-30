'use client';

import { Box, Container } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DesktopView } from '@/layers/02_features/Reviews/ui/DesktopReviews';
import { MobileView } from '@/layers/02_features/Reviews/ui/MobileReviews';

import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

export const LocalInsights: React.FC = () => {
  const isMobile = useViewportWidth();

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <WidgetHeader
          title="Local Insights"
          subtitle="Real experiences from visitors discovering Milano"
        />
        {isMobile ? <MobileView /> : <DesktopView />}
      </Container>
    </Box>
  );
};
