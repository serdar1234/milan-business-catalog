'use client';

import { Grid, Box, Typography } from '@mui/material';

export const RatingBox = ({ name, data }: { name: string; data: number }) => (
  <Grid size={6}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: (theme) => theme.typography.fontFamily,
          color: 'brandAccent.main',
        }}
      >
        {name === 'Rating' ? data : `${data}+`}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
    </Box>
  </Grid>
);
