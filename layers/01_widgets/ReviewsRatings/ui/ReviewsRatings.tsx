'use client';

import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';
import { MobileView } from '@/layers/04_shared/ui/ReviewsRatings';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';

export const ReviewsRatings: React.FC = () => {
  const isMobile = useViewportWidth();

  {
    return isMobile ? (
      <MobileView withButton={false} />
    ) : (
      <DesktopReviewsRatings />
    );
  }
};
