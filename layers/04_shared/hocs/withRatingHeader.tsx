import { ReviewStats } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { Box, Typography, Rating, Button } from '@mui/material';

interface WithRatingHeaderProps {
  title: string;
  buttonText?: string;
  stats: ReviewStats;
}

/**
 * Higher-Order Component that wraps WidgetHeader
 * and adds a rating section.
 * * @param WrappedComponent - header component like WidgetHeader.
 * @returns new component with rating.
 */
export const withRatingHeader = <P extends object>(
  WrappedComponent: React.ComponentType<P & { title: string }>,
) => {
  const ComponentWithRating: React.FC<P & WithRatingHeaderProps> = ({
    title,
    buttonText,
    stats,
    ...restProps
  }) => {
    const finalStats = stats;
    const count = finalStats.approved_reviews_count;

    return (
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <WrappedComponent title={title} {...(restProps as P)} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: 'text.primary',
                fontFamily: (theme) => theme.typography.fontFamily,
              }}
            >
              {finalStats.average_rating.toFixed(1)}
            </Typography>

            <Rating
              name={`rating-for-${title}`}
              readOnly
              sx={{ color: 'brandPin.main' }}
              value={finalStats.average_rating}
              precision={0.1}
            />

            <Typography variant="body2" color="text.secondary">
              {count} review{count === 1 ? '' : 's'}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
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
    );
  };

  ComponentWithRating.displayName = `WithRatingHeader(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithRating;
};
