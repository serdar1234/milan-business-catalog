import { Business } from '@/layers/04_shared/api/mocks/businessMocks';
import { Grid } from '@mui/material';
import React from 'react';
import { BusinessCard } from '../BusinessCard/ui/BusinessCard';
import { BusinessCardSmall } from '../BusinessCardSmall/BusinessCardSmall';

export default function BusinessCardGrid({
  data,
  cols,
  isSmall = false,
}: {
  data: Business[];
  cols: number;
  isSmall?: boolean;
}) {
  return (
    <>
      {data.map((business) => (
        <Grid
          key={business.id}
          size={{ xs: 12, sm: 6, md: 12 / cols }}
          sx={{ display: 'flex' }}
        >
          {isSmall ? (
            <BusinessCardSmall business={business} />
          ) : (
            <BusinessCard business={business} />
          )}
        </Grid>
      ))}
    </>
  );
}
