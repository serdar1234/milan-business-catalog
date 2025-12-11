'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import { ReviewFormDialog } from '@/layers/02_features/ReviewForm/ReviewFormDialog';
import { ReviewStats } from '@/layers/04_shared/types/types';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { useReviewDialog } from '@/layers/04_shared/hooks/useReviewDialog';

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
  const count = stats.approved_reviews_count;

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
      {isError && <p style={{ color: 'red' }}>Server error</p>}
    </>
  );
};
