import { Box, Grid, Typography, Button, Rating } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { RatingBreakdown, RatingBar } from '@/layers/04_shared/ui/RatingBar';

const InsightCard = () => (
  <Box
    sx={{
      p: 2,
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      minWidth: 280,
      height: 180,
    }}
  >
    <Typography>Insight Card Placeholder</Typography>
  </Box>
);

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  breakdown: RatingBreakdown[];
  insightCards: InsightCardProps[];
}

interface InsightCardProps {
  title: string;
  value: number;
}
interface DesktopReviewsRatingsProps {
  stats?: ReviewStats;
}

const MOCK_STATS: ReviewStats = {
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

export const DesktopReviewsRatings: React.FC<DesktopReviewsRatingsProps> = ({
  stats = MOCK_STATS,
}) => {
  return (
    <Box sx={{ p: '2rem', bgcolor: 'background.paper', borderRadius: 2 }}>
      {/* Header and button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Box>
          <WidgetHeader title="Reviews & Ratings" />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: 'text.primary',
                fontFamily: "Inter, 'Inter Fallback",
              }}
            >
              {stats.averageRating.toFixed(1)}
            </Typography>
            <Rating
              name="main-rating"
              readOnly
              sx={{ color: 'ratingGold.main' }}
              value={MOCK_STATS.averageRating}
              precision={0.1}
            />
            <Typography variant="body2" color="text.secondary">
              {stats.totalReviews} reviews
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            color: 'brandAccent.main',
            border: '2px solid',
            borderColor: 'currentColor',
          }}
        >
          Write a Review
        </Button>
      </Box>

      {/* Main content */}
      <Grid container spacing={4}>
        {/* Column 1: rating breakdown */}
        <Grid size={5}>
          <Box display="flex" alignItems="flex-start" gap={2}>
            {/* График распределения */}
            <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
              {stats.breakdown
                .map((item) => <RatingBar key={item.stars} {...item} />)
                .reverse()}
            </Box>
          </Box>
        </Grid>

        {/* Column 2: insight cards */}
        <Grid size={7} container spacing={0} justifyContent={'center'}>
          {stats.insightCards.map((insight, index) => (
            <Grid
              size={6}
              key={`insight-${index}`}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h6"
                component="span"
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
              >
                {insight.value.toFixed(1)}
                <Typography
                  sx={{ fontWeight: 'normal', color: 'text.secondary' }}
                >
                  {insight.title}
                </Typography>
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* КОЛОНКА 3: КАРТОЧКИ ОТЗЫВОВ (Слайдер) */}
        <Grid>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 2,
              py: 1, // Небольшой отступ для тени
              '&::-webkit-scrollbar': { display: 'none' }, // Скрываем скроллбар
              msOverflowStyle: 'none', // Для IE и Edge
              scrollbarWidth: 'none', // Для Firefox
            }}
          >
            {/* 🚨 Заглушка InsightCard */}
            <InsightCard />
            <InsightCard />
            <InsightCard />
            <InsightCard />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
