import { TOP_EVENTS, MINOR_EVENTS } from '../api/mocks/winterSpecialsMocks';
import { SpecialCard } from '@/layers/02_features/SpecialCard/ui/SpecialCard';
import { Box, Grid, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

export const MobileView = () => (
  <Box
    display={{ xs: 'flex', md: 'none' }}
    sx={{
      backgroundImage: 'linear-gradient(to right, #114B3C, #0B3A5B)',
      p: 3,
      borderRadius: 2,
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Typography variant="h5" fontWeight="bold" color="surface" component="div">
      Winter Special Offers
    </Typography>

    <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 3 }}>
      Warm up with exclusive deals from local businesses
    </Typography>

    <Button
      component={Link}
      href="/offers"
      variant="contained"
      color="surface"
      sx={{
        maxWidth: 120,
        height: '3rem',
        fontWeight: 'bold',
        textTransform: 'capitalize',
      }}
    >
      View Offers
    </Button>
  </Box>
);

export const DesktopView = () => (
  <Box sx={{ display: { xs: 'none', md: 'block' } }}>
    <WidgetHeader
      title="Winter Events & Specials"
      subtitle="Don't miss these seasonal experiences in Milano"
    />

    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={3} sx={{ mb: 3, position: 'relative' }}>
        {TOP_EVENTS.map((event) => (
          <Grid size={6} key={event.title} component={'article'}>
            <SpecialCard {...event} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {MINOR_EVENTS.map((event) => (
          <Grid size={4} key={event.title}>
            <SpecialCard {...event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>
);
