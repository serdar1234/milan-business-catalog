'use client';

import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';
import { useGetSearchResultsQuery } from '@/layers/03_entities/search/api/searchApi';
import { useState } from 'react';

interface CategoryBusinessListProps {
  query: string;
  cols?: number;
  isSmall?: boolean;
}

export const CategoryBusinessList: React.FC<CategoryBusinessListProps> = ({
  query,
  cols = 2,
  isSmall,
}) => {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data, isLoading, isError } = useGetSearchResultsQuery({
    q: query,
    page,
    per_page: 10,
  });
  const { data: businessList, meta } = data || {};

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

  if (businessList && businessList.length === 0) {
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
        <BusinessCardGrid
          data={businessList || []}
          cols={cols}
          isSmall={isSmall}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={meta?.pagination.total_pages || 0}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Box>
  );
};
