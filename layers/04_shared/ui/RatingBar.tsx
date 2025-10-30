import { Box, Typography, LinearProgress } from '@mui/material';

export interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export const RatingBar: React.FC<RatingBreakdown> = ({ stars, percentage }) => (
  <Box display="flex" alignItems="center" gap={1.5} sx={{ mb: 0.5 }}>
    <Typography variant="body2" sx={{ width: '15px' }}>
      {stars}
    </Typography>
    <Box sx={{ width: '100%', height: '8px', borderRadius: '4px' }}>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: '100%',
          borderRadius: 'inherit',
          '& .MuiLinearProgress-bar': {
            bgcolor: 'ratingGold.main',
          },
        }}
      />
    </Box>
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ width: '30px', textAlign: 'right' }}
    >
      {percentage}%
    </Typography>
  </Box>
);
