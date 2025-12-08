'use client';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';
import { ReviewStats } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { ReviewFormData } from '@/layers/04_shared/types/types';
import { useSubmitReviewMutation } from '@/layers/03_entities/business/businessApi';

interface Props {
  title: string;
  buttonText?: string;
  stats: ReviewStats;
  slug: string;
  [key: string]: unknown;
}

export const RatedWidgetHeader: React.FC<Props> = ({
  title,
  buttonText,
  stats,
  slug,
  ...restProps
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lang = useCurrentLanguage();
  const count = stats.approved_reviews_count;
  const [submitReview, { isLoading, isError }] = useSubmitReviewMutation();
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const handleSubmitReview = async (formData: ReviewFormData) => {
    try {
      await submitReview({
        slug,
        formData,
        lang,
      }).unwrap();
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error submitting review', err);
    }
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
          disabled={isLoading}
          onClick={handleOpenDialog}
          sx={{
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
      {isError && <p style={{ color: 'red' }}>Server error</p>}
    </>
  );
};
