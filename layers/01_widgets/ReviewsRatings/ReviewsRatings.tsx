import { MobileView } from '@/layers/04_shared/ui/ReviewsRatingsViews';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';
import { Business } from '@/layers/04_shared/types/types';
import { ReviewStats } from '../BusinessPageWrapper/BusinessPageWrapper';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';

export const ReviewsRatings = async ({ data }: { data: Business }) => {
  const stats: ReviewStats = {
    average_rating: data?.average_rating ?? 0,
    approved_reviews_count: data?.approved_reviews_count ?? 0,
  };
  const { slug } = data;
  const { lang } = await getSSRPreferences();

  const res = await fetch(
    `${BASE_URL}/companies/${slug}/reviews?lang=${lang}`,
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    return null;
  }

  const json = await res.json();
  const reviews = json.data;

  return (
    <>
      <MobileView data={reviews} />
      <DesktopReviewsRatings stats={stats} reviews={reviews} />
    </>
  );
};
