'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Insight } from '@/layers/04_shared/types/types';
import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';
import { useSubmitReviewMutation } from '@/layers/03_entities/business/businessApi';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { ReviewFormData } from '@/layers/04_shared/types/types';
import Grid from '@mui/material/Grid';
import { RatingBox } from '@/layers/04_shared/ui/RatingBox';

interface Props {
  withButton?: boolean;
  data: Insight[];
  slug?: string;
}
export const MobileReviewsRatings = ({
  withButton = false,
  data,
  slug,
}: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const currentLang = useCurrentLanguage();
  const [submitReview, { isLoading, isError }] = useSubmitReviewMutation();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  const average_rating =
    (
      data?.reduce((acc, insight) => acc + insight.rating, 0) / data.length
    ).toFixed(1) || 0;
  const handleSubmitReview = async (formData: ReviewFormData) => {
    if (!slug) {
      return;
    }
    try {
      await submitReview({
        slug,
        formData,
        lang: currentLang,
      }).unwrap();
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Error submitting review', err);
    }
  };
  return (
    <Box
      display={{ xs: 'block', md: 'none' }}
      component="section"
      boxShadow={4}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: '1rem',
        p: '1.5rem',
      }}
    >
      <WidgetHeader title="Reviews & Ratings" />
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <RatingBox name="Rating" data={+average_rating} />
        <RatingBox name="Reviews" data={data.length || 0} />
      </Grid>
      <Box>
        {data.slice(0, 2).map((insight) => (
          <InsightCard key={insight.id} insight={insight} isDesktop={false} />
        ))}
      </Box>

      {withButton && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component="button"
            disabled={isLoading}
            onClick={handleOpenDialog}
            variant="text"
            color="brandAccent"
            sx={{ fontWeight: 'bold' }}
          >
            Write a Review
          </Button>
        </Box>
      )}
      {isError && <p style={{ color: 'red' }}>Server error</p>}
      <ReviewFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitReview}
      />
    </Box>
  );
};
