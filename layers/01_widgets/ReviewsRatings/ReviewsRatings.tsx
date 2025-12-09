'use client';

import { MobileReviewsRatings } from '@/layers/01_widgets/ReviewsRatings/MobileReviewsRatings';
import { DesktopReviewsRatings } from './DesktopReviewsRatings';
import { ReviewStats } from '../BusinessPageWrapper/BusinessPageWrapper';
import {
  useGetCompanyDetailsQuery,
  useGetCompanyReviewsQuery,
} from '@/layers/03_entities/business/businessApi';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { Spinner } from '@/layers/04_shared/ui/Spinner';
import { Insight } from '@/layers/04_shared/types/types';

export const ReviewsRatings = ({ slug }: { slug: string }) => {
  const lang = useCurrentLanguage();
  const input = { slug, lang };
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetCompanyReviewsQuery(input);
  const {
    data: businessData,
    isLoading: businessLoading,
    isError: businessError,
  } = useGetCompanyDetailsQuery(input);

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

  if (isLoading || businessLoading) {
    return <Spinner bgcolor="transparent" />;
  }

  if (isError || businessError) {
    return null;
  }

  return (
    <>
      <MobileReviewsRatings data={reviews} withButton slug={slug} />
      <DesktopReviewsRatings stats={stats} reviews={reviews} slug={slug} />
    </>
  );
};
