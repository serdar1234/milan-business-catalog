'use client';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { useGetBusinessListQuery } from '@/layers/03_entities/business/api/businessApi';
import { BusinessCard } from '@/layers/02_features/BusinessCard/ui/BusinessCard';

export const CategoryList: React.FC = () => {
  const {
    data: businessList,
    isLoading,
    isError,
  } = useGetBusinessListQuery(undefined);

  if (isLoading) {
    return (
      <Typography sx={{ textAlign: 'center', py: 4 }}>
        Loading businesses...
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

  const featuredBusinesses = businessList?.slice(0, 3) || [];

  if (featuredBusinesses.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: '1rem',
        boxShadow: 2,
      }}
    >
      <Stack spacing={3}>
        {featuredBusinesses.map((business) => (
          <Grid
            key={business.id}
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex' }}
          >
            <BusinessCard business={business} />
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};
