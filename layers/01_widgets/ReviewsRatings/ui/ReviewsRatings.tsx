'use client';

import { Box } from '@mui/material';
// import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
// import { DesktopView } from '@/layers/02_features/Reviews/ui/DesktopReviews';
import { MobileView } from '@/layers/02_features/Reviews/ui/MobileReviews';

import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';

export const ReviewsRatings: React.FC = () => {
  const isMobile = useViewportWidth();

  return (
    <Box
      component="section"
      boxShadow={4}
      sx={{ bgcolor: 'background.paper', borderRadius: '1rem' }}
    >
      {/* <Container maxWidth="lg"> */}
      {isMobile ? (
        <MobileView withButton={false} />
      ) : (
        // <DesktopView />
        <DesktopReviewsRatings />
      )}
      {/* </Container> */}
    </Box>
  );
};
