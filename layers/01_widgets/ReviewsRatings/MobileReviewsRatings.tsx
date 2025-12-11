'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';

import { Insight } from '@/layers/04_shared/types/types';
import { InsightCard } from '@/layers/02_features/InsightCard/ui/InsightCard';
import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';
import { RatingBox } from '@/layers/04_shared/ui/RatingBox';
import { useReviewDialog } from '@/layers/04_shared/hooks/useReviewDialog';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

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
  const {
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmitReview,
    isLoading,
    isError,
    snackbarOpen,
    closeSnackbar,
  } = useReviewDialog(slug);
  const average_rating =
    data.length > 0
      ? data?.reduce((acc, insight) => acc + insight.rating, 0) / data.length
      : 0;
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
        <RatingBox name="Rating" data={average_rating} />
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={closeSnackbar} severity="success" variant="filled">
          Your review was successfully submitted and is awaiting approval.
        </Alert>
      </Snackbar>
      <ReviewFormDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitReview}
      />
    </Box>
  );
};
