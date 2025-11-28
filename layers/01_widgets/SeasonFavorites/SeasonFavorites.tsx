'use client';

import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { useGetBusinessListQuery } from '@/layers/03_entities/business/businessApi';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';

export const SeasonFavorites: React.FC = () => {
  const {
    data: businessList,
    isLoading,
    isError,
  } = useGetBusinessListQuery({ sort: 'rating' });

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const numberOfCols = isMobile ? 2 : 3;

  if (isLoading) {
    return (
      <Typography sx={{ textAlign: 'center', py: 4 }}>
        Loading seasonal favorites...
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography color="error.main" sx={{ textAlign: 'center', py: 4 }}>
        Failed to load featured businesses.
      </Typography>
    );
  }

  const featuredBusinesses = businessList?.slice(0, numberOfCols) || [];

  if (featuredBusinesses.length === 0) {
    return null;
  }

  return (
    <Box component="section">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <WidgetHeader
          title="Season Favorites"
          subtitle="Hand-picked spots perfect for Milano's winter season"
        />

        <Grid container spacing={2}>
          <BusinessCardGrid data={featuredBusinesses} cols={3} />
        </Grid>
      </Container>
    </Box>
  );
};
