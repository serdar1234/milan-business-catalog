import { ReviewsRatingsServer } from './ReviewsRatings.server';

export const ReviewsRatings = ({ slug }: { slug: string }) => {
  return <ReviewsRatingsServer slug={slug} />;
};
