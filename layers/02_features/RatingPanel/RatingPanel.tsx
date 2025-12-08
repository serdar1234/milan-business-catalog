import { ReviewStats } from '@/layers/01_widgets/BusinessPageWrapper/BusinessPageWrapper';
import { RatingBar } from '@/layers/04_shared/ui/RatingBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const RatingPanel: React.FC<ReviewStats> = (stats) => {
  if (!stats.ratings_breakdown.length) return null;
  return (
    <>
      <Grid size={5}>
        <Box display="flex" alignItems="flex-start" gap={2}>
          <Box sx={{ flexGrow: 1, minWidth: '150px' }}>
            {stats.ratings_breakdown
              .map((item) => <RatingBar key={item.stars} {...item} />)
              .reverse()}
          </Box>
        </Box>
      </Grid>
    </>
  );
};
