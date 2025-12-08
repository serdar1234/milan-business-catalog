import { MobileReviewsRatings } from '@/layers/01_widgets/ReviewsRatings/MobileReviewsRatings';
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
      <MobileReviewsRatings data={reviews} withButton slug={slug} />
      <DesktopReviewsRatings stats={stats} reviews={reviews} slug={slug} />
    </>
  );
};
