import { ReviewStats } from '@/layers/04_shared/api/mocks/reviewStatsMocks';
import { RatingBar } from '@/layers/04_shared/ui/RatingBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export const RatingPanel: React.FC<ReviewStats> = (stats) => {
  if (!stats.breakdown.length) return null;
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
