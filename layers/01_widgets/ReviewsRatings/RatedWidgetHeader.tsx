'use client';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';
import { ReviewStats } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

interface WithRatingHeaderProps {
  title: string;
  buttonText?: string;
  stats: ReviewStats;
  [key: string]: unknown;
}

export const RatedWidgetHeader: React.FC<WithRatingHeaderProps> = ({
  title,
  buttonText,
  stats,
  ...restProps
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const count = stats.approved_reviews_count;

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleSubmitReview = (data: { name: string; rating: number }) => {
    console.log('Отзыв готов к отправке API:', data);
    alert(`Отзыв от ${data.name} отправлен (рейтинг: ${data.rating})`);
    // RTK Query mutation here
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        {...restProps}
      >
        <Box>
          <WidgetHeader title={title} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: 'text.primary',
                fontFamily: (theme) => theme.typography.fontFamily,
              }}
            >
              {stats.average_rating.toFixed(1)}
            </Typography>

            <Rating
              name={`rating-for-${title}`}
              readOnly
              sx={{ color: 'brandPin.main' }}
              value={stats.average_rating}
              precision={0.1}
            />

            <Typography variant="body2" color="text.secondary">
              {count} review{count === 1 ? '' : 's'}
            </Typography>
          </Box>
        </Box>

        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          sx={{
            textTransform: 'capitalize',
            color: 'brandAccent.main',
            border: '2px solid',
            borderColor: 'currentColor',
          }}
        >
          {buttonText}
        </Button>
      </Box>
      <ReviewFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitReview}
      />
    </>
  );
};
