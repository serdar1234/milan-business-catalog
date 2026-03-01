import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';
import { fetchCategoryBusinesses } from '@/layers/04_shared/utils/helpers.server';
import { CategoryBusinessPagination } from './CategoryBusinessPagination';

interface Props {
  id: number;
  currentPage: number;
  ratingMin?: string;
  sort?: string;
}

export async function CategoryBusinessList({
  id,
  currentPage,
  ratingMin,
  sort,
}: Props) {
  const result = await fetchCategoryBusinesses({
    category_id: id,
    page: currentPage,
    limit: 10,
    sort: sort || 'rating',
    rating_min: ratingMin ? parseFloat(ratingMin) : 0,
  });

  if (!result) {
    return (
      <Typography color="error.main" sx={{ textAlign: 'center', py: 4 }}>
        Failed to load businesses.
      </Typography>
    );
  }

  const { data: businessList, meta } = result;

  if (businessList && businessList.length === 0) {
    return (
      <Typography color="primary.main" sx={{ textAlign: 'center', p: 4 }}>
        Oops! We couldn&apos;t find any businesses matching your search. Please
        try again with different keywords.
      </Typography>
    );
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
        <BusinessCardGrid data={businessList || []} cols={2} isSmall={false} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}
        >
          <CategoryBusinessPagination
            currentPage={currentPage}
            totalPages={meta?.pagination.total_pages || 0}
          />
        </Box>
      </Grid>
    </Box>
  );
}
