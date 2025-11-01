import { ReviewStats } from '@/layers/04_shared/api/mocks/reviewStatsMocks';
import { RatingBar } from '@/layers/04_shared/ui/RatingBar';
import { Grid, Box, Typography } from '@mui/material';

export const RatingPanel: React.FC<ReviewStats> = (stats) => {
  return (
    <>
      <Grid size={5}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
            {stats.breakdown
              .map((item) => <RatingBar key={item.stars} {...item} />)
              .reverse()}
          </Box>
        </Box>
      </Grid>

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
    </>
  );
};
