import { Business } from '@/layers/04_shared/api/mocks/businessMocks';
import { Grid } from '@mui/material';
import React from 'react';
import { BusinessCard } from '../BusinessCard/ui/BusinessCard';

export default function BusinessCardGrid({
  data,
  cols,
}: {
  data: Business[];
  cols: number;
}) {
  return (
    <>
      {data.map((business) => (
        <Grid
          key={business.id}
          size={{ xs: 12, sm: 6, md: 12 / cols }}
          sx={{ display: 'flex' }}
        >
          <BusinessCard business={business} />
        </Grid>
      ))}
    </>
  );
}
