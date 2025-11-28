// 'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
type Stats = {
  value: string;
  label: string;
};
const STATS: Stats[] = [
  { value: '1.234', label: 'Local spots' },
  { value: '4.7', label: 'Avg rating' },
  { value: '6°C', label: 'Today' },
];
export default function HeroStats() {
  return (
    <Grid container sx={{ mt: 2, pt: 3 }}>
      {STATS.map((stat) => (
        <Grid size={4} key={stat.label} sx={{ textAlign: 'left' }}>
          <Box sx={{ color: 'brandPin.main', mb: 0.5 }}>
            <Typography
              variant="h4"
              component="span"
              fontWeight="bold"
              sx={{
                verticalAlign: 'middle',
                fontFamily: (theme) => theme.typography.fontFamily,
              }}
            >
              {stat.value}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="brandAccent.contrastText"
            display="block"
          >
            {stat.label}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
