import { MobileReviewsRatings } from '@/layers/01_widgets/ReviewsRatings/MobileReviewsRatings';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';
import { ReviewStats, Insight } from '@/layers/04_shared/types/types';
import {
  fetchCompanyDetails,
  fetchCompanyReviews,
} from '@/layers/04_shared/utils/helpers.server';

export const ReviewsRatings = async ({ slug }: { slug: string }) => {
  const [reviewsRes, businessRes] = await Promise.all([
    fetchCompanyReviews(slug),
    fetchCompanyDetails(slug),
  ]);

  if (!reviewsRes || !businessRes) {
    return null;
  }

  const businessData = businessRes.data;
  const reviewsData = reviewsRes.data;

  const stats: ReviewStats = {
    average_rating: businessData?.average_rating ?? 0,
    approved_reviews_count: businessData?.approved_reviews_count ?? 0,
    ratings_breakdown: businessData?.ratings_breakdown ?? [],
  };

  const reviews: Insight[] =
    (reviewsData &&
      reviewsData.map((review) => ({
        id: review.id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        company: {
          id: businessData?.id ?? 0,
          slug: businessData?.slug ?? '',
          name: businessData?.name ?? '',
        },
      }))) ??
    [];

  return (
    <>
      <MobileReviewsRatings data={reviews} withButton slug={slug} />
      <DesktopReviewsRatings stats={stats} reviews={reviews} slug={slug} />
    </>
  );
};
