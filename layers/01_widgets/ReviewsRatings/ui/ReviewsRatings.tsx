import { MobileView } from '@/layers/04_shared/ui/ReviewsRatings';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';

export const ReviewsRatings: React.FC = () => {
  {
    return (
      <>
        <MobileView withButton={false} />
        <DesktopReviewsRatings />
      </>
    );
  }
};
