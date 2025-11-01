import { RatingBreakdown } from '@/layers/04_shared/ui/RatingBar';

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  insightCards: InsightCardProps[];
}

interface InsightCardProps {
  title: string;
  value: number;
}

export const MOCK_STATS: ReviewStats = {
  averageRating: 4.7,
  totalReviews: 847,
  breakdown: [
    { stars: 1, count: 0, percentage: 0 },
    { stars: 2, count: 8, percentage: 1 },
    { stars: 3, count: 25, percentage: 3 },
    { stars: 4, count: 152, percentage: 18 },
    { stars: 5, count: 660, percentage: 78 },
  ],
  insightCards: [
    { title: 'Food Quality', value: 4.9 },
    { title: 'Atmosphere', value: 4.7 },
    { title: 'Service', value: 4.8 },
    { title: 'Value', value: 4.6 },
  ],
};
