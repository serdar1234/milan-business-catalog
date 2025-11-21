'use client';

import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import { useGetBusinessListQuery } from '@/layers/04_shared/api/businessApi';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';

interface CategoryBusinessListProps {
  cols?: number;
}

export const CategoryBusinessList: React.FC<CategoryBusinessListProps> = ({
  cols = 2,
}) => {
  const {
    data: businessList,
    isLoading,
    isError,
  } = useGetBusinessListQuery(undefined);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: '2rem' }}>
        <CircularProgress sx={{ color: 'var(--color-brand-accent)' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error.main" sx={{ textAlign: 'center', py: 4 }}>
        Failed to load featured businesses.
      </Typography>
    );
  }

  const featuredBusinesses = businessList?.slice(0, 6) || [];

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
      <Grid container spacing={2} width={'100%'}>
        <BusinessCardGrid data={featuredBusinesses} cols={cols} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}
        >
          <Pagination count={10} />
        </Box>
      </Grid>
    </Box>
  );
};
